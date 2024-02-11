import {
  //eslint-disable-next-line
  FieldHelperProps,
  //eslint-disable-next-line
  FieldHookConfig,
  //eslint-disable-next-line
  FieldInputProps,
  //eslint-disable-next-line
  FieldMetaProps,
  useField,
} from 'formik';
import { Nullable } from 'types/general';

export type FormikFieldProps<Val = any> = Omit<FieldHookConfig<Val>, 'name'> & { name?: string };

export const useFormikField = <Val = any>(
  propsOrFieldName: FormikFieldProps<Val>,
): {
  field: FieldInputProps<Val>;
  meta: FieldMetaProps<Val>;
  helpers: FieldHelperProps<Val>;
  error: Nullable<string>;
} => {
  //@ts-expect-error some error with tha name type
  const [field, meta, helpers] = useField(propsOrFieldName);

  return {
    field,
    meta,
    helpers,
    error: meta.touched && meta.error,
  };
};
