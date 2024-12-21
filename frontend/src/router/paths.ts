const paths = {
  root: "/",
  auth: {
    root: "/auth",
    login: "/auth/login",
    register: "/auth/register",
    verifyEmail: "/auth/verify/:email",
  },
  announcements: "/announcements",
  contact: "/contact",
  user: {
    root: "/UserPanel",
    meters: "/UserPanel/meters",
    upcomingCharges: "/UserPanel/upcomingCharges",
  },
  admin: {
    root: "/AdminPanel",
    createApartment: "/AdminPanel/createApartment",
    createAnnouncement: "/AdminPanel/createAnnouncement",
    setUtilityPrices: "/AdminPanel/setUtilityPrices",
    updateMeterReadings: "/AdminPanel/updateMeterReadings",
  },
};

export const getPathWithParams = (path, params) => {
  return Object.keys(params).reduce(
    (acc, param) => acc.replace(`:${param}`, params[param]),
    path,
  );
};

export default paths;