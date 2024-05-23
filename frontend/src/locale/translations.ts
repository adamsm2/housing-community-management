import { ENGLISH, POLISH } from "./languages";

const translations = {
  [ENGLISH.code]: {
    translation: {
      home: "Home",
      userExists: "User with given email already exists",
      internalError: "Internal server error",
      registeredSuccessfully: "Registered successfully",
      validEmail: "Email must be a valid email",
      maxEmailLength: "Email must be at most 100 characters",
      emailRequired: "Email is required",
      maxPasswordLength: "Password must be at most 64 characters",
      minPasswordLength: "Password must be at least 8 characters",
      passwordRequired: "Password is required",
      repeatedPasswordRequired: "Repeated password is required",
      passwordMatch: "Passwords must match",
    },
  },
  [POLISH.code]: {
    translation: {
      home: "Strona główna",
      userExists: "Użytkownik z podanym emailem już istnieje",
      internalError: "Wewnętrzny błąd serwera",
      registeredSuccessfully: "Zarejestrowano pomyślnie",
      validEmail: "Email musi być poprawnym emailem",
      maxEmailLength: "Email musi mieć maksymalnie 100 znaków",
      emailRequired: "Email jest wymagany",
      maxPasswordLength: "Hasło musi mieć maksymalnie 64 znaki",
      minPasswordLength: "Hasło musi mieć co najmniej 8 znaków",
      passwordRequired: "Hasło jest wymagane",
      repeatedPasswordRequired: "Powtórzone hasło jest wymagane",
      passwordMatch: "Hasła muszą być takie same",

    },
  },
};

export default translations;