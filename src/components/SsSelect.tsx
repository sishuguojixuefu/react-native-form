import React, { Component } from 'react'
import { List, Picker } from '@sishuguojixuefu/antd-mobile-rn'
// @ts-ignore
// import { Picker } from 'antd-mobile-rn'
import { SsSelectPropsType } from '../utils/PropTypes'
import ErrorTip from './helper/ErrorTip'
import Label from './helper/Label'
import getFieldDecorator from '../utils/getFieldDecorator'

const { Item } = List

export default class SsSelect extends Component<SsSelectPropsType, {}> {
  private fieldDecorator: any
  static defaultProps = {
    required: false,
    placeholder: '请输入',
    cols: 1,
  }

  componentWillMount() {
    const { form, id, initialValue, rules } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, initialValue && [initialValue], rules)
  }

  private _onChange = (value?: React.ReactText[]): void => {
    const { onChange } = this.props
    onChange && onChange(value)
  }

  private _getData = () => {
    const { options, cols } = this.props
    if (cols === 1) {
      return options.map((item: any) => {
        return {
          label: item.label || item,
          value: item.value || item,
        }
      })
    }
    return options
  }

  render() {
    const { icon, placeholder, label, required, form, id, cols, last } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)} last={last}>
        {this.fieldDecorator(
          <Picker {...this.props} cols={cols} onChange={this._onChange} extra={placeholder} data={this._getData()}>
            <Item arrow="horizontal" style={{ paddingLeft: 0 }} last wrap>
              <Label required={required} label={label} icon={icon} />
            </Item>
          </Picker>
        )}
      </ErrorTip>
    )
  }
}
