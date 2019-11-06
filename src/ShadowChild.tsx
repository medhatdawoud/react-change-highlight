import React, { useEffect, useRef } from "react";
import setHighlight from "./setHighlight";

type Props = {
  child: any;
};

const ShadowChild: React.FC<Props> = props => {
  const initialMount = useRef(true);
  const { child } = props;
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    setHighlight(child.ref, initialMount.current, 2000);
  }, [props]);

  return <></>;
};

export default ShadowChild;
