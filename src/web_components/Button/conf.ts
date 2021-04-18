import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

export type BtnSize = 'lg' | 'sm'
export type BtnType = 'primary' | 'default' | 'danger' | 'link'


interface BtnBase extends Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>{
    /**
     * @description 
     * 按钮类名 
     */
    className?:string;
    /**
     * @description 
     * 是否禁用 默认false 
     */
    disabled?:boolean;
    type?:'primary'|BtnType;
    size?:BtnSize;
    children:ReactNode;
    href?: string;
}




type NativeButtonProps = BtnBase & ButtonHTMLAttributes<HTMLElement>;
type AnchorProps = BtnBase & AnchorHTMLAttributes<HTMLElement>;
export type IProps = Partial<NativeButtonProps & AnchorProps>;