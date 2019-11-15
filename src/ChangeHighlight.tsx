import React, { useEffect, useRef, useState } from "react";
import createShadowDOM from "./Util/createShadowDOM";
import defaults from "./consts";
import ShadowChild from "./ShadowChild";
import addStyleString from "./Util/addStyleString";
import getUUID from "./Util/getUUID";


interface Props {
  children: React.ReactChildren;
  containerClassName?: string;
  showAfter?: number;
  hideAfter?: number;
  highlightStyle?: string;
  disabled?: boolean;
  ssr?: boolean;
}

const listOfClearHighlightFunctions = [];

const updateClearHandler = (childId, Fn) => {
  listOfClearHighlightFunctions[childId] = Fn;
};

const ChangeHighlight: React.FC<Props> = ({
  children,
  containerClassName,
  showAfter = defaults.TIME_TO_HIGHLIGHT,
  hideAfter = defaults.TIME_TO_STOP_HIGHLIGHT,
  highlightStyle = defaults.HIGHLIGHT_CLASS,
  disabled = false,
  ssr = false
}) => {
  const [shadowDOM, setShadowDOM] = useState([]);
  const isInitialMount = useRef(true);
  const [uniqueId, setUniqueId] = useState("");

  useEffect(() => {
    if (!disabled) {
      if (isInitialMount.current) {
        setUniqueId(getUUID());
        if (!!highlightStyle) {
          addStyleString(
            `
          .${defaults.HIGHLIGHT_CLASS} {
            background: #f8ffb4 !important;
            transition: 0.25s ease-in-out;
          }
        `,
            ssr
          );
        }
        isInitialMount.current = false;
      }

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
          uniqueId={uniqueId}
        />
      ))}
      {children}
    </div>
  );
};

export default ChangeHighlight;
