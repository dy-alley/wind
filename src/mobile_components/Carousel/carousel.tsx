/*
 * @Author: alley
 * @Description:
 * @Date: 2021-02-05 11:38:36
 * @LastEditors: alley
 * @LastEditTime: 2021-04-13 14:26:51
 */
import React, { FC, useState, useRef, useEffect, MutableRefObject, Fragment } from "react";
import { IProps } from "./conf";
import styles from "./_carousel.module.scss";


let count = 0;
export const Carousel: FC<IProps> = (props) => {
    const {
        autoplay,
        children,
        indicator,
        navigation,
        indicatorStyle,
        indicator_active_color,
        navigation_left_style,
        navigation_right_style,
        getCurrentIndex
    } = props;
    const [contentWidth, setContentWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [moveStatus, setMoveStatus] = useState(1); // 1为禁止 2为运动
    const content = useRef<HTMLDivElement>();
    const wrapper = useRef<HTMLDivElement>();
    const timer = useRef() as MutableRefObject<NodeJS.Timeout>;
    let carouselBoxWidth: number;
    let childrenLen: number = 0;
    let distanceX: number = 0;
    let disX: number = 0;

    // 轮播核心
    const core = () => {
        getCurrentIndex && getCurrentIndex(count);
        content.current?.addEventListener("transitionend", handleTransitionEnd, false);
        // 设置动画类型
        (content.current as HTMLDivElement).style.transition = "left 1s ease-in-out";
        // 改变位置
        (content.current as HTMLDivElement).style.left = -(count * (wrapper.current?.offsetWidth as number)) + "px";
    };


    // 自动轮播
    const _autoplay = () => {
        clearInterval(timer.current);
        timer.current = setInterval(() => {
            if (count === childrenLen - 1) {
                count = 1;
                (content.current as HTMLDivElement).style.transition = "none";
                (content.current as HTMLDivElement).style.left = "0px";
            } else {
                ++count;
            }

            // 当前轮播的下标
            if (count === childrenLen - 1) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex(count);
            }

            // 动画核心
            setTimeout(() => {
                core();
            }, 100);
        }, 3000);
    };


    /**
     * 轮播初始化:
     *  1、计算轮播盒子总长度
     */
    const carouselInit = () => {
        //一个图片的宽度
        carouselBoxWidth = wrapper.current?.offsetWidth as number;
        // 计算总长度
        let width = (carouselBoxWidth as number) * childrenLen;
        // 设置宽度
        setContentWidth(width);
        // 是否自动轮播
        (autoplay as boolean) && _autoplay();
    };





    // 动画结束
    const handleTransitionEnd = () => {
        // 动画结束后就关闭动画
        (content.current as HTMLDivElement).style.transitionProperty = 'none';
        // 恢复状态为1静止
        setMoveStatus(1);
        content.current?.removeEventListener('transitionend', handleTransitionEnd, false);
    }

    /**
     * 渲染节点
     *  1、实现无缝轮播复制第一张到最后一张
     */
    const renderCarouselChild = () => {
        let childEles: any = [];
        React.Children.forEach(children, (child) => {
            const childElement = child as React.FunctionComponentElement<any>;
            const { displayName } = childElement.type;
            if (displayName === "carouselItem") {
                childEles.push(childElement);
            }
        });
        // 复制第一张item 实现无缝轮播
        childEles = [...childEles, childEles[0]];
        // 记录长度
        childrenLen = childEles.length;
        return childEles.map((child: any, index: number) => {
            return React.cloneElement(child, {
                width: wrapper.current?.offsetWidth,
                key: `${index}-${child.key}`,
            });
        });
    };


    /**
     * 渲染指示点
     */
    const renderIndicatorChildren = () => {
        return React.Children.map(children, (child, index) => (
            <div
                className={`${styles.dots}`}
                style={{
                    ...(indicatorStyle as React.CSSProperties),
                    background: `${index === currentIndex ? indicator_active_color ? indicator_active_color : '#000' : ""}`
                }}
            ></div>
        ));
    };


    // /**
    //  * 点击上一张、下一张 通用逻辑部分
    //  */
    // const navigationCommon = () => {
    //     // 当前轮播的下标
    //     if (count === childrenLen - 1) {
    //         setCurrentIndex(0);
    //     } else {
    //         setCurrentIndex(count);
    //     }
    // }

    // // 上一张
    // const navigationPrev = () => {
    //     if (moveStatus === 2) return;
    //     setMoveStatus(2)
    //     console.log(moveStatus, "moveStatus")
    //     if (count === childrenLen - 1) {
    //         count = 1;
    //         (content.current as HTMLDivElement).style.transition = "none";
    //         (content.current as HTMLDivElement).style.left = "0px";
    //     } else {
    //         ++count;
    //     }
    //     navigationCommon();
    //     // 动画核心
    //     setTimeout(() => {
    //         core();
    //     }, 100);
    // };



    // const navigationNext = () => {
    //     if (moveStatus === 2) return;
    //     setMoveStatus(2)
    //     if (count === 0) {
    //         count = childrenLen - 2;
    //         (content.current as HTMLDivElement).style.transition = "none";
    //         (content.current as HTMLDivElement).style.left = -(childrenLen - 1) * (wrapper.current?.offsetWidth as number) + 'px'
    //     } else {
    //         --count;
    //     }
    //     navigationCommon();
    //     // 动画核心
    //     setTimeout(() => {
    //         core();
    //     }, 100);
    // };







    const touchStartCallback = (e: any) => {
        e.preventDefault();
        clearInterval(timer.current);
        disX = e.targetTouches[0].clientX;
        content.current?.addEventListener('touchmove', touchMoveCallback)
    }

    const touchMoveCallback = (e: any) => {
        e.preventDefault();
        if (moveStatus === 2) return;
        // 手指移动的距离
        let moveX = e.targetTouches[0].clientX;

        //计算差值  如何检测用户向左滑动还是右滑动   右正   左负
        distanceX = moveX - disX;

        //在移动的时候先要关闭动画
        (content.current as HTMLDivElement).style.transition = "none";

        if (Math.abs(distanceX) > (wrapper.current?.offsetWidth as number) * 4 / 5) {
            content.current?.removeEventListener('touchmove', touchMoveCallback);
            (content.current as HTMLDivElement).style.transition = "left 1s ease-in-out";
        }

        if (distanceX > 0 && count === 0) {
            (content.current as HTMLDivElement).style.left = -((childrenLen - 1) * (wrapper.current?.offsetWidth as number)) + distanceX + 'px';
        } else if (distanceX < 0 && count === (childrenLen - 1)) {
            (content.current as HTMLDivElement).style.left = distanceX + 'px';
        } else {
            (content.current as HTMLDivElement).style.left = -(count * (wrapper.current?.offsetWidth as number)) + distanceX + 'px';
        }
    }
    // // 手指离开
    // const touchEnd = () => {
    //     content.current?.addEventListener('touchend', touchEndCallback)
    // }
    const touchEndCallback = (e: any) => {
        if (Math.abs(distanceX) > (wrapper.current?.offsetWidth as number) / 4) {
            // 大于0 向右移动一张 
            if (distanceX > 0) {
                if (count === 0) {
                    count = childrenLen - 2;
                    (content.current as HTMLDivElement).style.left = -(childrenLen - 1) * (wrapper.current?.offsetWidth as number) + 'px'
                } else {
                    --count;
                }

                if (count === childrenLen - 1) {
                    setCurrentIndex(0);
                } else {
                    setCurrentIndex(count);
                }


                core();
            } else {
                // 小于0 向左移动一张  
                if (count === (childrenLen - 1)) {
                    count = 1;
                    (content.current as HTMLDivElement).style.left = 0 + 'px';
                } else {
                    ++count;
                }

                if (count === childrenLen - 1) {
                    setCurrentIndex(0);
                } else {
                    setCurrentIndex(count);
                }
                core();
            }
        } else {
            /*
               回弹三种情况
                   1、当移动的是第一张时
                   2、当移动的是最后一张时
                   3、其他情况
           */
            if (count === 0) {
                (content.current as HTMLDivElement).style.left = 0 + 'px';
            } else if (count === (childrenLen - 1)) {
                (content.current as HTMLDivElement).style.left = -((childrenLen - 1) * (wrapper.current?.offsetWidth as number)) + 'px';
            } else {
                (content.current as HTMLDivElement).style.left = -(count * (wrapper.current?.offsetWidth as number)) + 'px';
            }
        }

        // 是否自动轮播
        (autoplay as boolean) && _autoplay()
    }

    useEffect(() => {
        carouselInit();
        content.current?.addEventListener('touchstart', touchStartCallback);
        content.current?.addEventListener('touchend', touchEndCallback)
    }, []);
    return (
        <div
            className={styles.wrapper}
            ref={(node: HTMLDivElement) => {
                wrapper.current = node;
            }}
        >
            <div
                className={styles.content}
                ref={(node: HTMLDivElement) => {
                    content.current = node;
                }}
                style={{ width: `${contentWidth}px` }}
            >
                {renderCarouselChild()}
            </div>
            {/* 分页器 */}
            {indicator ? <div className={styles.indicator}>{renderIndicatorChildren()}</div> : ""}
        </div>
    );
};

export default Carousel;