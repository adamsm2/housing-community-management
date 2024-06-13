import paths from "@/router/paths.ts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const IntroductionSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();


  return (
    <div className="text-center mx-auto max-w-2xl py-20 sm:py-24 lg:py-24">
      <h1 className="text-4xl font-bold tracking-tight text-textTitle sm:text-6xl">
        {t("warsawHousingCommunity")}
      </h1>
      <p className="mt-6 text-lg leading-8 text-textContent">
        {t("introductionSection")}
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
          onClick={() => navigate(paths.auth.register)}
          className="cursor-pointer shadow-sm rounded-full bg-primary px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t("createResidentAccount")}
        </button>
        <button
          onClick={() => navigate(paths.auth.login)}
          className="rounded-full px-3.5 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-textContent hover:bg-secondaryHover">
          {t("signIn")}
        </button>
      </div>
    </div>
  );
};

export default IntroductionSection;