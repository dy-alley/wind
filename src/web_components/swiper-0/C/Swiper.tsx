import React, { Component } from 'react'
import { IProps, IState } from './conf'
import styles from './_swiper.module.scss'


export class Swiper extends Component<IProps,IState> {
    content: React.RefObject<HTMLDivElement>;
    wrapper: React.RefObject<HTMLDivElement>;
    iWidth:any;
    timer:any;
    len:any;
    disX:any;
    distanceX:any;
    constructor(props:IProps){
        super(props)
        this.state = {
            currentIndex:0,
            contentWidth:0,
        }
        // 外层最大的盒子
        this.wrapper = React.createRef();
        
        // 需要移动的盒子
        this.content = React.createRef();
       
    }
    render() {
        const { contentWidth } = this.state;
        return (
            <div className={styles.wrapper} ref={this.wrapper}>
                <div 
                    className={styles.content} 
                    ref={this.content}
                    style={{width:`${contentWidth}px`}}
                    >
                    {
                        this.renderItem()
                    }
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.handleInit();
        this.touchStart();
        this.touchMove();
        this.touchEnd();
    }
    // 渲染Item
    renderItem = () => {
        let childEles:any = [];
        React.Children.forEach(this.props.children,(child)=>{
            const childElement = child as React.ComponentElement<any,any>;
            const { displayName } = childElement.type
            if( displayName === 'swiperItem') {
                 childEles.push(childElement);
            }
        })
        // 复制第一张item 实现无缝轮播
        childEles = [...childEles,childEles[0]];
        // 记录长度
        this.len = childEles.length;
        return childEles.map((child:any,index:number)=>{
            return React.cloneElement(child,{
                width:this.iWidth,
                key:`${index}-${child.key}`
            })
        });
    }
    // 初始化
    handleInit() {
        //一个图片的宽度
        this.iWidth = this.wrapper.current?.offsetWidth;
        // 计算总长度
        let width =  this.iWidth as number *  this.len;
        this.setState({
            contentWidth: width
        }, () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this.props.autoplay ? this.autoplay() : '';
        })
    }
    // 手指按下
    touchStart = () => {
        this.content.current?.addEventListener('touchstart',this.handleTouchStartCallback)
    }
    handleTouchStartCallback = (e:any) => {
        clearInterval(this.timer);
        this.disX = e.targetTouches[0].clientX;
    }
    // 手指移动
    touchMove = () => {
        this.content.current?.addEventListener('touchmove',this.handleTouchMoveCallback)
    }
    handleTouchMoveCallback = (e: any) => {
        e.preventDefault();

        //记录移动的位置
        let moveX = e.targetTouches[0].clientX;

        //计算差值  如何检测用户向左滑动还是右滑动   右正   左负
        this.distanceX = moveX - this.disX;

        //在移动的时候先要关闭动画
        (this.content.current as HTMLDivElement).style.transition = "none";

        if (this.distanceX > 0 && this.state.currentIndex === 0) {
            (this.content.current as HTMLDivElement).style.left = -((this.len-1) * this.iWidth) + this.distanceX + 'px';
        } else if(this.distanceX < 0 && this.state.currentIndex === (this.len - 1)) {
            (this.content.current as HTMLDivElement).style.left = this.distanceX + 'px';
        } else {
            (this.content.current as HTMLDivElement).style.left = -(this.state.currentIndex * this.iWidth) + this.distanceX + 'px';
        }
    }
    // 手指抬起
    touchEnd = () => {
        this.content.current?.addEventListener('touchend',this.handleTouchEndCallback)
    }
    handleTouchEndCallback = ()=>{
        // 移动的位置大于1/4则进入下一张，否则回弹
        if(Math.abs(this.distanceX) > this.iWidth / 4){
            // 大于0 向右移动一张 
            if(this.distanceX > 0) {
                if(this.state.currentIndex === 0){
                    this.setState({
                        currentIndex:this.len - 2,
                    });
                    (this.content.current as HTMLDivElement).style.left = -(this.len - 1) * this.iWidth + 'px'
                } else {
                    let index = this.state.currentIndex;
                    this.setState({
                        currentIndex:--index,
                    });
                }
                this.toImg();
            } else {
            // 小于0 向左移动一张  
                if(this.state.currentIndex === (this.len - 1)) {
                    this.setState({
                        currentIndex:1,
                    });
                    (this.content.current as HTMLDivElement).style.left = 0 + 'px';
                } else{
                    let index = this.state.currentIndex;
                    this.setState({
                        currentIndex:++index,
                    })
                }
                this.toImg();
            }

        } else{
            /*
                回弹三种情况
                    1、当移动的是第一张时
                    2、当移动的是最后一张时
                    3、其他情况
            */
            if (this.state.currentIndex === 0) {
                (this.content.current as HTMLDivElement).style.left = 0 + 'px';
            } else if (this.state.currentIndex === (this.len - 1)) {
                (this.content.current as HTMLDivElement).style.left = -((this.len-1) * this.iWidth) + 'px';
            } else {
                (this.content.current as HTMLDivElement).style.left = -(this.state.currentIndex * this.iWidth) + 'px';
            }

        }

        this.autoplay();
    }
    // 自动轮播
    autoplay = () => {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (this.state.currentIndex ===  (this.len-1)) {
                this.setState({
                    currentIndex: 1,
                });

                (this.content.current as HTMLDivElement).style.transition = "none";
                (this.content.current as HTMLDivElement).style.left = '0px';
            } else {
                let index = this.state.currentIndex;
                this.setState({
                    currentIndex: ++index
                })
            }
            
            setTimeout(()=>{
                this.toImg();
            })
        }, 3000)
    }
     //轮播的原理
    toImg() {
        // 设置动画类型
        (this.content.current as HTMLDivElement).style.transition = "left .2s ease-in-out";
        // 改变位置
        (this.content.current as HTMLDivElement).style.left = -(this.state.currentIndex * (this.iWidth as number)) + 'px';
    }
    componentWillUnmount(){
        this.content.current?.removeEventListener('touchstart',this.handleTouchStartCallback)
        this.content.current?.removeEventListener('touchmove',this.handleTouchMoveCallback)
        this.content.current?.removeEventListener('touchend',this.handleTouchEndCallback)
    }
}
export default Swiper;