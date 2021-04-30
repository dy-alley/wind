/*
 * @Author: alley
 * @Description: 核心代码
 * @Date: 2021-04-22 18:09:44
 * @LastEditors: alley
 * @LastEditTime: 2021-04-27 13:49:01
 */
import React, { useState, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom';
import Notice from './Notice'
import { NoticeProps } from './conf'
import useData from '../../utils/useData'

interface ChildrenRefInfo {
    [key: string]: any
}
export const Notification = React.forwardRef((props, ref) => {
    // const [notices, setNotices] = useData<NoticeProps[]>([]);
    const [notices, setNotices] = useData([]);

    // 设置key
    const getNoticeKey = () => {
        return `notice-${new Date().getTime()}-${notices.length}`
    }

    // 添加
    const addNotice = (notice: NoticeProps) => {
        notice.key = getNoticeKey();
        if (notices.every((item:any) => item.key !== notice.key)) {
            /**
             * 这里有问题
             */
            // 没有存进去就开始删除了
            setNotices(notices.concat(notice));
            
            if (notice.duration > 0) {
                setTimeout(() => {
                    removeNotice(notice.key)
                }, notice.duration)
                return;
            }
        }
        removeNotice(notice.key)
    }
    

    // 移除
    const removeNotice = (key: string) => {
       
        const index = notices.findIndex((notice:any)=>notice.key === key);
       
        if(index === -1) return;
        notices.splice(index,1);
        setNotices(notices)
    }

    useImperativeHandle(ref, () => ({
        getNoticeKey,
        addNotice,
        removeNotice
    }), [notices]);
    
    return (
        <div>
            {
                <div>{JSON.stringify(notices)}</div>
            }
            {
                notices.map((notice: NoticeProps) => {
                    return <Notice {...notice} />
                })
            }
        </div>
    )
})



export const createNotification = () => {
    let div: HTMLDivElement;
    div = document.createElement('div');
    document.body.appendChild(div);
    const mount: React.RefObject<ChildrenRefInfo> = React.createRef();
    ReactDOM.render(<Notification ref={mount} />, div);

    return {
        addNotice(notice: NoticeProps) {
            return mount.current?.addNotice(notice)
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }
}

export default createNotification();