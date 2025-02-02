import { apiClient } from "./client.ts";
import { VerifyEmailRequest } from "@/api/dto/VerifyEmailRequest.ts";

const userControllerUrl = "/users/";
const userControllerUrlWithRefreshToken = "/users/token/";
const adminAnnouncementControllerUrl = "/admin/announcements";
const announcmentControllerUrl = "users/announcements";

async function registerUser(registerUserRequest: RegisterUserRequest) {
  const response = await apiClient
    .post(userControllerUrl + "register", registerUserRequest);
  return response.data;
}

async function loginUser(loginUserRequest: LoginUserRequest) {
  const response = await apiClient
    .post(userControllerUrl + "login", loginUserRequest);
  return response.data;
}

async function logoutUser() {
  await apiClient
    .post(userControllerUrlWithRefreshToken + "logout");
}

async function getCurrentUserData() {
  const response = await apiClient
    .get(userControllerUrl + "current");
  return response.data;
}

async function verifyUserEmail(verifyUserEmailRequest: VerifyEmailRequest) {
  const response = await apiClient
    .post(userControllerUrl + "verify", verifyUserEmailRequest);
  return response.data;
}

async function getVerificationCodeExpirationDate(email: string | undefined) {
  const response = await apiClient
    .get(userControllerUrl + "verificationCode/expiration/" + email);
  return response.data;
}

async function resendVerificationCode(email: string) {
  await apiClient.post(userControllerUrl + "resend/verification", { email });
}

async function createAnnouncement(createAnnouncementRequest: CreateAnnouncementRequest) {
  const response = await apiClient
    .post(adminAnnouncementControllerUrl, createAnnouncementRequest);
  return response.data;
}

async function getAnnouncements() {
  const response = await apiClient
    .get(announcmentControllerUrl);
  return response.data;
}


export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserData,
  verifyUserEmail,
  getVerificationCodeExpirationDate,
  resendVerificationCode,
  createAnnouncement,
  getAnnouncements,
};