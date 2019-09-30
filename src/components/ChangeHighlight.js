import React from 'react';
// import './ChangeHighlight.css';

export class ChangeHighlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myChildren: [],
      elementsChanged: []
    };
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
  }

  componentDidMount() {
    let firstTime = true;
    const { children } = this.props;
    const { myChildren } = this.state;
    if (children) {
      if (!myChildren && firstTime) {
        this.setState({ mychildren: children });
        firstTime = false;
      } else {
        React.Children.map(children, newChild => {
          React.Children.map(myChildren, oldChild => {
            if (newChild.type === oldChild.type) {
              if (newChild.props.children !== oldChild.props.children) {
                this.setState({ mychildren: children });
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
  }

  /*
  useEffect(() => {
    if (elementsChanged) {
      elementsChanged.forEach(element => {
        showHighlight(element);
      });
    }
  }, [elementsChanged]); */

  render() {
    return <div>{this.props.children}</div>;
  }
}
