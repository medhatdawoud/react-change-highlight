import React, { useEffect, useRef, useState } from "react";
import createShadowDOM from "./createShadowDOM";
import defaults from "./consts";
import ShadowChild from "./ShadowChild";

type Props = {
  children: React.ReactChildren;
  containerClassName?: string;
  showAfter?: number;
  hideAfter?: number;
  highlightStyle?: string;
  disabled?: boolean;
};

const listOfClearHighlightFunctions = [];

const updateClearHandler = (childId, Fn) => {
  listOfClearHighlightFunctions[childId] = Fn;
};

const ChangeHighlight: React.FC<Props> = ({
  children,
  containerClassName,
  showAfter = defaults.TIME_TO_HIGHLIGHT,
  hideAfter = defaults.TIME_TO_STOP_HIGHLIGHT,
  highlightStyle = defaults.HIGHLIGHT_COLOR,
  disabled = false
}) => {
  const [shadowDOM, setShadowDOM] = useState([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    if (!disabled) {
      setShadowDOM([]);
      createShadowDOM({ props: { children } }, setShadowDOM);
    }
  }, [children]);

  return (
    <div className={containerClassName}>
      {shadowDOM.map((child, index) => (
        <ShadowChild
          key={index}
          id={index}
          child={child}
          showAfter={showAfter}
          hideAfter={hideAfter}
          highlightStyle={highlightStyle}
          clearHandler={listOfClearHighlightFunctions[index]}
          updateClearHandler={updateClearHandler}
        />
      ))}
      {children}
    </div>
  );
};

export default ChangeHighlight;
