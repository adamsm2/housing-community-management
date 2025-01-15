import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks.ts";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UserApi from "@/api/user.ts";
import { toast } from "react-toastify";
import AppForm from "@/components/forms/AppForm.tsx";
import SubmitFormButton from "@/components/ui/SubmitFormButton.tsx";
import createAnnouncementValidationSchema from "@/components/forms/schemas/create-announcement.ts";

type FormFieldProps = {
  name: keyof CreateAnnouncementRequest
  type: "string";
  error: FieldError | undefined;
}

const CreateAnnouncementForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const schema = createAnnouncementValidationSchema();
  const dispatch = useAppDispatch();

  const {
    register, handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateAnnouncementRequest>({
    resolver: yupResolver(schema),
  });

  const formFields: FormFieldProps[] = useMemo(() => {
    return [
      { name: "title", type: "string", error: errors.title },
      { name: "content", type: "string", error: errors.content },
    ];
  }, [errors]);

  const onSubmit: SubmitHandler<CreateAnnouncementRequest> = async (data) => {
    setIsLoading(true);
    UserApi.createAnnouncement(data)
      .then(response => {
        toast.success(t("announcementCreated"));
      })
      .catch(err => {
        toast.error(t("error"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AppForm formFields={formFields} isLoading={isLoading} onSubmit={handleSubmit(onSubmit)} register={register}>
      <>
        <SubmitFormButton name={t("createAnnouncement")} />
      </>
    </AppForm>
  );
};

export default CreateAnnouncementForm;