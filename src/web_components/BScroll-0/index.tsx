// import React, { Component } from 'react'
// import BeScroll from 'better-scroll'
// import { IProps, IState } from './conf'
// import  './index.scss'

// class BScroll extends Component<IProps, IState> {
//     scroll!: BeScroll;
//     wrapper: React.RefObject<HTMLDivElement>;
//     page:number;
//     public static defaultProps: Partial<IProps> = {
//         scrollX: false,
//         pullDown: false,
//         pullUpLoad: false,
//         onScroll: false,
//         probeType: 2,
//         pageStart:0,
//     };
//     constructor(props:IProps) {
//         super(props);
//         this.state ={
//             pullDownLoading: false,
//             pullUpLoadLoading: false,
//         }
//         this.wrapper = React.createRef();
//         this.page = this.props.pageStart as number;
//     }
//     render() {
//         const { pullUpLoadLoading, pullDownLoading } = this.state;
//         return (
//             <div className='bscroll_wrapper' ref={this.wrapper}>
//                 {this.props.scrollX ? this.props.children : 
//                <div>
//                     {pullDownLoading ? this.props.loading : ''}
//                     {this.props.children}
//                     {pullUpLoadLoading ? this.props.loading : ''}
//                </div>
//                }
//             </div>
//         )
//     }
//     componentDidMount() {
//         const wrapper = this.wrapper.current as HTMLDivElement;
//         this.scroll = new BeScroll(wrapper, {
//             scrollX: this.props.scrollX,
//             click: true,
//             tap: true,
//             probeType: this.props.probeType,
//             pullUpLoad:this.props.pullUpLoad,
//             pullDownRefresh:this.props.pullDown
//         })
//         console.log(this.scroll)
//         // 第一次加载
//         if (  this.props.pullingUp && this.props.pullingDown ) {
//             this.props.pullingUp(this.page);
//         } else if (this.props.pullingUp) {
//             this.props.pullingUp(this.page);
//         } else if (this.props.pullingDown) {
//             this.props.pullingDown();
//         }
//         this.handlePullingUp();
//         this.handlePullingDown();
//         this.handleScroll();
//     }
//     // 上拉加载更多事件绑定
//     handlePullingUp = () => {
//         this.scroll.on('pullingUp', () => {
//             if ( this.props.pullingUp ) {
//                 this.setState({
//                     pullUpLoadLoading: true,
//                 })
//                this.props.pullingUp(this.page)
//             }
//         })
//     }
//     // 下拉刷新事件绑定
//     handlePullingDown = () => {
//         this.scroll.on('pullingDown', () => {
//             if (this.props.pullingDown) {
//                 this.setState({
//                     pullDownLoading: true,
//                 })
//                 this.props.pullingDown();
//             }
           
//         })
//     }
//     // 实时滚动
//     handleScroll = () => {
//        this.scroll.on('scroll', (position:any) => {
//             this.props.scrollCb && this.props.scrollCb(position.y)
//        }) 
//     }
//     componentDidUpdate(oldProps:any, oldState:any) {
//        const newChidlren = this.props.children as React.ReactDOM[];
//        const oldChidlren = oldProps.children as React.ReactDOM[];
//        if (newChidlren.length > oldChidlren.length) {
//             this.setState({
//                 pullUpLoadLoading: false,
//             }, () => {
//                 this.scroll.refresh();
//                 this.scroll.finishPullUp()
//                 this.page++;
//             })
            
//        }

//        if (oldState.pullDownLoading) {
//            this.setState({
//                 pullDownLoading: false,
//            }, () => {
//                 this.scroll.refresh();
//                 this.scroll.finishPullDown()
//            })
//        }
        
//     }
    
// }
// export default BScroll


import React from 'react'

export default function index() {
    return (
        <div>
            
        </div>
    )
}
