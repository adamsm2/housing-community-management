import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import ApartmentApi from "@/api/apartment.ts";
import { toast } from "react-toastify";
import AppForm from "@/components/forms/AppForm.tsx";
import SubmitFormButton from "@/components/ui/SubmitFormButton.tsx";
import UpdateMetersReadingsValidationSchema from "@/components/forms/schemas/update-meters-readings.ts";

type FormFieldProps = {
  name: keyof MeterReadingsRequest;
  type: "number";
  error: FieldError | undefined;
}

interface UpdateMeterReadingsForm {
  electricityMeterReading: number;
  waterMeterReading: number;
}

interface UpdateMeterReadingsProps {
  apartmentNumber: string | number;
  year: number;
  month: number;
  meterReading: MeterReading | null;
}

const paymentStatusOptions = [
  "PAID", "UNPAID", "PROCESSING",
];

const UpdateMeterReadingsForm = ({
                                   apartmentNumber,
                                   year,
                                   month,
                                   meterReading,
                                 }: UpdateMeterReadingsProps) => {
  const { t } = useTranslation();
  const { electricityMeterReading, waterMeterReading, paymentStatus } = meterReading || {};
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(paymentStatus || "");
  const [isLoading, setIsLoading] = useState(false);
  const schema = UpdateMetersReadingsValidationSchema();
  const [meterReadingsAlreadySet, setMeterReadingsAlreadySet] = useState(false);

  const {
    register, handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateMeterReadingsForm>({
    resolver: yupResolver(schema),
  });
  if (electricityMeterReading && waterMeterReading) {
    setValue("electricityMeterReading", electricityMeterReading);
    setValue("waterMeterReading", waterMeterReading);
  }

  const formFields: FormFieldProps[] = useMemo(() => {
    return [
      { name: "electricityMeterReading", type: "number", error: errors.electricityMeterReading },
      { name: "waterMeterReading", type: "number", error: errors.waterMeterReading },
    ];
  }, [errors]);

  const onSubmit: SubmitHandler<UpdateMeterReadingsForm> = async (data) => {
    if (selectedPaymentStatus === "") {
      toast.error(t("paymentStatusRequired"));
      return;
    }
    setIsLoading(true);
    ApartmentApi.setMeterReadings({
      ...data,
      year,
      month,
      paymentStatus: selectedPaymentStatus,
      apartmentNumber: Number(apartmentNumber),
    }, !!electricityMeterReading || meterReadingsAlreadySet)
      .then(() => {
        toast.success(t(!!electricityMeterReading || meterReadingsAlreadySet ? "meterReadingsUpdated" : "meterReadingsSet"));
        setMeterReadingsAlreadySet(true);
      })
      .catch(() => {
        toast.error(t("meterReadingsSettingError"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="text-left">
      <AppForm formFields={formFields} isLoading={isLoading} onSubmit={handleSubmit(onSubmit)} register={register}>
        <>
          <select
            className="sm:flex-1 h-14 px-2 bg-bkg text-textTitle w-full focus:outline-none border-2 border-transparent focus:border-blue-500 mb-4"
            value={selectedPaymentStatus}
            onChange={(e) => {
              setSelectedPaymentStatus(e.target.value);
            }}>
            <option value="">{t("paymentStatus")}</option>
            {paymentStatusOptions.map((status) => (
              <option key={status} value={status}>{t(status)}</option>
            ))}
          </select>
          <SubmitFormButton name={t("setUtilityPrices")} />
        </>
      </AppForm>
    </div>
  );
};

export default UpdateMeterReadingsForm;