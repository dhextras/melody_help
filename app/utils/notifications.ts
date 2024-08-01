import { toast } from "react-toastify";

import type { ToastLevels } from "~/types/notification.types";

import "react-toastify/dist/ReactToastify.css";

/**
 * Displays a toast notification with the provided message and level.
 *
 * @param message - The message to display in the toast.
 * @param level - The level of the toast (e.g., "info", "success", "warning", "error").
 */
export const showToast = (message: string, level?: ToastLevels) => {
  toast(message, { type: level, autoClose: 2000 });
};
