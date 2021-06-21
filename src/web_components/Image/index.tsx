/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-04-22 16:28:22
 * @LastEditors: alley
 * @LastEditTime: 2021-06-11 11:48:44
 */
import React, { FC, useState } from 'react'
import classNames from 'classnames';


export interface IProps {
    /**
     * @description src地址;
     */
    src?:string;
    /**
     * @description 加载失败的src地址
     */
    errorSrc?:string;
    /**
     * @description css样式
     */
    style?:React.CSSProperties;
    /**
     * @description css类名;
     */
    className?:string;
    /**
     * @description alt描述 text 规定图像的替代文本
     */
    alt?:string;
    /**
     * @description 高度
     */
    width?:number;
    /**
     * @description 高度
     */
    height?:number;
}

export const Image:FC<IProps> = function Image(props) {
    const {src, style = {}, className = '', errorSrc, alt,width,height } = props;
    const classname = classNames(className);
    const Img = React.useRef<HTMLImageElement>(null);
    // 新增一个状态，标记是否发生过错误
    const [imgError, setImgError] = useState(false)
    if(!imgError) {
        return (
            <img 
            ref={Img}
            style={Object.assign({style,width,height})}
            src={src}
            className={classname}
            alt={alt}
            onError = {()=>{
                if (Img.current) setImgError(true)
            }}
            />
        )
    } else {
        // 当网络状况很差时，defaultImg也可能加载失败，这样onError就会陷入死循环,因此做容错处理
        return <img style={Object.assign({style,width,height})} className={className} src={errorSrc} alt={alt} />;
    }
    
}

Image.defaultProps = {
    errorSrc:'',

};
export default Image;