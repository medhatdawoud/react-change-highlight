const setHighlight = (
  child: any,
  id: number,
  isInitial: boolean,
  showAfter: number,
  hideAfter: number,
  highlightStyle: string,
  clearHighlightRef: number,
  setClearHighlightFn: Function,
  updateClearHandler: Function
) => {
  if (!isInitial && child.ref.current) {
    const element = child.ref.current.style;

    if (clearHighlightRef) {
      clearTimeout(clearHighlightRef);
    }

    setTimeout(() => {
      element.background = highlightStyle;
    }, showAfter);

    const clearHighlight = setTimeout(() => {
      element.background = "#fff";
    }, showAfter + hideAfter);

    setClearHighlightFn(clearHighlight);
    updateClearHandler(id, clearHighlight);
  }
};

export default setHighlight;
