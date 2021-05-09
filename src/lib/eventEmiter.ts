/**
 * 事件派发
 */
export class EventEmiter {
    private listeners: {
        [key: string]: any[]
    };
    constructor() {
        this.listeners = {};
    }
    /**
     * 事件绑定
     * @param eventName 事件名称
     * @param callback  需要绑定的事件函数
     */
    public on(eventName: string, callback: any): void {
        if (this.listeners[eventName] instanceof Array) {
            if (this.listeners[eventName].indexOf(callback) === -1) {
                this.listeners[eventName].push(callback);
            }
        } else {
            this.listeners[eventName] = [].concat(callback);

        }
    }
    /**
     * 触发事件
     * @param eventName 事件名称
     */
    public dispatch(eventName: string,params:any) {
        if(!Array.isArray(this.listeners[eventName])) return;
        this.listeners[eventName].forEach((callback: any) => callback.call(null, params));
    }
    /**
     * 移除事件
     * @param eventName 事件名称
     * @param callback  需要移除的事件函数 不填写则移除所有事件
     */
    public off(eventName: string, callback?: any) {

        let arr = this.listeners[eventName] || [];
        const index = arr.indexOf(callback);
        if (index === -1) {
            this.listeners[eventName].length = 0;
        } else {
            this.listeners[eventName].splice(index, 1);
        }
    }
}

export default new EventEmiter();