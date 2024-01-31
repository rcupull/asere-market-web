import { AnyRecord } from "../types/general";

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

export const getFormError = <V extends AnyRecord, F extends keyof V = keyof V>(
  value: V,
  validations: Array<{
    field: F;
    type: "required" | "email" | "equal" | "custom";
    equalField?: F;
    customCb?: (fieldValue: any) => boolean;
    message?: string;
  }>
): Partial<Record<F, string>> => {
  const out: Partial<Record<F, string>> = {};

  validations.forEach((validation) => {
    const { field, type, message, equalField, customCb } = validation;

    if (out[field]) return; //return if has error

    const fieldValue = value[field];

    if (type === "required" && !validationsCallback.required(fieldValue)) {
      out[field] = message || `This field is required.`;
    }

    if (type === "email" && !validationsCallback.email(fieldValue)) {
      out[field] = message || `This field must be a valid email.`;
    }

    if (type === "custom") {
      if (!customCb) {
        return console.log("customCb not found");
      }

      if (!customCb(fieldValue)) {
        out[field] = message || `Invalid field`;
      }
    }

    if (type === "equal") {
      if (!equalField) {
        return console.log("equalField not found");
      }

      if (!validationsCallback.equal(fieldValue, value[equalField])) {
        out[field] =
          message || `This field must be equal to ${equalField.toString()}.`;
      }
    }
  });

  return out;
};
