import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isTamil, setIsTamil] = useState(false);
  const [translations, setTranslations] = useState({});

  return (
    <LanguageContext.Provider value={{ isTamil, setIsTamil, translations, setTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
