import React, { useState, useEffect } from 'react';
import { highlightClassName } from './styles';

export default ({ children }) => {
  const [myChildren, setMyChildren] = useState();
  let changedElementsList = new Set();

  const showHighlight = (element, showAfter = 300, hideAfter = 1500) => {
    setTimeout(() => {
      if (!element.ref.current.className.includes(highlightClassName)) {
        element.ref.current.className += ' ' + highlightClassName;
        let classNames = element.ref.current.className;

        setTimeout(() => {
          element.ref.current.className = classNames
            .substr(0, classNames.indexOf(highlightClassName))
            .trim();
        }, hideAfter);
      }
    }, showAfter);
  };

  useEffect(() => {
    let firstTime = true;
    if (children) {
      if (!myChildren && firstTime) {
        setMyChildren(children);
        firstTime = false;
      } else {
        React.Children.map(children, newChild => {
          React.Children.map(myChildren, oldChild => {
            if (newChild.type === oldChild.type) {
              if (newChild.props.children !== oldChild.props.children) {
                setMyChildren(children);
                if (newChild.ref) {
                  changedElementsList.add(newChild);
                  Array.from(changedElementsList).forEach(element => {
                    showHighlight(element);
                  });
                }
              }
            }
          });
          return newChild.props.children;
        });
      }
    }
    return () => {};
  });

  return <div>{children}</div>;
};
