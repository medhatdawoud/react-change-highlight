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

  // @Discuss: Why this is not like this? ==> const setNewChild = (pushShadowItem, validChildren) =>{} and make it in module level.
  function setNewChild() {
    pushShadowItem((validChildren: any) => {
      if (validChildren) return [...validChildren, currentChild];
      return [currentChild];
    });
  }
};

export default createShadowDOM;
