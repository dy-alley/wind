/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-06-02 11:46:05
 * @LastEditors: alley
 * @LastEditTime: 2021-06-02 14:49:42
 */
// /*
//  * @Author: alley
//  * @Description: 核心代码
//  * @Date: 2021-04-22 18:09:44
//  * @LastEditors: alley
//  * @LastEditTime: 2021-06-01 18:07:20
//  */
// import React, { useEffect, useState, useImperativeHandle, useRef, MutableRefObject } from 'react'
// import ReactDOM from 'react-dom';
// import Notice from './Notice'
// import { NoticeProps } from './conf'

// interface ChildrenRefInfo {
//     [key: string]: any
// }
// export const Notification: any = React.forwardRef((props, ref: React.ForwardedRef<any>) => {
//     const [notices, setNotices] = useState<NoticeProps[]>([]);
//     const timer = useRef() as MutableRefObject<NodeJS.Timeout>;
//     // 设置key
//     const getNoticeKey = () => {
//         return `notice-${new Date().getTime()}-${notices.length}`
//     }

//     // 添加
//     const addNotice = (notice: NoticeProps) => {
//         notice.id = getNoticeKey();
//         console.log(notices,"notices")
//         setNotices(notices.concat(notice));


//     }


//     // 移除
//     const removeNotice = (id: string) => {
      
//     }

//     useImperativeHandle(ref, () => ({
//         getNoticeKey,
//         addNotice,
//         removeNotice
//     }), [notices]);

//     useEffect(() => {
        
        
//     }, [notices])

//     return (
//         <div>
//             {
//                 notices.map((notice: NoticeProps) => {
//                     return <Notice {...notice} key={notice.id} />
//                 })
//             }
//         </div>
//     )
// })



// export const createNotification = () => {

//     let div: HTMLDivElement;
//     div = document.createElement('div');
//     document.body.appendChild(div);
//     const mount: React.RefObject<ChildrenRefInfo> = React.createRef();
//     ReactDOM.render(<Notification ref={mount} />, div);

//     return {
//         addNotice(notice: NoticeProps) {
//             return mount.current?.addNotice(notice)
//         },
//         destroy() {
//             ReactDOM.unmountComponentAtNode(div);
//             document.body.removeChild(div);
//         }
//     }
// }

// export default createNotification();

// /**
//  1、addNotice 方法调用是同步的  但是方法内部的set是异步的，导致数据存储不进去
//  2、
//  */

export default  {
    
}