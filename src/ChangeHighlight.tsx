import React, { useEffect, useRef, useState } from "react";
import createShadowDOM from "./createShadowDOM";
import ShadowChild from "./ShadowChild";

type Props = {
  children: React.ReactChildren;
};

const ChangeHighlight: React.FC<Props> = ({ children }) => {
  const [shadowDOM, setShadowDOM] = useState([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }

    setShadowDOM([]);
    createShadowDOM({ props: { children } }, setShadowDOM);
  }, [children]);

  return (
    <>
      {shadowDOM.map((child, index) => (
        <ShadowChild key={index} child={child} />
      ))}
      {children}
    </>
  );
};

export default ChangeHighlight;
