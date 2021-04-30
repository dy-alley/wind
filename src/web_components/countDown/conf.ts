/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-04-22 16:55:56
 * @LastEditors: alley
 * @LastEditTime: 2021-04-25 16:19:24
 */
export interface IProps {
    /**
     * @description 开始时间,如没有填写则取当前时间戳(13位) 例:2020:11:11 11:11:11 或时间戳
     * @default 'new Date().getTime()';
     */
    startTime?:number | string;
    /**
     * @description 结束时间,必须填写 例:2020:11:11 11:11:11 或时间戳
     */
    endTime?:number | string;
    /**
     * @description 样式类名
     * @default '';
     */
    className?:string;
    /**
     * @description 展示格式 例: 'YYYY.MM.DD HH:mm:ss' | 'YYYY/MM/DD HH:mm:ss' | 'MM.DD HH:mm:ss' | 'DD HH:mm:ss'等 
     * @default 'YYYY.MM.DD HH:mm:ss'
     */
    format?:string;
    /**
     * @default false;
     */
     formatStyle?:boolean;
}
