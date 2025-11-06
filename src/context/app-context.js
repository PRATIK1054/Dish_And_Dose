'use client'

import React, { createContext, useState, useEffect } from "react";
import English from "../locale/en.json";
import Hindi from "../locale/hi.json";
import Marathi from "../locale/mr.json";

export const AppContext = createContext();

const langObj = {
  "English": English,
  "Hindi": Hindi,
  "Marathi": Marathi,
};

export const AppWrapper = ({ children }) => {
  const [lang, setLang] = useState("English");
  const [dict, setDict] = useState(langObj[lang]);

  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang && langObj[storedLang]) {
      setLang(storedLang);
      setDict(langObj[storedLang]);
    } else {
      setDict(langObj['English']);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    setDict(langObj[lang]);
  }, [lang]);

  return (
    <AppContext.Provider value={{ dict, lang, setLang }}>
      {children}
    </AppContext.Provider>
  );
};
