import React, { useEffect, useRef, useState } from "react";
import createShadowDOM from "./createShadowDOM";
import defaults from "./consts";
import ShadowChild from "./ShadowChild";

type Props = {
  children: React.ReactChildren;
  showAfter?: number;
  hideAfter?: number;
  highlightStyle?: string;
  disabled?: boolean;
};

const ChangeHighlight: React.FC<Props> = ({
  children,
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
    <>
      {shadowDOM.map((child, index) => (
        <ShadowChild
          key={index}
          child={child}
          showAfter={showAfter}
          hideAfter={hideAfter}
          highlightStyle={highlightStyle}
        />
      ))}
      {children}
    </>
  );
};

export default ChangeHighlight;
