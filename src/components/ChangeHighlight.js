import React, { useState, useEffect, useRef } from 'react';
import { highlightClassName } from './styles';
import './styles';

export default ({
  children,
  showAfter = 500,
  hideAfter = 2500,
  containerClassName = '',
  highlightStyle = highlightClassName,
  disabled = false
}) => {
  const [oldChildren, setOldChildren] = useState();
  const [listOfHighlightedElements, setListOfHighlightedElements] = useState([]);
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
      }, showAfter);
    } else {
      element.ref.current.className =
        classNames.indexOf(highlightStyle) &&
        classNames.substr(0, classNames.indexOf(highlightStyle)).trim();
      showHighlight(element, showAfter, hideAfter);
    }
  };

  const hideHighlight = (element, hideAfter, oneElement) => {    
    setTimeout(() => {
      let classNames = element.ref.current.className;
      if (classNames.indexOf(highlightStyle) > -1) {
        element.ref.current.className = classNames
          .substr(0, classNames.indexOf(highlightStyle))
          .trim();
      }
      oneElement.highlighted = true;
    }, hideAfter);
  };

  const checkChangedChildren = (children, oldChildren) => {
    React.Children.forEach(oldChildren, (oldChild, index1) => {
      React.Children.forEach(children, (newChild, index2) => {
        if (index1 === index2) {
          if (
            oldChild.ref &&
            newChild.props.children !== oldChild.props.children
          ) {
            if (newChild.props.children) {
              setListOfHighlightedElements([
                ...listOfHighlightedElements,
                { element: newChild, hideAfter }
              ]);

              showHighlight(newChild, showAfter, hideAfter);
            }
            setOldChildren(children);
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

  const pickNotHighlightedElement = (allChanged, idx = 0) => {
    let oneElement;
    if (idx < allChanged.length) {
      oneElement = listOfHighlightedElements[idx];
      if (oneElement.highlighted) {
        pickNotHighlightedElement(allChanged, idx++);
      }
    }

    return oneElement;
  };

  useEffect(() => {
    let length = listOfHighlightedElements.length;
    if (length) {
      let oneElement = pickNotHighlightedElement(listOfHighlightedElements);
      if (oneElement) {
        const { element, hideAfter } = oneElement;
        hideHighlight(element, hideAfter, oneElement);
      }
    }
  }, [listOfHighlightedElements]);

  return <div className={containerClassName}>{children}</div>;
};
