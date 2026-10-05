// const DAILY_LIMIT = 5; // Disabled - no daily limit
const LS_KEY = "daily_downloads";
const LS_DATE_KEY = "daily_downloads_date";
const EVENT_NAME = "daily-downloads-changed";

function getDailyCount() {
  try {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(LS_DATE_KEY);
    const storedCount = Number(localStorage.getItem(LS_KEY));
    if (storedDate !== today || Number.isNaN(storedCount) || storedCount < 0) {
      localStorage.setItem(LS_DATE_KEY, today);
      localStorage.setItem(LS_KEY, "0");
      return 0;
    }
    return storedCount;
  } catch {
    return 0;
  }
}

function incrementDailyCount() {
  try {
    const today = new Date().toDateString();
    localStorage.setItem(LS_DATE_KEY, today);
    localStorage.setItem(LS_KEY, String(getDailyCount() + 1));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    // ignore storage errors
  }
}

export function downloadBlob(blob, filename) {
  // Daily limit check disabled
  // if (getDailyCount() >= DAILY_LIMIT) {
  //   alert("Daily download limit reached (" + DAILY_LIMIT + " files). Please try again tomorrow.");
  //   return;
  // }
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  incrementDailyCount();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export function getRemainingDownloads() {
  // Return Infinity since limit is disabled
  return Infinity;
}

export function isDownloadLimitReached() {
  // Always return false since limit is disabled
  return false;
}