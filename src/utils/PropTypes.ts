import { KeyboardTypeOptions, ImageSourcePropType } from 'react-native'

export declare type TextAreaEventHandle = (val?: string) => void

/**
 * 正则规则类型定义
 */
export interface RulePatternPropsType {
  pattern?: RegExp
  message?: string
}

/**
 * 正则规则类型定义
 */
export interface RuleRequiredPropsType {
  required?: boolean
  message?: string
}

/**
 * 正则函数类型定义
 */
export interface RuleValidatorPropsType {
  pattern?: RegExp
  validator?: boolean
  message?: string
}

/**
 * 正则自定义规则类型定义
 */
export interface RuleMessagePropsType {
  type:
    | 'zip'
    | 'email'
    | 'zh'
    | 'zhName'
    | 'url'
    | 'phone'
    | 'mobilePhone'
    | 'telephone'
    | 'idCard'
    | 'money'
    | 'date'
    | 'number'
    | 'integer'
    | 'floating'
    | 'twoTimes'
    | 'threeTimes'
    | 'fourTimes'
    | 'fiveTimes'
  message?: string
}

export declare type RulePropsType = (
  | string
  | RulePatternPropsType
  | RuleRequiredPropsType
  | RuleMessagePropsType
  | RuleValidatorPropsType)[]

/**
 * FormItems属性的类型定义
 */
export interface FormItemPropsType {
  componentName: string
  props: FormItemOptionPropsType
}

/**
 * FormItem 类型定义
 */
export interface FormItemOptionPropsType {
  name?: string // 组件名
  id: string // id
  placeholder?: string // 备注
  initialValue?: string // 初始值
  required?: boolean // 是否必要
  rules?: RulePropsType // 规则
  form?: any
}

/**
 * SsDescription组件PropsType
 */
export interface SsDescriptionPropsType {
  name?: string // 组件名
  id: string // id
  initialValue?: string // 初始值
  icon?: string
}

/**
 * Input组件PropsType
 */
export interface SwitchPropsType extends FormItemOptionPropsType {
  label: string // 标签
  onChange?: (checked: boolean) => void
  last?: boolean
}

/**
 * Input组件PropsType
 */
export interface InputPropsType extends FormItemOptionPropsType {
  clear?: boolean
  icon?: ImageSourcePropType
  label: string // 标签
  onChange?: (value: string) => void
  type?: 'text' | 'bankCard' | 'phone' | 'password' | 'number' | 'digit' | KeyboardTypeOptions // 类型
  textAlign?: 'left' | 'center' | 'right'
  extra?: React.ReactNode
  maxLength?: number
  last?: boolean
  multiline?: boolean
  height?: number
}

/**
 * Textarea组件PropsType
 */
export interface TextareaPropsType extends FormItemOptionPropsType {
  label: string // 标签
  onChange?: TextAreaEventHandle
  count?: number // 计数功能,兼具最大长度,默认为0,代表不开启计数功能
  last?: boolean
}

/**
 * SsSelect组件PropsType
 */
export interface SsSelectPropsType extends FormItemOptionPropsType {
  icon?: ImageSourcePropType
  label: string // 标签
  onChange?: (value?: React.ReactText[]) => void
  options: ({ label: string; value: string } | string)[] // 选项
  cols?: number // 列数
  last?: boolean
}

/**
 * SsMultiSelect组件PropsType
 */
export interface SsMultiSelectPropsType extends FormItemOptionPropsType {
  label: string // 标签
  onChange?: (value?: React.ReactText[]) => void // onChange事件
  options: ({ label: string; value: string } | string)[] // 选项
}

/**
 * SsDropDown组件PropsType
 */
export interface SsDropDownPropsType extends FormItemOptionPropsType {
  icon?: ImageSourcePropType
  label: string // 标签
  onChange?: (value?: React.ReactText[]) => void // onChange事件
  options: ({ label: string; value: string } | string)[] // 选项
  multiple: boolean
}

/**
 * SsDate组件PropsType
 */
export interface SsDateProps extends FormItemOptionPropsType {
  label: string // 标签
  onChange?: (value: Date) => void
  type: 'year' | 'month' | 'date' | 'datetime' | 'time'
  minDate: Date
  maxDate: Date
}

/**
 * SsDateRange组件PropsType
 */
export interface SsDateRangeProps {
  name?: string // 组件名
  id: string[] // id
  placeholder?: string[] // 备注
  initialValue?: string[] // 初始值
  required?: boolean // 是否必要
  rules?: RulePropsType // 规则
  form?: any
  label: string[] // 标签
  onChange?: (value: Date | Date[]) => void
}

/**
 * SsAmount组件PropsType
 */
export interface SsAmountProps extends InputPropsType {
  upper?: boolean // 是否显示大写
}

export interface RatingProps {
  form?: any
  id: string
  label: string
  rules?: RulePropsType // 规则
  allowHalf?: boolean
  onChange?: (value: number) => void
  initialValue: number
  required?: boolean
}

export interface ImagePickerProps extends FormItemOptionPropsType {
  label: string
  onChange?: (value: any[]) => void
}

export interface LocationProps extends FormItemOptionPropsType {
  label: string
  onChange?: (value: any) => void
}

export interface CalculateProps extends FormItemOptionPropsType {
  label: string
  formula: any[]
  onChange?: (value: any) => void
}
