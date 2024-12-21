import ApartmentApi from "@/api/apartment.ts";
import { useEffect, useState } from "react";
import { CircularProgress, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import EditOwnerEmailModal from "@/pages/Admin/EditOwnerEmailModal.tsx";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks.ts";
import { selectApartments, setApartments } from "@/redux/apartmentsSlice.ts";

const ApartmentsListPage = () => {
  const dispatch = useAppDispatch();
  const apartments = useAppSelector(selectApartments);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [ownerEmail, setOwnerEmail] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState(0);

  useEffect(() => {
    ApartmentApi.getApartments()
      .then(data => {
        setIsLoading(false);
        dispatch(setApartments({ apartments: data.content }));
      });
  }, []);

  const handleEditOwnerEmail = (ownerEmail: string, apartmentNumber: number) => {
    setOpen(true);
    setOwnerEmail(ownerEmail);
    setApartmentNumber(apartmentNumber);
  };

  /*  const handleSaveEmail = (apartmentNumber, newEmail) => {
      setApartments((prevApartments) =>
        prevApartments.map((apartment) =>
          apartment.number === apartmentNumber
            ? { ...apartment, ownerEmail: newEmail }
            : apartment
        )
      );
    };*/

  const columnNames = [t("number"), t("squareFootage"), t("ownerEmail")];

  return (
    <>
      <div className="text-center mx-auto max-w-2xl">
        {isLoading ? <CircularProgress /> :
          <table className="table-auto w-full text-left border-collapse border border-gray-200">
            <thead>
            <tr>
              {columnNames.map(columnName => (
                <th key={columnName} className="border border-gray-200 px-4 py-2">{columnName}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {apartments.apartments?.map(apartment => (
              <tr key={apartment.number} className="border-b border-gray-200">
                <td className="border border-gray-200 px-4 py-2">{apartment.number}</td>
                <td className="border border-gray-200 px-4 py-2">{apartment.squareFootage}m²</td>
                <td className="border border-gray-200 px-4 py-2 flex items-center">
                  <span>{apartment.ownerEmail ? apartment.ownerEmail : t("noOwner")}</span>
                  <Tooltip placement="right" title={t("editOwner")}>
                    <button onClick={() => handleEditOwnerEmail(apartment?.ownerEmail || "", apartment.number)}
                            className="ml-auto"><EditIcon /></button>
                  </Tooltip>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        }
      </div>
      <EditOwnerEmailModal open={open} setOpen={setOpen} ownerEmail={ownerEmail}
                           apartmentNumber={apartmentNumber} />
    </>
  );
};

export default ApartmentsListPage;