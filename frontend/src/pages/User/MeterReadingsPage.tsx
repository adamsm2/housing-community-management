import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import ApartmentApi from "@/api/apartment.ts";
import { CircularProgress } from "@mui/material";
import UserPanelCard from "@/components/ui/UserPanelCard.tsx";

const MeterReadingsPage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [userApartments, setUserApartments] = useState<Apartment[]>([]);
  const [selectedApartment, setSelectedApartment] = useState("");
  const [meterReading, setMeterReading] = useState<MeterReading | null>(null);
  const [utilityPrice, setUtilityPrice] = useState<UtilityPrice | null>(null);

  useEffect(() => {
    ApartmentApi.getCurrentUserApartments()
      .then(data => {
        setUserApartments(data);
        setIsLoading(false);
      });
  }, []);

  const handleDateChange = (newDate: SetStateAction<dayjs.Dayjs> | null) => {
    const date = newDate || dayjs();
    setSelectedDate(date);
    fetchMeterReadings(selectedApartment, date);
    fetchUtilityPrices(selectedApartment, date);
  };

  const fetchMeterReadings = (apartmentNumber: string | number, date) => {
    if (apartmentNumber !== "") {
      setIsLoading(true);
      ApartmentApi.getMeterReadings(Number(apartmentNumber), date.year(), date.month() + 1)
        .then(data => {
          setMeterReading(data);
        })
        .catch(() => {
          setMeterReading(null);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const fetchUtilityPrices = (apartmentNumber: string | number, date) => {
    if (apartmentNumber !== "") {
      ApartmentApi.getUtilityPrices(date.year())
        .then(data => {
          setUtilityPrice(data);
        })
        .catch(err => {
          setUtilityPrice(null);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="text-center mx-auto max-w-2xl">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <div className="flex flex-col w-full sm:flex-row sm:gap-5">
            <DatePicker
              className="w-full sm:w-auto sm:flex-1"
              label={t("monthYear")}
              openTo="year"
              value={selectedDate}
              onChange={handleDateChange}
              views={["year", "month"]}
              slotProps={{
                layout: { className: "bg-bkg text-textTitle" },
                textField: {
                  className: "bg-bkg",
                  InputLabelProps: { className: "!text-textTitle" },
                  InputProps: { className: "!text-textTitle" },
                },
                openPickerIcon: { className: "text-textTitle" },

              }}
            />
            <select
              className="sm:flex-1 sm:mt-0 mt-2 h-14 px-2 bg-bkg text-textTitle w-full focus:outline-none border-2 border-transparent focus:border-blue-500"
              value={selectedApartment}
              onChange={(e) => {
                if (e.target.value === "") {
                  setSelectedApartment("");
                  return;
                }
                setSelectedApartment(Number(e.target.value));
                fetchMeterReadings(e.target.value, selectedDate);
                fetchUtilityPrices(e.target.value, selectedDate);
              }}>
              <option value="">{t("chooseApartment")}</option>
              {userApartments.map((apartment) => (
                <option key={apartment.number} value={apartment.number}>{apartment.number}</option>
              ))}
            </select>
          </div>
        </DemoContainer>
      </LocalizationProvider>
      {
        selectedApartment !== "" ? (
          isLoading ? <CircularProgress /> : (
            <div className="mt-5 gap-2 flex flex-col">
              <UserPanelCard name={"Prąd"} meterReading={meterReading?.electricityMeterReading}
                             price={utilityPrice?.electricityPricePerUnit} />
              <UserPanelCard name={"Woda"} meterReading={meterReading?.waterMeterReading}
                             price={utilityPrice?.waterPricePerUnit} />
            </div>
          )
        ) : null
      }
    </div>
  );
};

export default MeterReadingsPage;