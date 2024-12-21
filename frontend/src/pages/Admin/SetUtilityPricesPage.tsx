import { useState } from "react";
import ApartmentApi from "@/api/apartment.ts";
import SetUtilityPricesForm from "@/components/forms/SetUtilityPricesForm.tsx";

const SetUtilityPricesPage = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [utilityPrice, setUtilityPrice] = useState<UtilityPrice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
    setIsLoading(true);
    ApartmentApi.getUtilityPrices(year)
      .then(data => {
        setUtilityPrice(data);
      })
      .catch(err => {
        setUtilityPrice(null);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="text-center mx-auto max-w-2xl">
      <select
        className="sm:flex-1 sm:mt-0 mt-2 h-14 px-2 bg-bkg text-textTitle w-full focus:outline-none border-2 border-transparent focus:border-blue-500"
        value={selectedYear}
        onChange={(e) => handleSelectYear(e.target.value)}>
        <option value="">Wybierz rok</option>
        {Array.from({ length: 100 }, (_, i) => 2000 + i).map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      {!isLoading ? (!isNaN(Number(selectedYear)) ?
        <SetUtilityPricesForm year={Number(selectedYear)}
                              electricityPricePerUnit={utilityPrice?.electricityPricePerUnit}
                              waterPricePerUnit={utilityPrice?.waterPricePerUnit} /> : null) : null
      }
    </div>
  );
};

export default SetUtilityPricesPage;