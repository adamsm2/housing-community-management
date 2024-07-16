import { ReactNode } from "react";
import FormField from "@/components/forms/FormField.tsx";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";

interface AppFormProps {
  onSubmit: any;
  isLoading: boolean;
  formFields: any[];
  register: any;
  children: ReactNode;
}

const AppForm = (props: AppFormProps) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={props.onSubmit} className="mx-auto mt-10 max-w-xl sm:mt-10">
      {props.isLoading ? <div className="flex justify-center"><CircularProgress /></div> :
        <>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6">
            {props.formFields.map((item) => (
              <div key={item.name}>
                <FormField name={item.name} translatedName={t(item.name)} type={item.type} register={props.register}
                           error={item.error?.message} />
              </div>
            ))}
          </div>
          <div className="mt-10">
            {props.children}
          </div>
        </>
      }
    </form>
  );
};

export default AppForm;