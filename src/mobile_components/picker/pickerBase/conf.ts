/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-05-18 18:10:29
 * @LastEditors: alley
 * @LastEditTime: 2021-05-18 18:14:53
 */
export interface IProps {
    data: Array<any>;



    okText: string;
    dismissText: string;
    onOk: (data: any) => void;
    onDismiss: () => void;
}