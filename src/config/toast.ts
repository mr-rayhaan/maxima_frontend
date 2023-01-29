import { POSITION, useToast } from "vue-toastification";

export const showToast = function (status, message, position= POSITION.TOP_CENTER) {
    const toast = useToast();
    if (status === "success") {
      toast.success(message, {
        position: position,
        timeout: 4000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    } else {
      toast.error(message, {
        position: position,
        timeout: 4000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    }
  }