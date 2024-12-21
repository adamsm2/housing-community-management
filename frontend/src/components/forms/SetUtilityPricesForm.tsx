import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppForm from "@/components/forms/AppForm.tsx";
import SubmitFormButton from "@/components/ui/SubmitFormButton.tsx";
import SetUtilityPricesValidationSchema from "@/components/forms/schemas/set-utility-prices.ts";
import ApartmentApi from "@/api/apartment.ts";
import { toast } from "react-toastify";


type FormFieldProps = {
  name: keyof SetUtilityPricesRequest;
  type: "number";
  error: FieldError | undefined;
}

interface SetUtilityPricesProps {
  year: number;
  electricityPricePerUnit: number | undefined;
  waterPricePerUnit: number | undefined;
}

interface SetUtilityPricesForm {
  electricityPricePerUnit: number;
  waterPricePerUnit: number;
}

const SetUtilityPricesForm = ({ year, electricityPricePerUnit, waterPricePerUnit }: SetUtilityPricesProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const schema = SetUtilityPricesValidationSchema();
  const [pricesAlreadySet, setPricesAlreadySet] = useState(false);

  const {
    register, handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SetUtilityPricesForm>({
    resolver: yupResolver(schema),
  });
  if (electricityPricePerUnit && waterPricePerUnit) {
    setValue("electricityPricePerUnit", electricityPricePerUnit);
    setValue("waterPricePerUnit", waterPricePerUnit);
  }

  const formFields: FormFieldProps[] = useMemo(() => {
    return [
      { name: "electricityPricePerUnit", type: "number", error: errors.electricityPricePerUnit },
      { name: "waterPricePerUnit", type: "number", error: errors.waterPricePerUnit },
    ];
  }, [errors]);

  const onSubmit: SubmitHandler<SetUtilityPricesForm> = async (data) => {
    setIsLoading(true);
    ApartmentApi.setUtilityPrices({ ...data, year }, !!electricityPricePerUnit || pricesAlreadySet)
      .then(() => {
        toast.success(t(!!electricityPricePerUnit || pricesAlreadySet ? "utilityPricesUpdated" : "utilityPricesSet"));
        setPricesAlreadySet(true);
      })
      .catch(() => {
        toast.error(t("utilityPricesSettingError"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="text-left">
      <AppForm formFields={formFields} isLoading={isLoading} onSubmit={handleSubmit(onSubmit)} register={register}>
        <>
          <SubmitFormButton name={t("setUtilityPrices")} />
        </>
      </AppForm>
    </div>
  );
};

export default SetUtilityPricesForm;