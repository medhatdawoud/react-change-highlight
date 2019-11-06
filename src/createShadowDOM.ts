import React from "react";

const createShadowDOM = (currentChild, pushShadowItem) => {
  const children = currentChild.props.children;
  if (Array.isArray(children)) {
    React.Children.forEach(children, child => {
      if (typeof child === "object") createShadowDOM(child, pushShadowItem);
      else if (child.toString().trim().length) {
        setNewChild();
      }
    });
  } else if (typeof children === "object") {
    createShadowDOM(children, pushShadowItem);
  } else if (children.toString().trim().length) {
    setNewChild();
  }

  function setNewChild() {
    pushShadowItem(child => {
      if (child) return [...child, currentChild];
      return [currentChild];
    });
  }
};

export default createShadowDOM;
