import { useEffect, useState } from "react";
import { getDownloadStats, onLimitChange } from "./downloadLimit";

/** React hook: subscribe to download-limit stats so components can disable
 *  buttons, show remaining counts, etc.
 *
 *  Usage:
 *    const { remaining, resetsAt, limit } = useDownloadLimit();
 *    if (remaining === 0) <button disabled>...</button>
 */
export function useDownloadLimit() {
  const [stats, setStats] = useState(() => getDownloadStats());

  useEffect(() => {
    const refresh = () => setStats(getDownloadStats());
    refresh();
    return onLimitChange(refresh);
  }, []);

  return stats;
}
