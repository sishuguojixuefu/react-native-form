import React, { Component } from 'react'
import { InputItem } from '@sishuguojixuefu/antd-mobile-rn'
import stringWidth from 'string-width'
import omit from 'lodash.omit'
import { InputPropsType } from '../utils/PropTypes'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import ErrorTip from './helper/ErrorTip'

export default class Input extends Component<InputPropsType, {}> {
  private fieldDecorator: any
  public static defaultProps = {
    required: false,
    placeholder: '请输入',
    textAlign: 'right',
  }

  public componentWillMount() {
    const { form, id, defaultValue, required, rules } = this.props
    const defaultStrValue = defaultValue && defaultValue.toString()
    this.fieldDecorator = getFieldDecorator(form, id, defaultStrValue, required, rules)
  }

  private _onChange = (value: string) => {
    const { onChange } = this.props
    onChange(value)
  }

  public render() {
    const { placeholder, label, required, form, id, textAlign } = this.props
    const omitDefaultValueProps = omit(this.props, ['defaultValue', 'error', 'labelNumber'])
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          <InputItem
            {...omitDefaultValueProps}
            last
            clear
            style={{ marginLeft: 5 }}
            itemStyle={{ marginLeft: 0 }}
            textAlign={textAlign}
            onChange={this._onChange}
            labelNumber={label ? stringWidth(label) / 2 + 1 : 0}
            placeholder={placeholder}
          >
            <Label label={label} required={required} />
          </InputItem>
        )}
      </ErrorTip>
    )
  }
}
