"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

type Language = "ar" | "en";
type AppContextValue = {
  language: Language;
  senior: boolean;
  setLanguage: (language: Language) => void;
  setSenior: (senior: boolean) => void;
  tr: (ar: string, en: string) => string;
  notify: (message: string) => void;
};

const fallbackContext: AppContextValue = {
  language: "ar",
  senior: false,
  setLanguage: () => undefined,
  setSenior: () => undefined,
  tr: (ar) => ar,
  notify: () => undefined,
};

const AppContext = createContext<AppContextValue>(fallbackContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");
  const [senior, setSeniorState] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("rafeeq-language") as Language | null;
    const savedSenior = localStorage.getItem("rafeeq-senior") === "true";
    if (savedLanguage === "ar" || savedLanguage === "en") setLanguageState(savedLanguage);
    setSeniorState(savedSenior);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.body.dataset.senior = senior ? "true" : "false";
  }, [language, senior]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const setLanguage = useCallback((value: Language) => {
    localStorage.setItem("rafeeq-language", value);
    setLanguageState(value);
  }, []);

  const setSenior = useCallback((value: boolean) => {
    localStorage.setItem("rafeeq-senior", String(value));
    setSeniorState(value);
  }, []);

  const value = useMemo<AppContextValue>(() => ({
    language,
    senior,
    setLanguage,
    setSenior,
    tr: (ar, en) => (language === "ar" ? ar : en),
    notify: setToast,
  }), [language, senior, setLanguage, setSenior]);

  return (
    <AppContext.Provider value={value}>
      {children}
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={20} />
          <span>{toast}</span>
          <button aria-label="إغلاق" onClick={() => setToast("")}><X size={17} /></button>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useRafeeq() {
  return useContext(AppContext);
}
