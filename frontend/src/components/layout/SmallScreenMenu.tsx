import useNavbarItems from "@/hooks/useNavbarItems.ts";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import ThemeSwitch from "@/components/ui/ThemeSwitch.tsx";
import LanguageSwitch from "@/components/ui/LanguageSwitch.tsx";
import { XMarkIcon } from "@heroicons/react/20/solid";


const SmallScreenMenu = (props: { mobileMenuOpen: boolean; setMobileMenuOpen: (value: boolean) => void }) => {
  const { pagesItems, loginLogoutItem } = useNavbarItems();
  return (
    <Transition show={props.mobileMenuOpen}>
      <Dialog className="lg:hidden fixed inset-0 z-50" onClose={props.setMobileMenuOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-textContent bg-opacity-25 transition-opacity"></div>
        </TransitionChild>
        <TransitionChild
          enter="ease-out duration-100"
          enterFrom="w-0"
          enterTo="w-56"
          leave="ease-in duration-200"
          leaveFrom="w-56"
          leaveTo="w-0"
        >
          <DialogPanel
            className="fixed inset-y-0 right-0 z-50 overflow-y-auto bg-bkg px-6 py-6 max-w-sm shadow-md shadow-textContent">
            <div className="text-right">
              <button
                type="button"
                className="-m-2.5 rounded-md"
                onClick={() => props.setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {pagesItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={item.onClick}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <div>
                  <button
                    onClick={loginLogoutItem.onClick}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                  >
                    {loginLogoutItem.name}
                  </button>
                </div>
                <div className="flex flex-row py-4 gap-4">
                  <ThemeSwitch />
                  <LanguageSwitch />
                </div>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default SmallScreenMenu;