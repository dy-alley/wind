export class QueueNode {
    public data: any;
    public next: any;
    constructor(data: any) {
        this.data = data;
        this.next = null;
    }
}

export class Queue {
    public head: any;
    public tail: any;
    protected length: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    /**
     * 尾部插入
     */
    append(data:any) {
        const queueNode = new QueueNode(data);
        if(this.head) {
            this.tail.next = queueNode;
            this.tail = queueNode;
        } else {
            this.head = queueNode;
            this.tail = queueNode;
        }
        this.length++;
        return true;
    }
    /**
     * 获取节点
     */
    getNode(index:number) {
        if(index < 0 || index > this.length) {
            return false;
        } else {
            if(index === 0) {
               return this.head;
            } else {
                let currentIndex = 0;
                let currentNode = this.head;
                while(currentIndex < index) {
                    currentNode = currentNode.next;
                    currentIndex += 1;
                }
                return currentNode;
            }
        }
    }
    /**
     * 插入
     */
    insert(index:number,data:any) {
        if(index < 0 || index > this.length) {
            return false;
        } else if(index === this.length) {
            this.append(data);
        } else {
            const queueNode = new QueueNode(data);
            if(index === 0) {
                queueNode.next = this.head;
                this.head = queueNode;
            } else {
                const nextNode = this.getNode(index);
                const prevNode = this.getNode(index - 1);
                queueNode.next = nextNode;
                prevNode.next = queueNode;
            }
            this.length += 1;
            return true;
        }
    }
    /**
     * 移除
     */
    remove(index:number) {
        if(index < 0 || index > this.length) {
            return false;
        } else if(index === 0) {
            this.head = this.head.next;
            this.length -= 1;
        } else {
            const nextNode = this.getNode(index).next;
            const prevNode = this.getNode(index - 1);
            prevNode.next = nextNode;
            this.length -= 1;
        }
    }
    /**
     * 获取节点数据
     */
    get(index:number) {
        if(index < 0 || index > this.length) {
            return false;
        } else {
            if(index === 0) {
               return this.head.data;
            } else {
                let currentIndex = 0;
                let currentNode = this.head;
                while(currentIndex < index) {
                    currentNode = currentNode.next;
                    currentIndex += 1;
                }
                return currentNode.data;
            }
        }
    }
}

export default Queue;