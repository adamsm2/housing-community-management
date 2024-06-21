import { ENGLISH, POLISH } from "./languages";

const translations = {
  [ENGLISH.code]: {
    translation: {
      home: "Home",
      userExists: "User with given email already exists",
      internalError: "Internal server error",
      registeredSuccessfully: "Registered successfully",
      validEmail: "Please enter a valid email address",
      emailRequired: "Please provide an email",
      maxPasswordLength: "Password must be at most 64 characters",
      minPasswordLength: "Your password must be at least 8 characters long. Please try another.",
      passwordRequired: "Please provide a password",
      repeatedPasswordRequired: "Please provide a repeated password",
      passwordMatch: "Passwords must match",
      invalidCredentials: "Invalid credentials",
      signIn: "Sign in",
      announcements: "Announcements",
      userPanel: "User panel",
      createNewAccount: "Create new account",
      backToLogin: "Back to login",
      logout: "Logout",
      contact: "Contact",
      warsawHousingCommunity: "Warsaw Housing Community",
      createResidentAccount: "Create a resident account",
      introductionSection: "        If you are interested in our housing community or you are a resident of it, you are in the right place.\n" +
        "        Here you will find, among other things, announcements related to our community, and after creating a resident account or\n" +
        "        signing in, you will be able to check the states of your meters, information about your fees and much\n" +
        "        more.",
      ourHousingCommunity: "Our housing community",
      everythingInOnePlace: "Everything in one place",
      residentsPanel: "Resident's panel",
      hereYouCanCheck: "Here you can check the states of your meters, information about your fees and much\n" +
        "more.",
      checkStateOfMeters: "Check the state of your meters",
      checkStateOfMetersDescription: "water, gas, electricity, and others, all in one place with the ability to search for meter readings from any period.",
      checkUpcomingFees: "Check upcoming fees",
      checkUpcomingFeesDescription: "and prices that were in a given period.",
      findOutMore: "Find out more",
      firstNameRequired: "Please provide your first name",
      lastNameRequired: "Please provide your last name",
      infoAboutCreatingAccount: "Remember that you will get access to the resident's panel only after assigning a flat to your account by the housing community management.",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      password: "Password",
      passwordRepeated: "Repeated password",
      backToLoginPage: "Back to login page",
    },
  },
  [POLISH.code]: {
    translation: {
      home: "Strona główna",
      userExists: "Użytkownik z podanym emailem już istnieje",
      internalError: "Wewnętrzny błąd serwera",
      registeredSuccessfully: "Zarejestrowano pomyślnie",
      validEmail: "Email musi być poprawnym emailem",
      emailRequired: "Email jest wymagany",
      minPasswordLength: "Hasło musi mieć co najmniej 8 znaków",
      passwordRequired: "Hasło jest wymagane",
      repeatedPasswordRequired: "Powtórzone hasło jest wymagane",
      passwordMatch: "Hasła muszą być takie same",
      invalidCredentials: "Nieprawidłowe dane logowania",
      signIn: "Zaloguj się",
      announcements: "Ogłoszenia",
      userPanel: "Panel użytkownika",
      createNewAccount: "Utwórz nowe konto",
      backToLogin: "Powróć do logowania",
      logout: "Wyloguj",
      contact: "Kontakt",
      warsawHousingCommunity: "Warszawska wspólnota mieszkaniowa",
      createResidentAccount: "Utwórz konto mieszkańca",
      introductionSection: "        Jeżeli jesteś zainteresowany naszą wspólnotą mieszkaniową lub jesteś jej mieszkańcem to znalazłeś się we\n" +
        "        właściwym miejscu.\n" +
        "        Znajdziesz tutaj między innymi ogłoszenia dotyczące naszej wspólnoty, a po utworzeniu konta mieszkańca lub\n" +
        "        zalogowaniu się\n" +
        "        będziesz mógł sprawdzić między innymi stany swoich liczników, informacje o swoich opłatach oraz wiele\n" +
        "        innych.",
      ourHousingCommunity: "Nasza wspólnota mieszkaniowa",
      everythingInOnePlace: "Wszystko w jednym miejscu",
      residentsPanel: "Panel mieszkańca",
      hereYouCanCheck: "To tutaj sprawdzisz między innymi stany swoich liczników, informacje o swoich opłatach oraz wiele\n" +
        "wiele więcej.",
      checkStateOfMeters: "Sprawdź stan swoich liczników",
      checkStateOfMetersDescription: "wody, gazu, prądu i innych, a to wszystko w jednym miejscu z możliwością wyszukiwania stanów licznika z dowolnego okresu.",
      checkUpcomingFees: "Sprawdź nadchodzące opłaty",
      checkUpcomingFeesDescription: "oraz ceny jakie były w danym okresie.",
      findOutMore: "Dowiedz się więcej",
      firstNameRequired: "Podaj swoje imię",
      lastNameRequired: "Podaj swoje nazwisko",
      infoAboutCreatingAccount: "Pamiętaj, że dostęp do panelu mieszkańca otrzymasz dopiero po przypisaniu mieszkania do twojego konta przez zarząd wspólnoty mieszkaniowej.",
      firstName: "Imię",
      lastName: "Nazwisko",
      email: "Email",
      password: "Hasło",
      passwordRepeated: "Powtórzone hasło",
      backToLoginPage: "Powróć do strony logowania",
    },
  },
};

export default translations;