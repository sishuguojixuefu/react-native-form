import React, { Component } from 'react'
import { View, StyleSheet, DeviceEventEmitter } from 'react-native'
import { List } from '@sishuguojixuefu/antd-mobile-rn'
import { createForm } from 'rc-form'
import FormItem from './components'
import FormPropsType from './utils/FormPropsType'
import getFieldDecorator from './utils/getFieldDecorator'

class Form extends Component<FormPropsType, any> {
  static defaultProps = {
    noBorder: true,
  }

  constructor(props: FormPropsType) {
    super(props)
    // 业务驱动
    const childs = this._getChilds()
    if (childs && childs.length) {
      childs.forEach((item: any) => {
        if (item.props.custom) {
          const { id, initialValue, rules } = item.props
          this[id] = getFieldDecorator(props.form, id, initialValue, rules, props.options)
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
    onChange && onChange(id, value)
    DeviceEventEmitter.emit('SsDynamicFormValueChanged', {
      values: this.props.form.getFieldsValue(),
    })
  }

  render() {
    const { items, renderHeader, renderFooter, form, noBorder, style } = this.props
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
              if (Object.keys(FormItem).indexOf(item.componentName) >= 0) {
                return React.createElement(FormItem[item.componentName], {
                  key: item.props.id,
                  form,
                  onChange: value => this._onChange(item.props.id, value),
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
                onChange: value => this._onChange(item.props.id, value),
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
