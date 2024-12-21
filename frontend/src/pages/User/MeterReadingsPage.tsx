import ApartmentCard from "@/components/ui/ApartmentCard.tsx";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import ApartmentApi from "@/api/apartment.ts";
import { CircularProgress } from "@mui/material";

const MeterReadingsPage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [userApartments, setUserApartments] = useState<Apartment[]>([]);
  const [selectedApartment, setSelectedApartment] = useState("");

  useEffect(() => {
    ApartmentApi.getCurrentUserApartments()
      .then(data => {
        setUserApartments(data);
        setIsLoading(false);
      });
  }, []);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate !== null ? newDate : dayjs());
    if (selectedApartment !== "") {

    }
  };

  const fetchMeterReadings = () => {

  };

  return (
    <div className="text-center mx-auto max-w-3xl">
      {isLoading ? <CircularProgress /> :
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <div className="flex flex-col w-full sm:flex-row sm:gap-5">
                <DatePicker
                  className="w-full sm:w-auto sm:flex-1"
                  label={"MIESIĄC, ROK"}
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
                  onChange={(e) => setSelectedApartment(e.target.value)}>
                  <option value="">Wybierz mieszkanie</option>
                  {userApartments.map((apartment) => (
                    <option key={apartment.number} value={apartment.number}>{apartment.number}</option>
                  ))}
                </select>
              </div>
            </DemoContainer>
          </LocalizationProvider>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ApartmentCard />
            <ApartmentCard />
            <ApartmentCard />
            <ApartmentCard />
          </div>
        </>
      }
    </div>
  );
};

export default MeterReadingsPage;