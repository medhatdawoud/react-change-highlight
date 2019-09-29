import React, { useEffect, useState } from 'react';
import './HighlightChange.scss';

interface Props {
  children: React.ReactElement<any>[];
}

const HighlightChange: React.FC<Props> = ({ children }) => {
  const [myChildren, setMyChildren] = useState();
  const [elementsChanged, setElementsChanged] = useState([])
  let changedElementsList:any = new Set();


  const showHighlight = (element:any, showAfter = 300, hideAfter = 1500) => {
    setTimeout(() => {
      if (!element.ref.current.className.includes('highlight')) {
        element.ref.current.className += ' highlight';
        let classNames = element.ref.current.className;

        setTimeout(() => {
          element.ref.current.className = classNames.substr(0, classNames.indexOf('highlight'))
        }, hideAfter);
      }
    }, showAfter);
  }

  useEffect(() => {
    let firstTime = true;
    if (children) {
      if (!myChildren && firstTime) {
        setMyChildren(children);
        firstTime = false;
      } else {
        React.Children.map(children, (newChild:any) => {
          React.Children.map(
            myChildren,
            (oldChild: any) => {
              if (newChild.type === oldChild.type) {
                if (newChild.props.children !== oldChild.props.children) {
                  setMyChildren(children);
                  if(newChild.ref) {
                    changedElementsList.add(newChild);
                    setElementsChanged(Array.from(changedElementsList));
                  }
                }
              }
            }
          );
          return newChild.props.children;
        });
      }
    }
    return () => {};
  }, [children]);

  useEffect(() => {
    if(elementsChanged) {
      console.log(elementsChanged);
      elementsChanged.forEach((element:any) => {
        showHighlight(element);
      })
    }
    
  }, [elementsChanged])

  return <div>{children}</div>;
};

export default HighlightChange;
