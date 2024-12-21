import { CreditCardIcon, PresentationChartLineIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import paths from "@/router/paths.ts";
import { useNavigate } from "react-router-dom";

const UserPanelPresentationSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const features = [
    {
      name: t("checkStateOfMeters"),
      description:
        t("checkStateOfMetersDescription"),
      icon: PresentationChartLineIcon,
    },
    {
      name: t("checkUpcomingFees"),
      description: t("checkUpcomingFeesDescription"),
      icon: CreditCardIcon,
    },
  ];
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 overflow-hidden">
      <div
        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="lg:pr-8 lg:pt-4">
          <div className="lg:max-w-lg">
            <h2 className="text-base font-semibold leading-7 text-primary">{t("everythingInOnePlace")}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t("residentsPanel")}</p>
            <p className="mt-6 text-lg leading-8 text-textContent">
              {t("hereYouCanCheck")}
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 textContent lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold">
                    <feature.icon className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  {" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
              <div className="mt-10 flex items-center gap-x-6">
                <button
                  onClick={() => navigate(paths.auth.register)}
                  className="cursor-pointer shadow-sm rounded-full bg-primary px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {t("createResidentAccount")}
                </button>
                <button
                  onClick={() => navigate(paths.contact)}
                  className=" px-3.5 py-2.5 text-sm font-semibold hover:font-bold text-center">
                  {t("findOutMore")}<span aria-hidden="true">→</span>
                </button>
              </div>
            </dl>
          </div>
        </div>
        <img
          src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
          alt="Product screenshot"
          className="w-[42rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          width={2432}
          height={1442}
        />
      </div>
    </div>
  );
};

export default UserPanelPresentationSection;