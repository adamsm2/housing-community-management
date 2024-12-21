import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

interface ApartmentCardProps {
  apartmentNumber: number,
  squareFootage: number,
  ownerEmail: string
}

const ApartmentCard = ({ apartmentNumber, squareFootage, ownerEmail }: ApartmentCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative cursor-pointer">
      <div
        className="relative p-6 bg-bkg border-2 border-textContent rounded-lg hover:scale-105 transition duration-500 flex flex-col">
        <div className="flex-row items-center">
          <h3 className="my-2 text-lg font-bold text-textTitle">{apartmentNumber}</h3>
        </div>
        <p className="text-textContent">
          {t("squareFootage")} {squareFootage}
        </p>
        <button className="mt-4 text-textTitle hover:text-primaryHover" disabled={true}>
          {t("editOwnerEmail")}
          <EditIcon />
        </button>
        <button className="mt-4 text-textTitle hover:text-primaryHover" disabled={true}>
          {t("Edytuj stany liczników")}
          <CorporateFareIcon />
        </button>
      </div>
    </div>
  );
};

export default ApartmentCard;