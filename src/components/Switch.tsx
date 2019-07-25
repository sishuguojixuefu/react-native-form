import React, { Component } from 'react'
import { List, Switch } from '@sishuguojixuefu/antd-mobile-rn'
import { SwitchPropsType } from '../utils/PropTypes'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import ErrorTip from './helper/ErrorTip'

interface Props {
  label: string
  required?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
}

class SwitchItem extends Component<Props, any> {
  static defaultProps = {
    required: false,
    checked: false,
  }

  render() {
    const { label, required, checked, onChange } = this.props
    return (
      <List.Item {...this.props} extra={<Switch checked={checked} onChange={onChange} />} last>
        <Label label={label} required={required} />
      </List.Item>
    )
  }
}

export default class Input extends Component<SwitchPropsType, any> {
  private fieldDecorator: any
  static defaultProps = {
    required: false,
    last: false,
  }

  componentWillMount() {
    const { form, id, initialValue, rules } = this.props
    const defaultStrValue = initialValue && initialValue.toString()
    this.fieldDecorator = getFieldDecorator(form, id, defaultStrValue, rules, { valuePropName: 'checked' })
  }

  private _onChange = (checked: boolean) => {
    const { onChange } = this.props
    onChange && onChange(checked)
  }

  render() {
    const { label, required, form, id, last } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)} last={last}>
        {this.fieldDecorator(<SwitchItem label={label} required={required} onChange={this._onChange} />)}
      </ErrorTip>
    )
  }
}
