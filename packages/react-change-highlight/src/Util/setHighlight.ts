import defaults from "../consts";

const setHighlight = (
  child: any,
  id: number,
  newlyAddedOnly: boolean,
  isInitial: boolean,
  showAfter: number,
  hideAfter: number,
  highlightStyle: string,
  clearHighlightRef: number,
  setClearHighlightFn: Function,
  updateClearHandler: Function,
  uniqueId: string
) => {
  if (!child.ref) return;

  const element = child.ref.current;

  if (
    (newlyAddedOnly ? isInitial : !isInitial) &&
    element?.getAttribute(defaults.HIGHLIGHT_UNIQUE_ID) === uniqueId
  ) {
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
