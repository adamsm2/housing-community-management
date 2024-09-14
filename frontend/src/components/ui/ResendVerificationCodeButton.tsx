import { useEffect, useState } from "react";
import UserApi from "@/api/user.ts";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ResendVerificationCodeButtonProps {
  verificationCodeExpirationDate: Date,
  email: string,
}

const ResendVerificationCodeButton = ({ verificationCodeExpirationDate, email }: ResendVerificationCodeButtonProps) => {
  const [timeLeft, setTimeLeft] = useState(verificationCodeExpirationDate.getTime() - new Date().getTime());
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResendCode = async () => {
    setIsLoading(true);
    await UserApi.resendVerificationCode(email)
      .then(() => {
        setTimeLeft(601000);
        toast.success("emailSentSuccessfully");
      })
      .catch(() => {
        toast.error("previousCodeHasntExpired");
      });
    setIsLoading(false);
  };

  const date = new Date(timeLeft);
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return (
    <div className="mt-10 flex flex-col w-full text-center text-3xl font-semibold text-textTitle">
      {isLoading ? <CircularProgress /> : <>
        {timeLeft > 0 ? <div>{t("codeWillExpireIn")} {minutes}
            <span>:</span>
            {seconds < 10 ? `0${seconds}` : seconds}</div>
          :
          <button
            className="mt-5 block w-full rounded-md bg-green-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white
             shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2
             focus-visible:outline-offset-2"
            onClick={handleResendCode}>{t("resendVerificationCode")}
          </button>
        }
      </>
      }
    </div>
  )
    ;
};

export default ResendVerificationCodeButton;