import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ApartmentApi from "@/api/apartment.ts";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { CircularProgress } from "@mui/material";
import { useAppDispatch } from "@/hooks/reduxHooks.ts";
import { updateApartmentOwner } from "@/redux/apartmentsSlice.ts";

interface EditOwnerEmailModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  ownerEmail: string;
  apartmentNumber: number;
}

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const EditOwnerEmailModal = ({ open, setOpen, ownerEmail, apartmentNumber }: EditOwnerEmailModalProps) => {
  const dispatch = useAppDispatch();
  const [newOwnerEmail, setNewOwnerEmail] = useState(ownerEmail);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSave = () => {
    if (!validateEmail(newOwnerEmail)) {
      setError(t("validEmail"));
      return;
    }
    setIsLoading(true);
    ApartmentApi.changeApartmentOwner({ newOwnerEmail, apartmentNumber })
      .then(() => {
        setOpen(false);
        dispatch(updateApartmentOwner({ roomNumber: apartmentNumber, newOwnerEmail }));
      })
      .catch(() => {
        setError(t("userDoesntExist"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Transition show={open}>
      <Dialog className="fixed inset-0 z-50 flex items-center justify-center" onClose={() => setOpen(false)}>
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
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPanel
            className="fixed inset-y-auto inset-x-auto z-50 overflow-y-auto bg-bkg px-6 py-6 max-w-sm shadow-md shadow-textContent">
            <div className="flex gap-4">
              <span className="flex-1 font-semibold">{t("editOwnerEmail")}</span>
              <button
                type="button"
                className="-m-2.5 rounded-md"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
            <span>{t("apartmentNumber") + ": " + apartmentNumber}</span>
            <input
              type="email"
              value={newOwnerEmail}
              onChange={(e) => setNewOwnerEmail(e.target.value)}
              className="w-full mt-2 h-14 px-2 bg-bkg text-textTitle focus:outline-none border-2 focus:border-blue-500 border-textContent"
              placeholder={t("email")}
            />
            <span className="text-red-500">{error}</span>
            {isLoading ?
              <CircularProgress /> :
              <button
                className="mt-5 block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryHover"
                onClick={handleSave}
              >{t("save")}</button>}
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default EditOwnerEmailModal;