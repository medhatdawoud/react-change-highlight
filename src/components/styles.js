export const highlightClassName = 'react-highlight';

var styles = `
  .${highlightClassName} {
    background-color: #f8ffb4;
    transition: all 0.5s ease-in-out;
  }

  .fadeBg {
    background-color: none;
    transition: all 0.5s ease-in-out;
  }
`;

var styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
