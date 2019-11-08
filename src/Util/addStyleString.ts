const addStyleString = (str: string, isSSR = false) => {
  // do nothing in case of SSR
  if (!document || isSSR) {
    console.warn(
      `"react-change-highlight", As you're using server-side rendering, it's a must to create and 
      pass your css class to the highlightStyle attribute for "HighlightChange" component `
    );
    return;
  }
  var node = document.createElement("style");
  node.innerHTML = str;
  document.body.appendChild(node);
};

export default addStyleString;
