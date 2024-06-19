import { Bars3Icon } from "@heroicons/react/24/outline";
import ThemeSwitch from "@/components/ThemeSwitch.tsx";
import LanguageSwitch from "@/components/LanguageSwitch.tsx";

interface OptionsMenuProps {
  logoutItemName?: string;
  onLogoutItemClick?: () => void;
}

const OptionsMenu = (props: OptionsMenuProps) => {
  return (
    <button
      type="button"
      className="-m-2.5 rounded-md group pl-4 pr-2"
    >
      <span className="sr-only">Open main menu</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      <div
        className="absolute w-28 text-left px-4 min-w-max left-auto right-6 rounded-md shadow-lg bg-bkg transition-all duration-100 scale-0 origin-bottom group-hover:scale-100">
        <div className="flex flex-row gap-2 pb-2">
          <ThemeSwitch />
          <LanguageSwitch />
        </div>
        {props.logoutItemName ?
          <div className="pt-2 pb-1 mb-1 border-t-2 border-gray-500/10">
            <h1 onClick={props.onLogoutItemClick}
                className="text-sm font-semibold leading-6 transition-colors ease-out duration-300 hover:font-bold">{props.logoutItemName}</h1>
          </div> : null}
      </div>
    </button>
  );
};

export default OptionsMenu;