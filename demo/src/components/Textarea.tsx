import React, { Component } from 'react'
import { TextareaItem } from '@sishuguojixuefu/antd-mobile-rn'
import omit from 'lodash.omit'
import { TextareaPropsType } from '../utils/PropTypes'
import getFieldDecorator from '../utils/getFieldDecorator'
import TextareaWrap from './helper/TextareaWrap'

export default class Textarea extends Component<TextareaPropsType, {}> {
  private fieldDecorator: any
  private inputed = 0
  private static defaultProps = {
    required: false,
    placeholder: '请输入',
    count: 0,
  }

  public componentWillMount() {
    const { form, id, defaultValue, rules, required } = this.props
    this.inputed = defaultValue ? defaultValue.length : 0
    this.fieldDecorator = getFieldDecorator(form, id, defaultValue, required, rules)
  }

  private _onChange = (value?: string) => {
    const { onChange } = this.props
    this.inputed = value ? value.length : 0
    onChange(value)
  }

  public render() {
    const { placeholder, label, required, form, id, count } = this.props
    const omitDefaultValueProps = omit(this.props, ['defaultValue', 'error', 'labelNumber'])
    return (
      <TextareaWrap
        error={form.getFieldError(id)}
        label={label}
        required={required}
        count={count} // 计数功能,兼具最大长度,默认为0,代表不开启计数功能
        inputed={this.inputed}
      >
        {this.fieldDecorator(
          <TextareaItem
            {...omitDefaultValueProps}
            last
            clear // 注意：antd没有实现label、没有实现安卓的clear
            autoHeight
            style={{ marginHorizontal: 15, paddingHorizontal: 0 }}
            count={count}
            placeholder={placeholder}
            onChange={this._onChange}
          />
        )}
      </TextareaWrap>
    )
  }
}
