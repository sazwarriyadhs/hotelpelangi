'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'id' | 'en';
type Currency = 'IDR' | 'USD';

interface SettingsContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('id');
  const [currency, setCurrencyState] = useState<Currency>('IDR');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLocale = localStorage.getItem('locale') as Locale | null;
    const storedCurrency = localStorage.getItem('currency') as Currency | null;
    if (storedLocale) {
      setLocaleState(storedLocale);
    }
    if (storedCurrency) {
      setCurrencyState(storedCurrency);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (isMounted) {
      localStorage.setItem('locale', newLocale);
    }
  };

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
      if (isMounted) {
      localStorage.setItem('currency', newCurrency);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <SettingsContext.Provider value={{ locale, setLocale, currency, setCurrency }}>
      {children}
    </SettingsContext.Provider>
  );
}
