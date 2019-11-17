import React, { useEffect, useRef, useState } from "react";
import setHighlight from "./Util/setHighlight";
import defaults from "./consts";

type Props = {
  child: any;
  id: number;
  showAfter: number;
  hideAfter: number;
  highlightStyle: string;
  clearHandler: number;
  updateClearHandler: Function;
  uniqueId: string;
};

const ShadowChild: React.FC<Props> = ({
  child,
  id,
  showAfter,
  hideAfter,
  highlightStyle,
  clearHandler,
  updateClearHandler,
  uniqueId
}) => {
  const initialMount = useRef(true);
  const [clearHighlightRef, setClearHighlightRef] = useState(clearHandler);
  const changedChildren = Array.isArray(child.props.children)
    ? child.props.children.find(c => c.toString().trim().length)
    : child.props.children;

  if (child.ref) {
    const elementDOM = child.ref.current;
    elementDOM.setAttribute(defaults.HIGHLIGHT_UNIQUE_ID, uniqueId);
  }

  useEffect(() => {
    if (initialMount?.current) {
      initialMount.current = false;
      return;
    }

    setHighlight(
      child,
      id,
      initialMount.current,
      showAfter,
      hideAfter,
      highlightStyle,
      clearHighlightRef,
      setClearHighlightRef,
      updateClearHandler,
      uniqueId
    );
  }, [changedChildren]);

  return <></>;
};

export default ShadowChild;
