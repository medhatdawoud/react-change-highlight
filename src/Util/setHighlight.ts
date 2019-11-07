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
    const element = child.ref.current;

    if (clearHighlightRef) {
      clearTimeout(clearHighlightRef);
    }

    setTimeout(() => {
      element.className += ` ${highlightStyle}`;
    }, showAfter);

    const clearHighlight = setTimeout(() => {
      element.className = element.className.substr(
        0,
        element.className.indexOf(highlightStyle) - 1
      );
    }, showAfter + hideAfter);

    setClearHighlightFn(clearHighlight);
    updateClearHandler(id, clearHighlight);
  }
};

export default setHighlight;
