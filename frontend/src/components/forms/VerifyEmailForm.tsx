import InputOtp from "@/components/ui/InputOtp.tsx";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/hooks/reduxHooks.ts";
import SubmitFormButton from "@/components/ui/SubmitFormButton.tsx";
import { useNavigate } from "react-router-dom";
import { verifyUserEmail } from "@/redux/authActions.ts";
import { CircularProgress } from "@mui/material";
import paths from "@/router/paths.ts";

interface VerifyEmailFormProps {
  email: string;
}

const VerifyEmailForm = ({ email }: VerifyEmailFormProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = refs.current.map((ref) => ref!.value).join("");
    if (code.length < 6) {
      toast.error(t("notEnoughCharacters"));
      return;
    }
    setIsLoading(true);
    const response = await dispatch(verifyUserEmail({ email, code }));
    if (response.error) {
      toast.error(t("invalidCodeOrExpired"));
    } else {
      toast.success(t("userVerified"));
      navigate(paths.auth.login);
      return;
    }
    setIsLoading(false);
  };

  const handleOtpComplete = () => {
    if (formRef.current) {
      const submitEvent = new Event("submit", { cancelable: true, bubbles: true });
      formRef.current.dispatchEvent(submitEvent);
    }
  };

  return (
    <>
      {isLoading ? <div className="mt-20 flex justify-center"><CircularProgress /></div> :
        <form ref={formRef} onSubmit={handleSubmit} className="mx-auto mt-10 max-w-lg sm:mt-10">
          <InputOtp inputLength={6} refs={refs} onComplete={handleOtpComplete} />
          <SubmitFormButton name={t("verifyEmail")} />
        </form>
      }
    </>
  );
};

export default VerifyEmailForm;