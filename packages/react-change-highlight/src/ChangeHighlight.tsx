import React, { useEffect, useRef, useState } from "react";
import createShadowDOM from "./Util/createShadowDOM";
import defaults from "./consts";
import ShadowChild from "./ShadowChild";
import addStyleString from "./Util/addStyleString";
import getUUID from "./Util/getUUID";

interface Props {
  children: any;
  containerClassName?: string;
  showAfter?: number;
  hideAfter?: number;
  highlightClassName?: string;
  mode?: "newOnly" | "change";
  disabled?: boolean;
  ssr?: boolean;
  color?: string;
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
  highlightClassName = defaults.HIGHLIGHT_CLASS,
  mode = "change",
  disabled = false,
  ssr = false,
  color = "#f8ffb4"
}) => {
  const [shadowDOM, setShadowDOM] = useState([]);
  const isInitialMount = useRef(true);
  const [uniqueId, setUniqueId] = useState("");

  useEffect(() => {
    if (!disabled) {
      if (isInitialMount.current) {
        setUniqueId(getUUID());
        if (!!highlightClassName) {
          addStyleString(
            `
          .${defaults.HIGHLIGHT_CLASS} {
            background: ${color} !important;
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
  }, [children, disabled, ssr, highlightClassName]);

  return (
    <div className={containerClassName}>
      {shadowDOM.map((child, index) => (
        <ShadowChild
          key={index}
          id={index}
          child={child}
          newlyAddedOnly={mode === "newOnly"}
          showAfter={showAfter}
          hideAfter={hideAfter}
          highlightClassName={highlightClassName}
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
