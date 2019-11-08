# react-change-highlight

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

> React Change Highlight is a react component to highlight changes in the wrapped component to enhance the UX and grap the focus of the user into the changed value of some parts like the cart in an e-commerce application for example.

This is a real use case we are using in our company
![UseCase](https://i.imgur.com/vHxyHrN.gif)

You can play around with it on this sandbox [codesandbox.io/react-change-highlight](https://codesandbox.io/s/react-change-highlight-example-fcwh9)

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
import ChangeHighlight from "react-change-highlight";

export default () => {
  const [count, setCount] = useState(0);

  return (
    <ChangeHighlight>
      <div ref={React.createRef()}>{count}</div>
    </ChangeHighlight>
  );
};
```

Default styling for highlighting in case the user didn't use a custom styling using the `highlightStyle` property:

```css
.react-highlight {
  background-color: #f8ffb4;
  transition: all 0.5s ease-in-out;
}
```

## SSR (server-side rendering)

In case of using this module in a server-side rengering app, you should make sure to create and pass your own className to the `highlightStyle` attribute, and to make some hint for you, add `ssr` attribute to the `HighlightChange` element, so it can give you a hint to add a class in your console as a warning.

## Props

| Property             | Type    | Default | Description                                                                                           |
| -------------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `showAfter`          | number  | 500     | number of milli seconds before start highlighting                                                     |
| `hideAfter`          | number  | 2500    | number of milli seconds before ending highlighting                                                    |
| `containerClassName` | string  |         | className for component container                                                                     |
| `highlightStyle`     | string  |         | className for highlighing content (a must in case of SSR)                                             |
| `disabled`           | boolean | false   | weather you need to disable highlighting                                                              |
| `ssr`                | boolean | false   | you need to pass this in case of using it with server-side rendering. (gives a hint for adding style) |

---

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="http://medhatdawoud.net"><img src="https://avatars3.githubusercontent.com/u/337888?v=4" width="100px;" alt="Medhat Dawoud"/><br /><sub><b>Medhat Dawoud</b></sub></a><br /><a href="https://github.com/medhatdawoud/react-change-highlight/commits?author=medhatdawoud" title="Code">💻</a> <a href="#blog-medhatdawoud" title="Blogposts">📝</a> <a href="https://github.com/medhatdawoud/react-change-highlight/commits?author=medhatdawoud" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
