import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';

import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';
export interface SearchFilterProps extends StyleProps {
  isBusy: boolean;
  onChange?: (search: string | undefined) => void;
  value?: string;
}

export const SearchFilter = ({ isBusy, onChange, className, value }: SearchFilterProps) => {
  const submitBtnPortal = useSubmitPortal();
  const clearBtnPortal = useSubmitPortal();

  return (
    <div className={cn('flex items-center', className)}>
      <Formik
        enableReinitialize
        initialValues={{
          search: value || '',
        }}
        onSubmit={() => {}}
      >
        {({ handleChange, values, handleReset }) => {
          return (
            <form>
              <FieldInput name="search" onChange={handleChange} className="w-64" />

              {submitBtnPortal.getPortal(
                <Button
                  label="Buscar"
                  isBusy={isBusy}
                  value={value}
                  onClick={() => {
                    onChange?.(values.search);
                  }}
                  variant="primary"
                  className="ml-2"
                />,
              )}

              {clearBtnPortal.getPortal(
                <Button
                  label="Limpiar"
                  onClick={() => {
                    handleReset();
                    onChange?.(undefined);
                  }}
                  variant="outlined"
                  className="ml-2"
                />,
              )}
            </form>
          );
        }}
      </Formik>

      <div ref={submitBtnPortal.ref} />

      <div ref={clearBtnPortal.ref} />
    </div>
  );
};
