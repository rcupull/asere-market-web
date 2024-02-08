import { AnyRecord } from 'types/general';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validationsCallback = {
  required: (value: any): boolean => {
    return !!value;
  },
  email: (value: string): boolean => {
    return emailRegex.test(value);
  },
  equal: (value1: any, value2: any): boolean => {
    return value1 === value2;
  },
};

interface Validation<V extends AnyRecord, F extends keyof V = keyof V> {
  field: F;
  type: 'required' | 'email' | 'equal' | 'custom';
  equalField?: F;
  customCb?: (fieldValue: any) => Promise<boolean>;
  message?: string;
}

export const getFormError = async <V extends AnyRecord, F extends keyof V = keyof V>(
  value: V,
  validations: Array<Validation<V, F>>,
): Promise<Partial<Record<F, string>>> => {
  const out: Partial<Record<F, string>> = {};

  const getValidationPromise = async (validation: Validation<V, F>): Promise<void> => {
    const { field, type, message, equalField, customCb } = validation;

    if (out[field]) return; //return if has error

    const fieldValue = value[field];

    if (type === 'required' && !validationsCallback.required(fieldValue)) {
      out[field] = message || `Campo requerido.`;
    }

    if (type === 'email' && !validationsCallback.email(fieldValue)) {
      out[field] = message || `Email inválido.`;
    }

    if (type === 'custom') {
      if (!customCb) {
        return console.log('customCb not found');
      }

      if (!(await customCb(fieldValue))) {
        out[field] = message || `Campo inválido`;
      }
    }

    if (type === 'equal') {
      if (!equalField) {
        return console.log('equalField not found');
      }

      if (!validationsCallback.equal(fieldValue, value[equalField])) {
        out[field] = message || `El campo debe ser ${equalField.toString()}.`;
      }
    }
  };

  const validationPromises = validations.map(getValidationPromise);

  await Promise.all(validationPromises);

  return out;
};
