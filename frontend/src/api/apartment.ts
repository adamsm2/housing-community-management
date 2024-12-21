import { apiClient } from "./client.ts";

const apartmentControllerUrl = "/apartments";
const adminApartmentControllerUrl = "/admin/apartments";
const adminUtilityPricesControllerUrl = "/admin/utilityPrices";
const utilityPricesControllerUrl = "/utilityPrices";
const adminMeterReadingsControllerUrl = "/admin/meterReadings";

async function getCurrentUserApartments() {
  const response = await apiClient
    .get(apartmentControllerUrl + "/currentUser");
  return response.data;
}

async function getApartments() {
  const response = await apiClient
    .get(adminApartmentControllerUrl);
  return response.data;
}

async function changeApartmentOwner(changeApartmentOwnerRequest: ChangeApartmentOwnerRequest) {
  const response = await apiClient
    .post(adminApartmentControllerUrl + "/owner", changeApartmentOwnerRequest);
}

async function createApartment(createApartmentRequest: CreateApartmentRequest) {
  const response = await apiClient
    .post(adminApartmentControllerUrl, createApartmentRequest);
}

async function setUtilityPrices(setUtilityPricesRequest: SetUtilityPricesRequest, update: boolean) {
  if (update) {
    await apiClient
      .put(adminUtilityPricesControllerUrl, setUtilityPricesRequest);
  } else {
    await apiClient
      .post(adminUtilityPricesControllerUrl, setUtilityPricesRequest);
  }
}

async function getUtilityPrices(year: number) {
  const response = await apiClient
    .get(utilityPricesControllerUrl + "/" + year);
  return response.data;
}

async function getMeterReadings(apartmentNumber: number, year: number, month: number) {
  const response = await apiClient
    .get(adminMeterReadingsControllerUrl + "/" + apartmentNumber + "/" + year + "/" + month);
  return response.data;
}

async function setMeterReadings(meterReadingsRequest: MeterReadingsRequest, update: boolean) {
  if (update) {
    await apiClient
      .put(adminMeterReadingsControllerUrl, meterReadingsRequest);
  } else {
    await apiClient
      .post(adminMeterReadingsControllerUrl, meterReadingsRequest);
  }
}

export default {
  getCurrentUserApartments,
  getApartments,
  changeApartmentOwner,
  createApartment,
  setUtilityPrices,
  getUtilityPrices,
  getMeterReadings,
  setMeterReadings,
};