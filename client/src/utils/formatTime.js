  export const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / (60 * 60 * 1000))
    const mins = Math.floor(seconds / (60 * 1000));
    const secs = (seconds % (60 * 1000) / 1000);
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };