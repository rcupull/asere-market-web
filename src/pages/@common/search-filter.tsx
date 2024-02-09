import { Button } from 'components/button';
import { Input } from 'components/input';

import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';
export interface SearchFilterProps extends StyleProps {
  isBusy: boolean;
  onChange: (search: string | undefined) => void;
}

export const SearchFilter = ({ isBusy, onChange, className }: SearchFilterProps) => {
  const submitBtnPortal = useSubmitPortal();
  const clearBtnPortal = useSubmitPortal();

  return (
    <div className={cn('flex items-center', className)}>
      <Formik
        initialValues={{
          search: '',
        }}
        onSubmit={() => {}}
      >
        {({ handleChange, values, handleReset }) => {
          return (
            <form>
              <Input name="search" onChange={handleChange} className="w-64" />

              {submitBtnPortal.getPortal(
                <Button
                  label="Buscar"
                  isBusy={isBusy}
                  onClick={() => {
                    onChange(values.search);
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
                    onChange(undefined);
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
