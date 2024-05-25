import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { ENGLISH, Language, LANGUAGES, POLISH } from "../locale/languages.ts";
import localStorageKeys from "@/localstorage-keys.ts";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { ThemeContext } from "@/store/ThemeContext.tsx";


const SelectLanguage = () => {
  const { i18n } = useTranslation();
  const { colors } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const getLanguageFromCode = (code: string): Language => {
    switch (code) {
      case "pl":
        return POLISH;
      case "en":
        return ENGLISH;
      default:
        return POLISH;
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState(
    getLanguageFromCode(localStorage.getItem("language") ?? "pl"),
  );


  const handleLanguageSelect = (language: Language) => {
    localStorage.setItem(localStorageKeys.LANGUAGE, language.code);
    i18n.changeLanguage(language.code)
      .then(() => setSelectedLanguage(language))
      .catch((error) => console.error(error));
    handleClose();
  };

  return (
    <Box>
      <IconButton onClick={handleClick} size="medium" sx={{ margin: 0, padding: 0 }}>
        <Box component="img" width="32px" src={selectedLanguage.flagIcon} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}
            sx={
              {
                mt: "1px", "& .MuiMenu-paper":
                  { backgroundColor: colors.primary200 },
              }}>
        {LANGUAGES.map((language) => {
          return (
            <MenuItem
              onClick={() => handleLanguageSelect(language)}
              key={language.code}
            >
              <Box
                component="img"
                width="32px"
                src={language.flagIcon}
                sx={{ mr: 1, color: colors.text }}
              />
              {language.label}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>

  );
};

export default SelectLanguage;