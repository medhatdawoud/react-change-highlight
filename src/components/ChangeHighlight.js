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
  const [oldChildren, setOldChildren] = useState();
  const [listOfHighlightedElements, setListOfHighlightedElements] = useState(
    []
  );
  const isInitialMount = useRef(true);

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
        setListOfHighlightedElements([
          ...listOfHighlightedElements,
          { element, hideAfter }
        ]);
      }, showAfter);
    } else {
      element.ref.current.className =
        classNames.indexOf(highlightStyle) &&
        classNames.substr(0, classNames.indexOf(highlightStyle)).trim();
      showHighlight(element, showAfter, hideAfter);
    }
  };

  const checkChangedChildren = (children, oldChildren) => {
    React.Children.map(oldChildren, (oldChild, index1) => {
      React.Children.map(children, (newChild, index2) => {
        if (index1 === index2) {
          if (
            newChild.ref &&
            newChild.props.children !== oldChild.props.children
          ) {
            setOldChildren(children);
            if (newChild.props.children) {
              showHighlight(newChild, showAfter, hideAfter);
            }
          }
        }
      });
    });
  };

  useEffect(() => {
    if (disabled) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      setOldChildren(children);
    } else {
      checkChangedChildren(children, oldChildren);
    }
  });

  useEffect(() => {
    let length = listOfHighlightedElements.length;
    if (length) {
      listOfHighlightedElements.forEach(oneElement => {
        const { element, hideAfter, highlighted } = oneElement;
        if (highlighted) {
          return;
        }

        setTimeout(() => {
          let classNames = element.ref.current.className;
          if (classNames.indexOf(highlightStyle) > -1) {
            element.ref.current.className = classNames
              .substr(0, classNames.indexOf(highlightStyle))
              .trim();
          }
          oneElement.highlighted = true;
        }, hideAfter);
      });
    }
  }, [listOfHighlightedElements]);

  return <div className={containerClassName}>{children}</div>;
};
