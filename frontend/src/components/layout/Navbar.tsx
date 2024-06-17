import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import useNavbarItems from "@/hooks/useNavbarItems.ts";
import SmallScreenMenu from "@/components/layout/SmallScreenMenu.tsx";
import NavbarButton from "@/components/NavbarButton.tsx";
import OptionsMenu from "@/components/layout/OptionsMenu.tsx";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pagesItems, loginLogoutItem, userFirstName } = useNavbarItems();
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  useEffect(() => {
    let previousScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= previousScrollY + 80) {
        setIsScrollingUp(false);
        previousScrollY = currentScrollY;
      } else if (currentScrollY < previousScrollY - 80) {
        setIsScrollingUp(true);
        previousScrollY = currentScrollY;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <nav
        className={"flex items-center justify-between py-2 px-8 backdrop-blur-lg shadow-lg transition-transform duration-300 "
          + (!isScrollingUp ? "-translate-y-full" : "translate-y-0")}
        aria-label="Global">
        <HomeIcon />
        <div className="flex lg:hidden">
          <h1 className="text-sm font-semibold leading-6 mr-2">{userFirstName}</h1>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex items-center lg:gap-x-12">
          {pagesItems.map((item) => (
            <NavbarButton key={item.name} name={item.name} onClick={item.onClick} />
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-1">
          <h1 className="text-sm font-semibold leading-6">{userFirstName}</h1>
          {userFirstName !== "" ?
            <OptionsMenu onLogoutItemClick={loginLogoutItem.onClick} logoutItemName={loginLogoutItem.name} />
            :
            <>
              <NavbarButton name={loginLogoutItem.name} onClick={loginLogoutItem.onClick} />
              <OptionsMenu />
            </>}
        </div>
      </nav>
      <SmallScreenMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </div>
  );

};

const HomeIcon = () => {
  const navigate = useNavigate();
  return (
    <div className="flex lg:flex-1 -m-1.5 p-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate("/")} fill="none" viewBox="0 0 24 24"
           strokeWidth={1.5}
           stroke="currentColor" className="h-8 text-primary cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
      </svg>
    </div>
  );
};

export default Navbar;