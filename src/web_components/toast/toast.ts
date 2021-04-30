/*
 * @Author: alley
 * @Description:
 * @Date: 2021-04-26 14:31:48
 * @LastEditors: alley
 * @LastEditTime: 2021-04-26 16:21:44
 */
import notificationDOM from "./notification";
import "./toast.css";


interface notificationProps {
  addNotice: Function;
  destroy: () => void;
}
let notification: notificationProps;
const notice = (type: string, content: string, duration: number = 1000, onClose: Function) => {
  if (!notification) notification = notificationDOM;
  return notification.addNotice({ type, content, duration, onClose });
};

export default {
  info(content: string, duration?: number, onClose: Function = () => {}) {
    return notice("info", content, duration, onClose);
  },
  success(content: string, duration?: number, onClose: Function = () => {}) {
    return notice("success", content, duration, onClose);
  },
  warn(content: string, duration?: number, onClose: Function = () => {}) {
    return notice("warning", content, duration, onClose);
  },
  error(content: string, duration?: number, onClose: Function = () => {}) {
    return notice("error", content, duration, onClose);
  },
  loading(content: string, duration?: number, onClose: Function = () => {}) {
    return notice("loading", content, duration, onClose);
  },
};
