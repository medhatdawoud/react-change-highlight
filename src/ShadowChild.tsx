import React, { useEffect, useRef } from "react";
import setHighlight from "./setHighlight";

type Props = {
  child: any;
  showAfter: number;
  hideAfter: number;
  highlightStyle: string;
};

const ShadowChild: React.FC<Props> = ({ child, showAfter, hideAfter, highlightStyle }) => {
  const initialMount = useRef(true);
  const childrenToWatch = Array.isArray(child.props.children)
    ? child.props.children.find(c => c.toString().trim().length)
    : child.props.children;

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    setHighlight(child, initialMount.current, showAfter, hideAfter, highlightStyle);
  }, [childrenToWatch]);

  return <></>;
};

export default ShadowChild;
