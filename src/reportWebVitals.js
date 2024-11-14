const reportWebVitals = (onPerfEntry) => {
  if (typeof onPerfEntry === 'function') {
    import('web-vitals').then((vitals) => {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = vitals;
      [getCLS, getFID, getFCP, getLCP, getTTFB].forEach((metric) => metric(onPerfEntry));
    });
  }
};

export default reportWebVitals;
