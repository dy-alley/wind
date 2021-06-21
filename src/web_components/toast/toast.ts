/*
 * @Author: alley
 * @Description:
 * @Date: 2021-04-26 14:31:48
 * @LastEditors: alley
 * @LastEditTime: 2021-06-02 13:39:17
 */
import { createMessage } from "./notification";
import "./toast.css";



let message: any;
const notice = (type: string, content: string, duration: number = 1000, onClose: Function) => {
  if (!message) message = createMessage();
  return message({ type, content, duration, onClose });
};

export default {
  info(content: string, duration?: number, onClose: Function = () => { }) {
    return notice("info", content, duration, onClose);
  },
  success(content: string, duration?: number, onClose: Function = () => { }) {
    return notice("success", content, duration, onClose);
  },
  warn(content: string, duration?: number, onClose: Function = () => { }) {
    return notice("warning", content, duration, onClose);
  },
  error(content: string, duration?: number, onClose: Function = () => { }) {
    return notice("error", content, duration, onClose);
  },
  loading(content: string, duration?: number, onClose: Function = () => { }) {
    return notice("loading", content, duration, onClose);
  },
};
