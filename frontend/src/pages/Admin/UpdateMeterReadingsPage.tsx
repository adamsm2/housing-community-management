import { SetStateAction, useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ApartmentApi from "@/api/apartment.ts";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";
import UpdateMeterReadingsForm from "@/components/forms/UpdateMeterReadingsForm.tsx";

const UpdateMeterReadingsPage = () => {
  const [selectedApartment, setSelectedApartment] = useState<number | string>("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { t } = useTranslation();
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meterReading, setMeterReading] = useState<MeterReading | null>(null);

  useEffect(() => {
    ApartmentApi.getApartments()
      .then(data => {
        setIsLoading(false);
        setApartments(data.content);
      });
  }, []);

  const handleDateChange = (newDate: SetStateAction<dayjs.Dayjs> | null) => {
    const date = newDate || dayjs();
    setSelectedDate(date);
    fetchMeterReadings(selectedApartment, date);
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
              }}>
              <option value="">{t("chooseApartment")}</option>
              {apartments.map((apartment) => (
                <option key={apartment.number} value={apartment.number}>{apartment.number}</option>
              ))}
            </select>
          </div>
        </DemoContainer>
      </LocalizationProvider>
      {
        selectedApartment !== "" ? (
          isLoading ? <CircularProgress /> : (
            <UpdateMeterReadingsForm apartmentNumber={Number(selectedApartment)} month={selectedDate.month() + 1}
                                     year={selectedDate.year()} meterReading={meterReading} />
          )
        ) : null
      }
    </div>
  );
};

export default UpdateMeterReadingsPage;