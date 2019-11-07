import React, { useEffect, useRef, useState } from "react";
import setHighlight from "./Util/setHighlight";

type Props = {
  child: any;
  id: number;
  showAfter: number;
  hideAfter: number;
  highlightStyle: string;
  clearHandler: number;
  updateClearHandler: Function;
};

const ShadowChild: React.FC<Props> = ({
  child,
  id,
  showAfter,
  hideAfter,
  highlightStyle,
  clearHandler,
  updateClearHandler
}) => {
  const initialMount = useRef(true);
  const [clearHighlightRef, setClearHighlightRef] = useState(clearHandler);
  const changedChildren = Array.isArray(child.props.children)
    ? child.props.children.find(c => c.toString().trim().length)
    : child.props.children;

  useEffect(() => {
    if (initialMount.current) {
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
      updateClearHandler
    );
  }, [changedChildren]);

  return <></>;
};

export default ShadowChild;
