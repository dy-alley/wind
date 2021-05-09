/*
 * @Author: alley
 * @Description: 9宫格抽奖动画
 * @Date: 2021-04-19 10:48:25
 * @LastEditors: alley
 * @LastEditTime: 2021-05-08 18:06:22
 */

interface IProps {
    /**
     * @description 抽奖外层DOM元素
     */
    el: HTMLElement | string;
    /**
     * @description 初始所在的位置
     */
    index: number;
     /**
     * @description 结束所在的位置
     */
    end: number;
     /**
     * @description 转动的圈次
     */
    total: number;
     /**
     * @description 转动的速度
     */
    speed?: number;
     /**
     * @description 转动元素的类名
     */
    children?: string;
     /**
     * @description 动画转动到某个元素后需要做的事情 
     */
    addNodeClassName: (el: Element, index: number) => void;
     /**
     * @description 动画结束后需要做的事情
     */
    callback: () => void;
     /**
     * @description 动画离开某个元素后需要做的事情 
     */
    removeNodeListClassName: (el: Element, index: number) => void;
}


export class LotteryAnimation {
    private count: number; //已转动次数
    private started: boolean; //是否开始
    private el: HTMLElement | null; // 抽奖外层DOM元素
    private index: number; // 初始所在的位置
    private end: number; // 结束所在的位置
    private total: number; // 转动的圈次
    private speed: number; // 转动的速度
    private callback: (lotter?: LotteryAnimation) => void; // 转动结束后的回调
    private addNodeClassName: (el: Element, index: number) => void; // 转动到某个节点需要做的事情
    private removeNodeListClassName: (el: Element, index: number) => void; // 其他节点需要做的事情
    private timer: NodeJS.Timeout | number; // 定时器标示
    private nodes: NodeListOf<Element> | Element[]; // 子元素集合
    constructor(options: IProps) {
        this.count = 0; //已转动次数
        this.timer = 0; //定时器
        this.started = false; //是否开始
        this.el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
        this.index = options.index || 0; //当前索引
        this.end = options.end || 1; //结束索引
        this.total = options.total || 4; //转动总数
        this.speed = options.speed || 100;//转动时间
        this.nodes = typeof options.children === 'string' ? (this.el as HTMLElement).querySelectorAll(options.children) : Array.from((this.el as HTMLElement).children);
        this.callback = options.callback || function () { };//回调函数
        this.addNodeClassName = options.addNodeClassName || function () { }; // 自定义样式
        this.removeNodeListClassName = options.removeNodeListClassName || function () { }; // 自定义样式;
        this.init();
    }
    init() {
        if (this.started) return;
        this.started = true;
        this.roll();
        return this;
    }
    roll() {
        // 删除所有节点类名
        this.nodes.forEach(this.removeNodeListClassName);
        this.index++;
        // 每圈转动结束后重新开始 转动次数加1
        if (this.index > this.nodes.length - 1) {
            this.count++;
            this.index = 0;
        }
        // 给当前索引节点添加类名
        this.addNodeClassName(this.nodes[this.index], this.index)

        // 如果转动次数等于转动总数并且当前索引等于结束索引 停止循环执行回调
        if (this.count >= this.total && this.index === this.end) {
            setTimeout(this.rollEndCallback.bind(this), 500);
            clearTimeout(this.timer as NodeJS.Timeout);
        } else {
            // 自定义转动到某一圈的转动时间
            if (this.count >= this.total - 3) {
                this.speed += 10;
            } else if (this.count >= this.total - 1) {
                this.speed += 30;
            }
            // 递归执行当前
            this.timer = setTimeout(this.roll.bind(this), this.speed);
        }
        return this;
    };
    
    rollEndCallback() {
        this.callback.call(this, this);
        this.started = false;
    }

}

export default LotteryAnimation;

