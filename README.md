# react-change-highlight
> React component to highlight changes in the wrapped component to enhance the UX and grap the focus of the user into the changed value of some parts like the cart in an e-commerce application for example.

## Install
```
yarn add react-change-highlight
```
or
```
npm install react-change-highlight
```

## Usage
Basically you need to wrap the components you want to highlight on change inside `HighlightChange` element then add `ref` attribute to each child in this component to be used to be highlighted.

In the following example the `count` variable comes from state, so when ever that function `setCount()` is called with any different value the background of that wrapped div will be changed
```jsx
import ChangeHighlight from 'react-change-highlight';

export default () => {
  const [count, setCount] = useState(0);

  <ChangeHighlight>
    <div ref={React.createRef()}>{count}</div>
  </ChangeHighlight>
}
```

Default styling for highlighting in case the user didn't use a custom styling using the `highlightStyle` property:
```css
.react-highlight {
    background-color: #f8ffb4;
    transition: all 0.5s ease-in-out;
  }
```

## Props
|Property|Description|Type|Default|
|--|--|--|--|
|`showAfter`|number of milli seconds before start highlighting|number|500|
|`hideAfter`|number of milli seconds before ending highlighting|number|2500|
|`containerClassName`|className for component container|string||
|`highlightStyle`|className for highlighing content|string||
|`disabled`|weather you need to disable highlighting|boolean|false|
---

## Author
- _Medhat Dawoud_
- Website: [medhatdawoud.net](http://medhatdawoud.net)
- Twitter: [@med7atdawoud](http://twitter.com/med7atdawoud)