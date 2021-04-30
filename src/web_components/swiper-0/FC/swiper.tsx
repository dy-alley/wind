import React, { FC, useState, useRef, useEffect, MutableRefObject } from 'react'
import { IProps } from './conf'
import styles from './_swiper.module.scss'


let count = 0;
export const Swiper:FC<IProps> = (props) => {
    const { autoplay,children,selectIndex=0} = props;
    const [contentWidth, setContentWidth ] = useState(0);
    const [currentIndex,setCurrentIndex] = useState(selectIndex)
    const content = useRef<HTMLDivElement>();
    const wrapper = useRef<HTMLDivElement>();
    const timer = useRef() as MutableRefObject<NodeJS.Timeout>;
    let iWidth:any;
    let childrenLen:number = 0;
    let disX:any;
    let distanceX:any;


    useEffect(()=>{
        console.log("count",count)
    },[count])

    // 渲染节点
    const renderItem = () => {
        let childEles:any = [];
        React.Children.forEach(children,(child)=>{
            const childElement = child as React.FunctionComponentElement<any>;
            const { displayName } = childElement.type
            if( displayName === 'swiperItem') {
                childEles.push(childElement);
            }
        })
        // 复制第一张item 实现无缝轮播
        childEles = [...childEles,childEles[0]];
        // 记录长度
        childrenLen = childEles.length;
        return childEles.map((child:any,index:number,)=>{
            return React.cloneElement(child,{
                width:wrapper.current?.offsetWidth,
                key:`${index}-${child.key}`
            })
        });
       
    }
    // 初始化
    const  handleInit = () => {
        //一个图片的宽度
        iWidth = wrapper.current?.offsetWidth;
        // 计算总长度
        let width =  iWidth as number *  childrenLen;
        // 设置宽度
        setContentWidth(width);
        // 是否自动轮播
        //(autoplay as boolean) &&  _autoplay() 
        _autoplay() 
    }

    useEffect(()=>{
        handleInit()
    },[]);



    // 手指按下
    // const touchStart = () => {
    //     content.current?.addEventListener('touchstart',touchStartCallback)
    // }
    // const touchStartCallback = (e:any) => {
    //     e.preventDefault();
    //     clearInterval(timer.current);
    //     disX = e.targetTouches[0].clientX;
    // }
    // 手指移动
    // const touchMove = () => {
    //     content.current?.addEventListener('touchmove',touchMoveCallback)
    // }
    // const touchMoveCallback = (e:any) => {
    //     e.preventDefault();
        
    //     // 手指移动的距离
    //     let moveX = e.targetTouches[0].clientX;

    //     //计算差值  如何检测用户向左滑动还是右滑动   右正   左负
    //     distanceX = moveX - disX;

    //     //在移动的时候先要关闭动画
    //     (content.current as HTMLDivElement).style.transition = "none";

    //     if (distanceX > 0 && currentIndex === 0) {
    //         (content.current as HTMLDivElement).style.left = -((childrenLen-1) * iWidth) + distanceX + 'px';
    //     } else if(distanceX < 0 && currentIndex === (childrenLen - 1)) {
    //         (content.current as HTMLDivElement).style.left = distanceX + 'px';
    //     } else {
    //         (content.current as HTMLDivElement).style.left = -(currentIndex * iWidth) + distanceX + 'px';
    //     }
    // }
    // 手指离开
    // const touchEnd = () => {
    //     content.current?.addEventListener('touchend',touchEndCallback)
    // }
    // const touchEndCallback = (e:any) => {
    //     if(Math.abs(distanceX) > iWidth / 4) {
    //         // 大于0 向右移动一张 
    //         if(distanceX > 0) {
    //             if(currentIndex === 0){
    //                 setCurrentIndex(childrenLen - 2);
    //                 (content.current as HTMLDivElement).style.left = -(childrenLen - 1) * iWidth + 'px'
    //             } else {
    //                 let index = currentIndex;
    //                 setCurrentIndex(--index);
    //             }
    //             toImg();
    //         } else {
    //         // 小于0 向左移动一张  
    //             if(currentIndex === (childrenLen - 1)) {
    //                 setCurrentIndex(1);
    //                 (content.current as HTMLDivElement).style.left = 0 + 'px';
    //             } else{
    //                 let index = currentIndex;
    //                 setCurrentIndex(++index);
    //             }
    //             toImg();
    //         }
    //     } else {
    //          /*
    //             回弹三种情况
    //                 1、当移动的是第一张时
    //                 2、当移动的是最后一张时
    //                 3、其他情况
    //         */
    //        if (currentIndex === 0) {
    //             (content.current as HTMLDivElement).style.left = 0 + 'px';
    //         } else if (currentIndex === (childrenLen - 1)) {
    //             (content.current as HTMLDivElement).style.left = -((childrenLen-1) * iWidth) + 'px';
    //         } else {
    //             (content.current as HTMLDivElement).style.left = -(currentIndex * iWidth) + 'px';
    //         }
    //     }

    //    // 是否自动轮播
    //    (autoplay as boolean) &&  _autoplay() 
    // }

    // 自动轮播
    const _autoplay = () => {
        timer.current = setInterval(() => {
            if (count ===  (childrenLen-1)) {
                //setCurrentIndex(1);
                count = 1;
                (content.current as HTMLDivElement).style.transition = "none";
                (content.current as HTMLDivElement).style.left = '0px';
            } else {
                // let index = currentIndex;
                
                // setCurrentIndex(++index);
                ++count;
            }
            
            setTimeout(()=>{
                toImg();
            },0)
        }, 3000)
    }
    // 轮播原理
    const toImg = () => {
        
         // 设置动画类型
         (content.current as HTMLDivElement).style.transition = "left .6s ease-in-out";
         // 改变位置
         (content.current as HTMLDivElement).style.left = -(count * (iWidth as number)) + 'px';
    }
    return (   
        <div className={styles.wrapper} ref={(node:HTMLDivElement)=>{
            wrapper.current = node;
        }}>
            <div 
                className={styles.content} 
                ref={(node: HTMLDivElement) => {
                    content.current = node;
                }}
                style={{width:`${contentWidth}px`}}
                >
                {
                    renderItem()
                }
            </div>
        </div>
    )
}

export default Swiper;