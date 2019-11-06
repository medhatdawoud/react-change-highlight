const setHighlight = (
  child: any,
  isInitial: boolean,
  showAfter: number,
  hideAfter: number,
  highlightStyle: string
) => {
  if (!isInitial && child.ref.current) {
    const element = child.ref.current.style;

    setTimeout(() => {
      element.background = highlightStyle;
    }, showAfter);

    setTimeout(() => {
      element.background = "#fff";
    }, showAfter + hideAfter);
  }
};

export default setHighlight;
