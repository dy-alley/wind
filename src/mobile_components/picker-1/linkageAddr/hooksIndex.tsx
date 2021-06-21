/*
 * @Author: alley
 * @Description: 
 * @Date: 2021-05-12 15:48:09
 * @LastEditors: alley
 * @LastEditTime: 2021-05-18 16:12:05
 */
import React, { FC, useState, useEffect } from 'react';
// import LinkBase from '../linkageBase';
import LinkBase from '../linkageBase/hooksIndex';
import { provList, cityList, areaList } from './js/metadata.js';
import { IProps } from './conf';

export const PickerAddr: FC<IProps> = (props) => {
  const [list, setList] = useState([provList, cityList, areaList]);
  const [linageData, setLinkAgeData] = useState([]) as any[];
  const [lastIndex, setLastIndex] = useState('');
  const { value, visible } = props;

  const init = () => {
    if (value.length === 0) return;
    const [province, city, area] = value;
    
    const provinceValue = provList.find((item:any)=>item.value === province)
    
    if(!provinceValue)return;

    const cityValue = provinceValue.pro_cities.find((item:any)=>item.value === city)
    
    if(!cityValue)return;

    const areaValue = cityValue.city_areas.find((item:any)=>item.value === area)
    if(!areaValue)return;
    
    
    setList([provList, provinceValue.pro_cities, cityValue.city_areas])
  }

  useEffect(() => {
    init()
  }, [])

  const touchEndCb = (e: any) => {
    const { which, meta, index, bool } = e;
    const str = String(index);
    if (!bool) return;


    if (which === 0) {
      // 说明移动的是省，因此更新 市、县
      let citys = meta[0].pro_cities; // 获取省下面所有的市
      let areas = citys[0].city_areas; // 获取市下面所有的县
      let cityVal = citys[0].value; // 获取第一个市
      let areaVal = areas[0].value; // 获取第一个县

      if (lastIndex !== str) {
        setList([list[0], citys, areas])
        // 因为只动的省 所以更新市 县
        setLinkAgeData([null, cityVal, areaVal])
      }

    } else if (which === 1) {
      // 移动的是市
      let areas = meta[1].city_areas; // 获取市下面所有的县
      const areaVal = areas[0].value;

      if (lastIndex !== str) {
        setList([list[0], list[1], areas])
        // 因为只动的省 所以更新市 县
        setLinkAgeData([null, null, areaVal])
      }
    }
    setLastIndex(str)
  }



  return (
    <LinkBase
      visible={visible}
      data={list}
      linkageData={linageData}
      value={value}
      onTouchEnd={touchEndCb}
      onOk={(value)=>{
        console.log(value,"value");
      }}
      onDismiss={()=>{

      }}
    />
  )
}

PickerAddr.defaultProps = {
  title: '标题',
  /**
   * @description 数据源
   */
  data: [],
  /**
   * @description 格式是[value1, value2, value3], 对应数据源的相应级层 value
   */
  value: [],
  /**
   * @description 选中的文案
   * @default 确定
   */
  okText: '确定',
  /**
   * @description 取消选中的文案
   * @default 取消
   */
  dismissText: '取消',
  /**
   * @description 点击选中时执行的回调
   */
  onOk: () => { },
  /**
   * @description 点击取消时执行的回调
   */
  onDismiss: () => { },
  /**
   * @description 显示、隐藏
   */
  visible: false,
  /**
   * 联动数据
   */

}

export default PickerAddr;