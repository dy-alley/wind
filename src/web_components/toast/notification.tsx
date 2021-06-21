/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-06-02 11:17:06
 * @LastEditors: alley
 * @LastEditTime: 2021-06-02 13:50:30
 */

import React, { useMemo, useEffect } from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import Notice from './Notice';

interface NoticeProps {
    type: 'info' | 'success' | 'warning' | 'error' | 'loading';
    content: string;
    duration: number;
}
let conatiner: HTMLElement; // 最外层的父级容器
export const createMessage = () => {
    return (props: NoticeProps) => {
        const { type, content, duration } = props;
        if (typeof document === "undefined") return;

        if (!conatiner) {
            //如果有的话，说明已经调用过这个函数了，这个空div就可以一直复用
            conatiner = document.createElement("div");
            conatiner.style.cssText = `
                line-height:
                1.5;text-align:
                center;color: #333;
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                list-style: none;
                position: fixed;
                z-index: 100000;
                width: 100%;
                top: 16px;
                left: 0;
                pointer-events: none;`;
            if (conatiner) {
                document.body && document.body.appendChild(conatiner); //挂body上
            }
        }


        const div = document.createElement("div"); //存放 notice的容器盒子 一个notice一个盒子
        conatiner.appendChild(div);
        ReactDOM.render(
            <Message
                rootEl={conatiner}
                parentEl={div}
                content={content}
                type={type}
                duration={duration}

            />,
            div
        );
    };
};

export type MessageProps = {
    rootEl: HTMLElement;
    parentEl: Element | DocumentFragment;
    content: string
    duration: number;
    type: 'info' | 'success' | 'warning' | 'error' | 'loading';
};

export function Message(props: MessageProps) {
    const { rootEl, parentEl, content, duration = 2000, type } = props;

    const unmount = useMemo(() => {
        return () => {
            if (parentEl && rootEl) {
                unmountComponentAtNode(parentEl);
                rootEl.removeChild(parentEl);
            }
        };
    }, [parentEl, rootEl]);

    useEffect(() => {
        setTimeout(() => {
            unmount();
        }, duration);
    }, [unmount]);
    return <Notice type={type} content={content} />;
}
