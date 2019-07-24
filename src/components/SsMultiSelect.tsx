import React, { Component } from 'react'
import { SsSelectPropsType } from '../utils/PropTypes'
import ErrorTip from './helper/ErrorTip'
import MultiSelectView from './SSMultiSelectView'
import getFieldDecorator from '../utils/getFieldDecorator'

export default class SsMultiSelect extends Component<SsSelectPropsType, {}> {
  private fieldDecorator: any
  static defaultProps = {
    required: false,
    placeholder: '请输入',
  }

  componentWillMount() {
    const { form, id, initialValue, rules } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, initialValue && [initialValue], rules)
  }

  render() {
    const { label, required, form, id, onChange, options } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          <MultiSelectView label={label} required={required} onChange={onChange} options={options} />
        )}
      </ErrorTip>
    )
  }
}
