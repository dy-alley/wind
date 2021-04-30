/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-02-05 11:38:36
 * @LastEditors: alley
 * @LastEditTime: 2021-04-19 17:10:32
 */
declare module "*.md" {
    const content: string;
    export default content;
}

declare module '*.css' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames
    export = classNames;
}

declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames
    export = classNames;
}