const debounce = (callback, time) => {
  let lastCall = 0;
  let lastCallTimer = 0;
  return (...args) => {
      const prevCall = lastCall;
      lastCall = Date.now();
      if (prevCall && ((lastCall - prevCall) < time)) {
          clearInterval(lastCallTimer);
      }
      lastCallTimer = setTimeout(() => callback(...args), time);
  };
};

export default debounce;