/* eslint-disable no-console */
const addStyleString = (str: string, isSSR = false) => {
  if (!document || isSSR) {
    console.warn(
      `"react-change-highlight", As you're using server-side rendering, it's a must to create and pass your css class to the highlightStyle attribute for "ChangeHighlight" component.`
    );
    return;
  }
  const node = document.createElement("style");
  node.innerHTML = str;
  document.body.appendChild(node);
};

export default addStyleString;
