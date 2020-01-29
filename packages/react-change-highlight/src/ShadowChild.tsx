import React, { useEffect, useRef, useState } from "react";
import setHighlight from "./Util/setHighlight";
import defaults from "./consts";

type Props = {
  child: any;
  id: number;
  showAfter: number;
  hideAfter: number;
  highlightClassName: string;
  clearHandler: number;
  newlyAddedOnly: boolean;
  updateClearHandler: Function;
  uniqueId: string;
};

const ShadowChild: React.FC<Props> = ({
  child,
  id,
  showAfter,
  hideAfter,
  highlightClassName,
  clearHandler,
  newlyAddedOnly,
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
    if (!newlyAddedOnly && initialMount?.current) {
      initialMount.current = false;
      return;
    }

    setHighlight(
      child,
      id,
      newlyAddedOnly,
      initialMount.current,
      showAfter,
      hideAfter,
      highlightClassName,
      clearHighlightRef,
      setClearHighlightRef,
      updateClearHandler,
      uniqueId
    );

    initialMount.current = false;
  }, [changedChildren]);

  return <></>;
};

export default ShadowChild;
