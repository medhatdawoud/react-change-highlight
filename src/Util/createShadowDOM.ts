import React from "react";

const createShadowDOM = (currentChild, setShadowItemFn) => {
  const children = currentChild.props.children;

  if (Array.isArray(children)) {
    React.Children.forEach(children, child => {
      if (typeof child === "object") createShadowDOM(child, setShadowItemFn);
      else if (child.toString().trim().length) {
        setNewChild();
      }
    });
  } else if (typeof children === "object") {
    createShadowDOM(children, setShadowItemFn);
  } else if (children?.toString().trim().length) {
    setNewChild();
  }

  function setNewChild() {
    setShadowItemFn(child => {
      if (child) return [...child, currentChild];
      return [currentChild];
    });
  }
};

export default createShadowDOM;
