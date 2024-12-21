import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import createApartmentValidationSchema from "@/components/forms/schemas/create-apartment.ts";
import { useAppDispatch } from "@/hooks/reduxHooks.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import AppForm from "@/components/forms/AppForm.tsx";
import SubmitFormButton from "@/components/ui/SubmitFormButton.tsx";
import ApartmentApi from "@/api/apartment.ts";
import { toast } from "react-toastify";

type FormFieldProps = {
  name: keyof CreateApartmentRequest;
  type: "email" | "number";
  error: FieldError | undefined;
}

const CreateApartmentForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const schema = createApartmentValidationSchema();
  const dispatch = useAppDispatch();

  const {
    register, handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateApartmentRequest>({
    resolver: yupResolver(schema),
  });

  const formFields: FormFieldProps[] = useMemo(() => {
    return [
      { name: "number", type: "number", error: errors.number },
      { name: "squareFootage", type: "number", error: errors.squareFootage },
      { name: "ownerEmail", type: "email", error: errors.ownerEmail },
    ];
  }, [errors]);

  const onSubmit: SubmitHandler<CreateApartmentRequest> = async (data) => {
    setIsLoading(true);
    ApartmentApi.createApartment(data)
      .then(response => {
        toast.success(t("apartmentCreated"));
      })
      .catch(err => {
        if (err.response.data.errors[0] === "No value present") {
          toast.error(t("userDoesntExist"));
        } else {
          toast.error(t("apartmentNumberIsTaken"));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AppForm formFields={formFields} isLoading={isLoading} onSubmit={handleSubmit(onSubmit)} register={register}>
      <>
        <SubmitFormButton name={t("createApartment")} />
      </>
    </AppForm>
  );
};

export default CreateApartmentForm;