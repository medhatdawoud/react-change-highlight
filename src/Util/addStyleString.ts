const addStyleString = (str: string) => {
  var node = document.createElement("style");
  node.innerHTML = str;
  document.body.appendChild(node);
};

export default addStyleString;
