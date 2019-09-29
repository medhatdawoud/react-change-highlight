import React, { useEffect, useState } from 'react';
import './HighlightChange.scss';

interface Props {
  children: React.ReactElement<any>[];
  refs: React.Ref<any>[];
}

const HighlightChange: React.FC<Props> = ({ children, refs }) => {
  const [myChildren, setMyChildren] = useState();

  useEffect(() => {
    let firstTime = true;
    if (children) {
      if (!myChildren && firstTime) {
        setMyChildren(children);
        firstTime = false;
      } else {
        React.Children.map(children, (newChild: React.ReactElement<any>) => {
          React.Children.map(
            myChildren,
            (oldChild: React.ReactElement<any>) => {
              if (newChild.type === oldChild.type) {
                if (newChild.props.children !== oldChild.props.children) {
                  setMyChildren(children);
                  refs.forEach((ref: any) => {
                    setTimeout(() => {
                      if (!ref.current.className.includes('highlight')) {
                        ref.current.className += ' highlight';
                        let classNames = ref.current.className;

                        setTimeout(() => {
                          ref.current.className = classNames.substr(0, classNames.indexOf('highlight'))
                        }, 1500);
                      }

                      console.log(ref);
                    }, 500);
                  });
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

  return <div>{children}</div>;
};

export default HighlightChange;
