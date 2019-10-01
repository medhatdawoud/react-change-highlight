export const highlightClassName = 'react-highlight';

var styles = `
  .${highlightClassName} {
    background: #f8ffb4;
    transition: all 0.5s ease-in-out;
  }

  .fadeBg {
    background: transperant;
  }
`

var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)