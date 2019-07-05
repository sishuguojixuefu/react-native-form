import React, { Component } from 'react'
import { View, StyleSheet, DeviceEventEmitter, ViewStyle } from 'react-native'
import { List, Provider } from '@sishuguojixuefu/antd-mobile-rn'
import { createForm } from 'rc-form'
import kindOf from 'kind-of'
import Rules from './utils/Rules'
import FormItem from './components'
import { FormItemPropsType } from './utils/PropTypes'
import getFieldDecorator from './utils/getFieldDecorator'

export interface Props {
  /**
   * 允许你设置 FormItms
   */
  items: FormItemPropsType[]
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
  form: any
  /**
   * 列表是否有上下边框
   */
  noBorder: boolean
  /**
   * 表单Change事件，可以用于和状态管理工具交互
   */
  onFormChange?: (id: string, value) => void
  style?: ViewStyle
}

class Form extends Component<Props, {}> {
  private values: object

  public constructor(props: Props) {
    super(props)
    this.values = {}

    const { items, form } = props
    const childs = this._getChilds()
    // 数据驱动
    if (items) {
      items.forEach(item => {
        if (item.props.defaultValue) {
          this.values[item.props.id] = item.props.defaultValue
        }
      })
    }
    // 业务驱动
    if (childs && childs.length) {
      childs.forEach((item: any) => {
        if (item.props.defaultValue) {
          this.values[item.props.id] = item.props.defaultValue
        }
        if (item.props.custom) {
          const { id, initialValue, required, rules, extraOption } = item.props
          this[id] = getFieldDecorator(form, id, initialValue, required, rules, extraOption)
        }
      })
    }
  }

  /**
   * 兼容单个child
   */
  private _getChilds = () => {
    const { children } = this.props
    let childs: any = children
    if (children && !children.length) {
      childs = [children]
    }
    return childs
  }

  /**
   * _onChange事件
   */
  private _onChange = (id: string, value: any) => {
    const { onFormChange } = this.props
    if (kindOf(value) === 'array' && value.length === 1) {
      this.values[id] = value[0]
    } else {
      this.values[id] = value
    }
    onFormChange && onFormChange(id, value)
    DeviceEventEmitter.emit('SsDynamicFormValueChanged', { values: this.values })
  }

  /**
   * 获取一个序列化后的values键值对象
   */
  public getValues = () => {
    return this.values
  }

  /**
   * 获取 items 允许传入的 ItemType
   */
  public getAllowedFormItemTypes = () => {
    return Object.keys(FormItem)
  }

  /**
   * 获取 items 允许传入的 rules
   */
  public getAllowedFormRules = () => {
    return Object.keys(Rules)
  }

  public render() {
    const { items, renderHeader, renderFooter, form, noBorder, style } = this.props
    const allowedFormItemTypes = this.getAllowedFormItemTypes()
    const childs = this._getChilds()
    return (
      <Provider>
        <List
          renderHeader={renderHeader}
          renderFooter={renderFooter}
          style={[styles.container, style]}
          noBorder={noBorder}
        >
          <View style={{ flex: 1 }}>
            {items && items.length
              ? items.map(item => {
                  if (allowedFormItemTypes.indexOf(item.componentName) >= 0) {
                    return React.createElement(FormItem[item.componentName], {
                      key: item.props.id,
                      form,
                      onChange: (value: any) => this._onChange(item.props.id, value),
                      ...item.props,
                    })
                  }
                  return null
                })
              : null}
            {childs && childs.length
              ? childs.map((item: any, index: number) => {
                  const child = React.cloneElement(item, {
                    key: item.props.id || index.toString(),
                    form,
                    id: item.props.id,
                    onChange: (value: any) => this._onChange(item.props.id, value),
                    ...item.props,
                  })
                  return item.props.custom ? this[item.props.id](child) : child
                })
              : null}
            <View style={{ height: noBorder ? 1 : 0 }} />
          </View>
        </List>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
})

export default createForm({})(Form)
