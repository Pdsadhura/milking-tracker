export const formatDuration = (sec) => {
    if (sec == null) return "-";
    const s = Number(sec);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
  
    if (h) return `${h}h ${m}m ${r}s`;
    if (m) return `${m}m ${r}s`;
    return `${r}s`;
  };