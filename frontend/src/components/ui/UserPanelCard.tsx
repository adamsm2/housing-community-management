interface UserPanelCardProps {
  name: string,
  meterReading?: number,
  price?: number
}

const UserPanelCard = ({ name, meterReading, price }: UserPanelCardProps) => {
  return (
    <div className="relative cursor-pointer">
      <div
        className="relative p-6 bg-bkg border-2 border-textContent rounded-lg hover:scale-105 transition duration-500 flex flex-col">
        <div className="flex-row items-center">
          <h3 className="my-2 text-lg font-bold text-textTitle">{name}</h3>
        </div>
        <p className="text-textContent">
          Odczyt z licznika: {meterReading ? meterReading : "Brak danych"}
        </p>
        <p className="text-textContent">
          Przewidywana opłata: {meterReading && price ? meterReading * price : "Brak danych"}
        </p>
      </div>
    </div>
  );
};

export default UserPanelCard;