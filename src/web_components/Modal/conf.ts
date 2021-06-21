/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-06-10 11:20:40
 * @LastEditors: alley
 * @LastEditTime: 2021-06-11 12:01:44
 */
type context = string | JSX.Element | React.ReactDOM | React.FC;
export interface IProps {
    title?: string;
    context?: context;
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel?: () => void;
    mask?: boolean;
    customLayout?: boolean;
    width?:number;
    footer?:boolean;
}
