const setHighlight = (
  child: any,
  id: number,
  isInitial: boolean,
  showAfter: number,
  hideAfter: number,
  highlightStyle: string,
  clearHighlightRef: number,
  setClearHighlightFn: Function,
  updateClearHandler: Function,
  uniqueId: number
) => {

  const element = child.ref.current;

  if (!isInitial && element && element.getAttribute('react-change-hightlight-uniqueId') == uniqueId) {

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
