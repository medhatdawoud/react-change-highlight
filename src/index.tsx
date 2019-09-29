import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HighlightChange from './lib/HighlightChange';
import './index.scss';

export class Example extends Component<{}, {}> {
  state = {
    name: '1245',
    text: ''
  };

  ref = React.createRef<HTMLHeadingElement>();
  ref1 = React.createRef<HTMLHeadingElement>();
  ref2 = React.createRef<HTMLHeadingElement>();
  ref3 = React.createRef<HTMLHeadingElement>();

  nameChanged = (e: { target: { value: any } }) => {
    const value = e.target.value;
    this.setState({ name: value });
    setTimeout(() => this.setState({ text: this.state.name }), 0);
  };

  render() {
    return (
      <>
        <input
          type="text"
          placeholder="write anything"
          onChange={this.nameChanged}
          value={this.state.name}
        />
        <HighlightChange>
          <h1 className="bottom-right" ref={this.ref}>
            {this.state.text}
          </h1>
          <h1 className="bottom-left" ref={this.ref1}>
            {this.state.text}
          </h1>
          <h1 className="top-right" ref={this.ref2}>
            {this.state.text}
          </h1>
          <h1 className="top-left" ref={this.ref3}>
            {this.state.text}
          </h1>
        </HighlightChange>
      </>
    );
  }
}

const App = () => <Example />;

ReactDOM.render(<App />, document.getElementById('root'));
