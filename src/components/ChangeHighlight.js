import React, { useState, useEffect, useRef } from 'react';
import { highlightClassName } from './styles';
import './styles';
import { maxHeaderSize } from 'http';

export default ({
  children,
  showAfter = 500,
  hideAfter = 2500,
  containerClassName = '',
  highlightStyle = highlightClassName,
  disabled = false
}) => {
  const [newChildren, setNewChildren] = useState();
  const isInitialMount = useRef(true);
  let listOfHighlightedElements = [];

  const showHighlight = (
    element,
    showAfter = showAfter,
    hideAfter = hideAfter
  ) => {
    let classNames = element.ref.current.className;
    const isHighlighted = element.ref.current.className.includes(
      highlightStyle
    );

    if (!isHighlighted) {
      setTimeout(() => {
        element.ref.current.className += ' ' + highlightStyle;

        listOfHighlightedElements.push({ element, hideAfter });
        hideHighlight();
      }, showAfter);
    } else {
      element.ref.current.className =
        classNames.indexOf(highlightStyle) &&
        classNames.substr(0, classNames.indexOf(highlightStyle)).trim();
      showHighlight(element, showAfter, hideAfter);
    }
  };

  const hideHighlight = () => {
    let length = listOfHighlightedElements.length;
    if (length) {
      const { element, hideAfter } = listOfHighlightedElements[length - 1];
      setTimeout(() => {
        let classNames = element.ref.current.className;
        if (classNames.indexOf(highlightStyle) > -1) {
          element.ref.current.className = classNames
            .substr(0, classNames.indexOf(highlightStyle))
            .trim();
        }
        listOfHighlightedElements.pop();
        hideHighlight();
      }, hideAfter);
    }
  };

  const checkChangedChildren = () => {
    React.Children.map(children, (newChild, index1) => {
      React.Children.map(newChildren, (oldChild, index2) => {
        if (index1 === index2) {
          if (newChild.props.children !== oldChild.props.children) {
            setNewChildren(children);
            if (newChild.ref && newChild.props.children) {
              let highlightTimer = setTimeout(() => {
                showHighlight(newChild, showAfter, hideAfter);
              }, 300);
            }
          }
        }
      });
      return newChild.props.children;
    });
  };

  useEffect(() => {
    if (disabled) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      setNewChildren(children);
    } else {
      checkChangedChildren(children, newChildren);
    }
  });

  return <div className={containerClassName}>{children}</div>;
};
