import { RefCallback, useState } from "react";
import { createPortal } from "react-dom";

export const useSubmitPortal = (): {
  ref: RefCallback<HTMLElement>;
  getPortal: (node: React.ReactNode) => React.ReactNode;
} => {
  const [element, setElement] = useState<HTMLElement>();

  return {
    ref: (el) => !element && el && setElement(el),
    getPortal: (node) => element && createPortal(node, element),
  };
};
