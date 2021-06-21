/*
 * @Author: alley
 * @Description: 上传文件
 * @Date: 2021-05-28 14:03:15
 * @LastEditors: alley
 * @LastEditTime: 2021-06-11 16:57:53
 */
import React, { FC, useState, Fragment, useRef } from 'react'
import './index.css';
import Toast from '../Toast';
import classNames from 'classnames';
import Modal from '../Modal'

interface IProps {
    /**
     * @description 文件大小限制 默认2M
     */
    maxSize?: number;
    /**
     * @description 上传文件状态改变时的回调
     */
    onChange?: (params: { URI: Array<string>, file: Array<File> }) => void;
    /**
     * @description 上传列表的内建样式
     */
    listType?: 'transparent' | 'picture-card';
    /**
     * @description 是否支持多选文件 // 暂时没有实现
     */
    multiple?: boolean;
    /**
     * @description 上传的地址
     */
    action?: string;
    /**
     * @description 是否支持预览
     */
    preview?: boolean;
    /**
     * @description 无action时是否支持本地预览
     */
    fileReader?: boolean;
    /**
     * @description 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
     */
    beforeUpload?: (file: File) => boolean;
    /**
     * @description 限制尺寸大小
     * @example 144*144
     */
    imgSize?: string;
    /**
     * @description 文件格式限制
     * @example ['image/gif', 'image/jpg', 'image/png', 'image/bmp', 'image/jpeg']
     */
    fileExts?: string[];
}

export const Uploader: FC<IProps> = (props) => {
    const { maxSize = 2048, onChange, listType, multiple, action, fileReader, beforeUpload, fileExts, imgSize } = props;
    const size = imgSize ? imgSize.match(/\d+/g) : [];

    const [listURI, setListURI] = useState<Array<string>>([]);
    const [listFile, setListFile] = useState<Array<File>>([]);
    const fileRef = useRef() as React.RefObject<HTMLInputElement>;

    /**
     * 移除
     */
    const handleRemoveFile = (index: number) => {
        const newListUri = JSON.parse(JSON.stringify(listURI));
        const newListFile = JSON.parse(JSON.stringify(listFile));

        newListUri.splice(index, 1);
        newListFile.splice(index, 1);

        setListURI(newListUri);
        setListFile(newListFile);
    }

    // 点击预览 
    const handleSeeFile = (url: string) => {
        Modal.Alert({
            title: "照片",
            context: <img src={url} style={{ width: '100%' }} />,
            footer: true,
            mask: true
        })
    }
    const renderPicturecard = () => {
        const maskclassNames = classNames("wind-uploader-card-options", {
            'awind-uploader-card-mask': true
        })
        return (
            <div className="wind-upload-picture-card-wrapper">
                {
                    listURI.map((url: string, index: number) => (
                        <div className="wind-upload-list-picture-card-container" key={index}>
                            <img src={url} />
                            <div className={maskclassNames}>
                                <i className="iconfont" onClick={() => handleSeeFile(url)}>&#xe60a;</i>
                                <i className="iconfont" onClick={() => handleRemoveFile(index)}>&#xe601;</i>
                            </div>
                        </div>
                    ))
                }
                <div className="wind-uploader-picture-card">
                    <div className="wind-uploader-file">
                        <i className="iconfont">&#xe600;</i>
                    </div>
                    <input
                        className='wind-transparentwh'
                        type="file"
                        multiple={multiple}
                        ref={fileRef}
                        onChange={handleChaneg} />
                </div>
            </div>
        )
    }

    const renderTransparent = () => {
        return (
            <div className="wind-uploader-container">
                <input
                    className='wind-transparentwh'
                    type="file"
                    multiple={multiple}
                    ref={fileRef}
                    onChange={handleChaneg} />
                {props.children}
            </div>
        )
    }

    /**
     * 文件类型限制
     */
    const checkFileExt = (ext: string) => {
        if ((fileExts as string[]).indexOf(ext) === -1) {
            return false;
        }
        return true;
    }

    const checkSucc = (uri: string, file: File) => {
        setListURI(listURI.concat(uri));
        setListFile(listFile.concat(file))
        onChange && onChange({ URI: listURI.concat(uri), file: listFile.concat(file) });
        (fileRef.current as any).value = null;
    }

    /**
     * 尺寸大小限制
     */
    const imageLoad = (that: HTMLImageElement, URI: string, file: File) => {
        const width = (that as HTMLImageElement).width;
        const height = (that as HTMLImageElement).height;
        if (width > 144 || height > 144) {
            Toast.error('图片尺寸不符合规范,请重新上传');
            (fileRef.current as any).value = null;
        } else {
            checkSucc(URI, file);
        }
    }
    /**
     * 图片回显
     */
    const fileRenderLoad = (filerender: FileReader, file: File) => {
        var image = new Image();
        const URI = filerender.result as string;
        if (imgSize) {
            if ((size as Array<any>).length === 2) {
                // 图片大小等限制
                image.onload = imageLoad.bind(image, image, URI, file)
                image.src = URI;
            } else {
                Toast.error('文件尺寸设置有误,请重新设置');
            }
        } else {
            checkSucc(URI, file);
        }

    }

    const handleChaneg = (e: React.ChangeEvent<HTMLInputElement>) => {
        var file = (e.target as any).files[0];

        const fileSize = file.size / 1024;
        if (fileSize > maxSize) {
            Toast.error('文件超出指定大小,请重新上传');
            (fileRef.current as any).value = null;
            return;
        }

        if (fileExts && !checkFileExt(file.type)) {
            Toast.error('上传格式有误,请重新上传');
            (fileRef.current as any).value = null;
            return;
        }

        if (beforeUpload && !beforeUpload(file)) return;

        if (action) {
            /** 上传图片接口  后期结合axios在进行维护 */
        }

        // 文件预览、尺寸大小限制 
        if (listType === "picture-card" || fileReader || imgSize) {
            const filerender = new FileReader();
            filerender.onload = fileRenderLoad.bind(filerender, filerender, file);
            filerender.readAsDataURL(file)
            return;
        }



        setListFile(listFile.concat(file))
        onChange && onChange({ URI: [], file: listFile.concat(file) });
        (fileRef.current as any).value = null;


    }

    return (
        <Fragment>
            {
                listType === 'picture-card' ? renderPicturecard() : renderTransparent()
            }
        </Fragment>
    )
}
Uploader.defaultProps = {
    maxSize: 1024 * 2,
}

/**
 transparent:  文件、图片
 picture-card: 图片
 text:         文件
 */
export default Uploader;

