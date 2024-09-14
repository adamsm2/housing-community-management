import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import VerifyEmailForm from "@/components/forms/VerifyEmailForm.tsx";
import { useEffect, useState } from "react";
import UserApi from "@/api/user.ts";
import ResendVerificationCodeButton from "@/components/ui/ResendVerificationCodeButton.tsx";

const VerifyEmailPage = () => {
  const { email = "" } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [verificationCodeExpirationDate, setVerificationCodeExpirationDate] = useState<Date | null>(null);

  useEffect(() => {
    const getVerificationCodeExpirationDate = async () => {
      await UserApi.getVerificationCodeExpirationDate(email)
        .then((response) => {
          setVerificationCodeExpirationDate(new Date(response));
        })
        .catch((userDoesntExistsOrIsAlreadyVerifiedError) => {
          navigate("/");
        });
    };
    getVerificationCodeExpirationDate();
  }, []);

  return (
    <div className="px-6 py-24 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-textTitle sm:text-4xl">{t("verifyEmail")}</h2>
        <p className="mt-2 text-lg leading-8 text-textContent">
          {t("verifyEmailDescription")}
          <span className="text-textTitle">
            {email}
          </span>
          {". "}
          {t("enterCodeBelow")}
        </p>
      </div>
      <div className="mx-auto max-w-lg">
        <VerifyEmailForm email={email} />
        {verificationCodeExpirationDate &&
          <ResendVerificationCodeButton verificationCodeExpirationDate={verificationCodeExpirationDate}
                                        email={email} />}
      </div>
    </div>
  );
};

export default VerifyEmailPage;