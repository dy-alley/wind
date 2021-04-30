/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-04-26 14:37:10
 * @LastEditors: alley
 * @LastEditTime: 2021-04-26 14:39:47
 */


export interface NoticeProps {
    type: 'info' | 'success' | 'warning' | 'error' | 'loading', 
    content: string, 
    duration: number, 
    onClose: Function,
    key:string;
}