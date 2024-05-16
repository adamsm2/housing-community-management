import english from "../assets/english-flag.png";
import polish from "../assets/polish-flag.png";

export interface Language {
  label: string;
  code: string;
  flagIcon: string;
}

export const POLISH: Language = {
  label: "Polski",
  code: "pl",
  flagIcon: polish,
};
export const ENGLISH: Language = {
  label: "English",
  code: "en",
  flagIcon: english,
};

export const LANGUAGES = [POLISH, ENGLISH];