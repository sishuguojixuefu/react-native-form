import { ViewStyle } from 'react-native'
import { FormItemPropsType } from './PropTypes'

export default interface FormPropsType {
  /**
   * 允许你设置 FormItms
   */
  items: FormItemPropsType[]
  /**
   * 列表是否有上下边框
   */
  noBorder: boolean
  /**
   * 允许你设置任意 children
   */
  children?: React.ReactElement[]
  /**
   * list header
   */
  renderHeader?: (() => React.ReactType) | string | JSX.Element
  /**
   * list footer
   */
  renderFooter?: (() => React.ReactType) | string | JSX.Element
  /**
   * rc-form传入，rc-form没有类型声明文件
   */
  form?: any
  /**
   * 表单Change事件，可以用于和状态管理工具交互
   */
  onChange?: (id: string, value) => void
  style?: ViewStyle
}
