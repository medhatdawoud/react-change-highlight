import React, { useEffect, useRef } from "react";
import setHighlight from "./setHighlight";

type Props = {
  child: any;
  hideAfter?: number;
};

const ShadowChild: React.FC<Props> = props => {
  const initialMount = useRef(true);
  const { child, hideAfter = 2000 } = props;
  const childrenToWatch = Array.isArray(child.props.children)
    ? child.props.children.find(c => c.toString().trim().length)
    : child.props.children;

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    setHighlight(child.ref, initialMount.current, hideAfter);
  }, [childrenToWatch]);

  return <></>;
};

export default ShadowChild;
