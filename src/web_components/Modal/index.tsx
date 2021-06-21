/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-06-10 10:46:42
 * @LastEditors: alley
 * @LastEditTime: 2021-06-11 10:35:47
 */
import { FC } from 'react';
import { IProps } from './conf';
import { ModalTemplate, Alert } from './Modal'

export type ModalProps = FC<IProps> & {
    Alert: (params: IProps) => void;
}

const Modal = ModalTemplate as ModalProps;
Modal.Alert = Alert

export default Modal