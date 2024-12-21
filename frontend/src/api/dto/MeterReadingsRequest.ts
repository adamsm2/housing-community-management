interface MeterReadingsRequest {
  apartmentNumber: number;
  month: number;
  year: number;
  electricityMeterReading: number;
  waterMeterReading: number;
  paymentStatus: string;
}