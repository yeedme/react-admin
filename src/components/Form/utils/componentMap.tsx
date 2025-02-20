import type { IComponentType, IFormList } from '#/form'
import { initCompProps } from './helper'
import {
  Input,
  InputNumber,
  AutoComplete,
  Select,
  TreeSelect,
  Checkbox,
  Radio,
  Switch,
  Rate,
  Slider,
  Upload
} from 'antd'
import ApiSelect from '@/components/Selects/ApiSelect'
import ApiTreeSelect from '@/components/Selects/ApiTreeSelect'
import BasicDatePicker from '@/components/Dates/BasicDatePicker'
import BasicRangePicker from '@/components/Dates/BasicRangePicker'
import BasicTimePicker from '@/components/Dates/BasicTimePicker'
import BasicTimeRangePicker from '@/components/Dates/BasicTimeRangePicker'
import PasswordStrength from '@/components/PasswordStrength'
import { CreateBusiness } from '@/components/Business'

const componentMap = new Map()

// antd组件注入
componentMap.set('Input', Input)
componentMap.set('InputNumber', InputNumber)
componentMap.set('InputPassword', Input.Password)
componentMap.set('AutoComplete', AutoComplete)
componentMap.set('Select', Select)
componentMap.set('TreeSelect', TreeSelect)
componentMap.set('Checkbox', Checkbox)
componentMap.set('CheckboxGroup', Checkbox.Group)
componentMap.set('RadioGroup', Radio.Group)
componentMap.set('Switch', Switch)
componentMap.set('Rate', Rate)
componentMap.set('Slider', Slider)
componentMap.set('Upload', Upload)
componentMap.set('DatePicker', BasicDatePicker)
componentMap.set('RangePicker', BasicRangePicker)
componentMap.set('TimePicker', BasicTimePicker)
componentMap.set('TimeRangePicker', BasicTimeRangePicker)
componentMap.set('ApiSelect', ApiSelect)
componentMap.set('ApiTreeSelect', ApiTreeSelect)
componentMap.set('PasswordStrength', PasswordStrength)

// 业务组件注入
CreateBusiness()

/**
 * 获取组件
 * @param item - 表单项
 */
export function getComponent(item: IFormList) {
  const { component, componentProps } = item
  const Comp = componentMap.get(component)

  return (
    <Comp
      {...initCompProps(component)}
      {...componentProps}
    />
  )
}

/**
 * 添加组件
 * @param name - 组件名
 * @param component - 组件
 */
export function addComponent(name: IComponentType, component: unknown): void {
  componentMap.set(name, component)
}

/**
 * 删除组件
 * @param name - 组件名
 */
export function deleteComponent(name: IComponentType): void {
  componentMap.delete(name)
}
