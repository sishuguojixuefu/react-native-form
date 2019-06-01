import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { List } from '@sishuguojixuefu/antd-mobile-rn'
import { createForm } from 'rc-form'
import kindOf from 'kind-of'
import Rules from './utils/Rules'
import FormItem from './components'
import { FormItemPropsType } from './utils/PropTypes'
import getFieldDecorator from './utils/getFieldDecorator'
import  {DeviceEventEmitter} from 'react-native';

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
}

class Form extends Component<Props, {}> {
  private values: object

  public constructor(props: Props) {
    super(props)
    this.values = {}

    const { items, form } = props
    const childs = this._getChilds()
    if (items) {
      items.forEach(item => {
        if (item.props.defaultValue) {
          this.values[item.props.id] = item.props.defaultValue
        }
      })
    }
    if (childs && childs.length) {
      childs.forEach((item: any) => {
        if (item.props.defaultValue) {
          this.values[item.props.id] = item.props.defaultValue
        }
        if (item.props.custom) {
          const { id, initialValue, required, rules } = item.props
          this[id] = getFieldDecorator(form, id, initialValue, required, rules)
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
    if (kindOf(value) === 'array' && value.length === 1) {
      this.values[id] = value[0]
    } else {
      this.values[id] = value
    }
    DeviceEventEmitter.emit('SsDynamicFormValueChanged',{values:this.values})
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
    const { items, renderHeader, renderFooter, form } = this.props
    const allowedFormItemTypes = this.getAllowedFormItemTypes()
    const childs = this._getChilds()
    return (
      <List renderHeader={renderHeader} renderFooter={renderFooter} style={styles.container}>
        <View>
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
            ? childs.map((item: any) => {
                const child = React.cloneElement(item, {
                  key: item.props.id,
                  form,
                  id: item.props.id,
                  onChange: (value: any) => this._onChange(item.props.id, value),
                  ...item.props,
                })
                return item.props.custom ? this[item.props.id](child) : child
              })
            : null}
        </View>
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

export { Rules }
export * from './components'
export default createForm({})(Form)
