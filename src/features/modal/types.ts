import { BusinessNewProps } from "./components/business-new";
import { ConfirmationProps } from "./components/confirmation";
import { PostNewProps } from "./components/post-new";

export type ModalId = "PostNew" | "BusinessNew" | "Confirmation";

export type ModalWindowProps<Id extends ModalId> = Id extends "PostNew"
  ? PostNewProps
  : Id extends "BusinessNew"
  ? BusinessNewProps
  : Id extends "Confirmation"
  ? ConfirmationProps
  : undefined;
