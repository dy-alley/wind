import React, { Component, createRef } from 'react';
import './style.scss'
import { IProps, IState } from './conf'

class SeamlessScroll extends Component<IProps, IState> {
    content: React.RefObject<HTMLUListElement>;
    timer:any;
    speed:number;
    public static defaultProps: Partial<IProps> = {
        direction: 'vertical',
        speed:1,
    };
    constructor(props:any) {
        super(props)
        this.state = {
            newChildren: []
        }
        this.content = createRef();
        this.speed = this.props.speed as number;
    }
    render() {
        const { width, height, containerClass, contentClass} = this.props;
        const { newChildren } = this.state;
        return (
            <div className={`container ${containerClass}`} style={{width, height}}>
                <ul 
                    className={`content ${contentClass}`}
                    ref={this.content}>
                    {newChildren}
                </ul>
            </div>
        );
    }

    componentDidMount = () => {
        // 拷贝双份子元素
        this.handleCopyChildren()
        const scrollCb = this.props.direction === 'vertical' ? this.handleVerticalScroll : this.handlehorizontal
        this.timer = setInterval(scrollCb, 50);
       
    }

    handleCopyChildren = () => {
        let arr:React.ReactElement<any>[] = [];
        React.Children.forEach(this.props.children, (child) => {
            const childElement = child as React.ReactElement<any>;
            arr.push(React.cloneElement(childElement));
        })
        React.Children.forEach(this.props.children, (child, index) => {
            const childElement = child as React.ReactElement<any>;
            let newProps = {
                key: `${index}copy`,
                ...childElement.props
            };
            arr.push(React.cloneElement(childElement, newProps));
        })

        this.setState({
            newChildren: arr,
        })
    }

    handleVerticalScroll = () => {
        const content = this.content.current as HTMLUListElement;
        if (content.offsetTop < -content.offsetHeight / 2) {
            content.style.top = "0px"
        } else if (content.offsetTop >= 0) {
            content.style.top = -content.offsetHeight / 2 + "px"
        }
        content.style.top = content.offsetTop - this.speed + "px"
    }
    handlehorizontal = () => {
        const content = this.content.current as HTMLUListElement;
        if (content.offsetLeft < -content.offsetWidth / 2) {
            content.style.left = "0px"
        } else if (content.offsetLeft >= 0) {
            content.style.left = -content.offsetWidth / 2 + "px"
        }
        content.style.left = content.offsetLeft - this.speed + "px"
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
}

export default SeamlessScroll;