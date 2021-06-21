/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-05-11 15:18:08
 * @LastEditors: alley
 * @LastEditTime: 2021-05-17 18:44:58
 */
export interface IProps {
    /**
     * @description 标题
     */
    title?: string;
    /**
     * @description 数据源
     */
    data: Array<any>;
    /**
     * @description 联动数据
     */
    linkageData:Array<any>;
    /**
     * @description 格式是[value1, value2, value3], 对应数据源的相应级层 value
     */
    value: Array<string>;
    /**
    * @description 显示、隐藏
    */
    visible?: boolean,
    /**
     * @description 选中区域文字样式
     */
    textStype?:{
        fontSize?:number;
        color?:string;
        activeColor?:string;
    };
    /**
     * @description 选中的文案
     * @default 确定
     */
    okText?: string;
    /**
     * @description 取消选中的文案
     * @default 取消
     */
    dismissText?: string;
    /**
     * @description 点击选中时执行的回调
     */
    onOk?: (data:any) => void;
    /**
     * @description 点击取消时执行的回调
     */
    onDismiss?: (data:any) => void;
    /**
     * 
     */
     onTouchEnd?:(data:any)=>void;



}

export interface ITouch {
    status: boolean;
    lastTime: number;
    index: number;
    el: Element | null;
    diffY: number;
    startY: number;
    oldVal: number | string;
    interval:number;
    direction: 'up' | 'down';
}