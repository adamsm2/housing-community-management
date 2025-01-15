import { useTranslation } from "react-i18next";
import CreateAnnouncementForm from "@/components/forms/CreateAnnouncementForm.tsx";

const CreateAnnouncementPage = () => {
  const { t } = useTranslation();

  return (
    <div className="px-6 lg:px-8">
      <CreateAnnouncementForm />
    </div>
  );
};

export default CreateAnnouncementPage;