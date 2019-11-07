const setHighlight = (ref, isInitial, hideAfter) => {
  //TODO: Should remove && ref.current after replacing children with childrenWithRef.
  if (!isInitial && ref.current) {
    const element = ref.current.style;
    element.background = "#f8ffb4";
    // @Discuss: Why Not clearing last timeoutFn of this element? As this may make difference with large app state changes.
    setTimeout(() => {
      element.background = "#fff";
    }, hideAfter);
  }
};

export default setHighlight;
