const setHighlight = (ref, isInitial, hideAfter) => {
  if (!isInitial && ref.current) {
    const element = ref.current.style;
    element.background = "#f8ffb4";
    setTimeout(() => {
      element.background = "#fff";
    }, hideAfter);
  }
};

export default setHighlight;
