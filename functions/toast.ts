import { toast } from "react-toastify";

const toastObj: { id: Id } = { id: 0 };

function success(message: string) {
  if (!toast.isActive(toastObj.id)) {
    const id = toast.success(message);
    toastObj.id = id;
  }
}

function error(message: string) {
  if (!toast.isActive(toastObj.id)) {
    const id = toast.error(message);
    toastObj.id = id;
  }
}

function dismiss(id: Id = toastObj.id) {
  toast.dismiss(id);
}

export const toastFunc = { success, error, dismiss, toastObj };
