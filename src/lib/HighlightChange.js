import React, { Component } from 'react';
import './HighlightChange.css';

class HighlightChange extends Component{
  constructor(props) {
    super(props)
    this.state = {
      myChildren: [],
      elementsChanged: []
    }
    this.changedElementsList = new Set();
  }

  
  //const [myChildren, setMyChildren] = useState();
  //const [elementsChanged, setElementsChanged] = useState([]);

  showHighlight(element, showAfter = 300, hideAfter = 1500) {
    setTimeout(() => {
      if (!element.ref.current.className.includes('highlight')) {
        element.ref.current.className += ' highlight';
        let classNames = element.ref.current.className;

        setTimeout(() => {
          element.ref.current.className = classNames.substr(
            0,
            classNames.indexOf('highlight')
          );
        }, hideAfter);
      }
    }, showAfter);
  };

  componentDidMount() {
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
                  setElementsChanged(Array.from(changedElementsList));
                }
              }
            }
          });
          return newChild.props.children;
        });
      }
    }
    return () => {};
  };

  /*
  useEffect(() => {
    if (elementsChanged) {
      elementsChanged.forEach(element => {
        showHighlight(element);
      });
    }
  }, [elementsChanged]); */

  render() {
    return <div>{children}</div>;
  } 
};

export default HighlightChange;
