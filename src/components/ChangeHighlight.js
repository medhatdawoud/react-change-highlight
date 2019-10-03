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
  const [newChildren, setNewChildren] = useState();
  const isInitialMount = useRef(true);

  const showHighlight = (element, showAfter = showAfter, hideAfter = hideAfter) => {
    setTimeout(() => {
      if (!element.ref.current.className.includes(highlightStyle)) {
        element.ref.current.className += ' ' + highlightStyle;
        let classNames = element.ref.current.className;

        setTimeout(() => {
          element.ref.current.className = classNames
            .substr(0, classNames.indexOf(highlightStyle))
            .trim();
        }, hideAfter);
      }
    }, showAfter);
  };

  const detectChangedChildren = () => {
    React.Children.map(children, (newChild, index1) => {
      React.Children.map(newChildren, (oldChild, index2) => {
        if (index1 === index2) {
          if (newChild.props.children !== oldChild.props.children) {
            setNewChildren(children);
            if (newChild.ref && newChild.props.children) {
              showHighlight(newChild, showAfter, hideAfter);
            }
          }
        }
      });
      return newChild.props.children;
    });
  }

  useEffect(() => {
    if (disabled) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      setNewChildren(children);
    } else {
      detectChangedChildren(children, newChildren);
    }
  });

  return <div className={containerClassName}>{children}</div>;
};
