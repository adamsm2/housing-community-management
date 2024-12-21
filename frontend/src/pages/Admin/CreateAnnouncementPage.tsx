import { useTranslation } from "react-i18next";
import LoginUserForm from "@/components/forms/LoginUserForm.tsx";

const CreateAnnouncementPage = () => {
  const { t } = useTranslation();

  return (
    <div className="px-6 lg:px-8">
      <LoginUserForm></LoginUserForm>
    </div>
  );
};

export default CreateAnnouncementPage;