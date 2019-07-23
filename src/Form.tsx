import React, { Component } from 'react'
import { View, StyleSheet, DeviceEventEmitter } from 'react-native'
import { List } from '@sishuguojixuefu/antd-mobile-rn'
import { createForm } from 'rc-form'
import kindOf from 'kind-of'
import Rules from './utils/Rules'
import FormItem from './components'
import FormPropsType from './utils/FormPropsType'
import getFieldDecorator from './utils/getFieldDecorator'

class Form extends Component<FormPropsType, {}> {
  static defaultProps = {
    noBorder: true,
  }

  private values: object

  constructor(props: FormPropsType) {
    super(props)
    this.values = {}
    // 数据驱动
    if (props.items) {
      props.items.forEach(item => {
        if (item.props.defaultValue) {
          this.values[item.props.id] = item.props.defaultValue
        }
      })
    }
    // 业务驱动
    const childs = this._getChilds()
    if (childs && childs.length) {
      childs.forEach((item: any) => {
        if (item.props.defaultValue) {
          this.values[item.props.id] = item.props.defaultValue
        }
        if (item.props.custom) {
          const { id, initialValue, required, rules } = item.props
          this[id] = getFieldDecorator(props.form, id, initialValue, required, rules)
        }
      })
    }
  }

  // 兼容单个child
  private _getChilds = () => {
    const { children } = this.props
    let childs: any = children
    if (children && !children.length) {
      childs = [children]
    }
    return childs
  }

  private _onChange = (id: string, value: any) => {
    const { onChange } = this.props
    if (kindOf(value) === 'array' && value.length === 1) {
      this.values[id] = value[0]
    } else {
      this.values[id] = value
    }
    onChange && onChange(id, value)
    DeviceEventEmitter.emit('SsDynamicFormValueChanged', { values: this.values })
  }

  /**
   * 获取一个序列化后的 values 键值对象
   */
  getValues = () => {
    return this.values
  }

  /**
   * 获取 items 允许传入的 ItemType
   */
  getAllowedFormItemTypes = () => {
    return Object.keys(FormItem)
  }

  /**
   * 获取 items 允许传入的 rules
   */
  getAllowedFormRules = () => {
    return Object.keys(Rules)
  }

  render() {
    const { items, renderHeader, renderFooter, form, noBorder, style } = this.props
    const allowedFormItemTypes = this.getAllowedFormItemTypes()
    const childs = this._getChilds()
    return (
      <List
        renderHeader={renderHeader}
        renderFooter={renderFooter}
        style={[styles.container, style]}
        noBorder={noBorder}
      >
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
      </List>
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
