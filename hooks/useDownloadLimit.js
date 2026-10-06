"use client";

import { useState, useEffect, useCallback } from "react";

const LS_KEY = "daily_downloads";
const LS_DATE_KEY = "daily_downloads_date";
const DAILY_LIMIT = 10;
const EVENT_NAME = "daily-downloads-changed";

function getToday() {
  return new Date().toDateString();
}

function getStoredState() {
  try {
    const today = getToday();
    const storedDate = localStorage.getItem(LS_DATE_KEY);
    let count = Number(localStorage.getItem(LS_KEY));

    if (storedDate !== today || Number.isNaN(count) || count < 0) {
      localStorage.setItem(LS_DATE_KEY, today);
      localStorage.setItem(LS_KEY, "0");
      return { count: 0, date: today };
    }

    return { count, date: storedDate };
  } catch {
    return { count: 0, date: getToday() };
  }
}

function consumeDownload() {
  try {
    const today = getToday();
    localStorage.setItem(LS_DATE_KEY, today);
    const newCount = getStoredState().count + 1;
    localStorage.setItem(LS_KEY, String(newCount));
    window.dispatchEvent(new Event(EVENT_NAME));
    return newCount;
  } catch {
    return getStoredState().count;
  }
}

export function useDownloadLimit() {
  const [remaining, setRemaining] = useState(DAILY_LIMIT);
  const [date, setDate] = useState(null);

  const refresh = useCallback(() => {
    const state = getStoredState();
    setRemaining(Math.max(0, DAILY_LIMIT - state.count));
    setDate(state.date);
  }, []);

  useEffect(() => {
    refresh();

    function onStorage(e) {
      if (e.key === LS_KEY || e.key === LS_DATE_KEY) {
        refresh();
      }
    }

    function onCustom() {
      refresh();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(EVENT_NAME, onCustom);

    const interval = setInterval(refresh, 60000);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT_NAME, onCustom);
      clearInterval(interval);
    };
  }, [refresh]);

  const isBlocked = remaining <= 0;

  const consume = useCallback(() => {
    if (isBlocked) return false;
    const newCount = consumeDownload();
    setRemaining(Math.max(0, DAILY_LIMIT - newCount));
    return true;
  }, [isBlocked]);

  return {
    remaining,
    limit: DAILY_LIMIT,
    date,
    isBlocked,
    consume,
    refresh,
  };
}
