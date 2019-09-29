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
        <HighlightChange refs={[this.ref]}>
          <h1 className="bottom-right" ref={this.ref}>
            {this.state.text}
          </h1>
          <h2>1245</h2>
        </HighlightChange>
      </>
    );
  }
}

const App = () => <Example />;

ReactDOM.render(<App />, document.getElementById('root'));
