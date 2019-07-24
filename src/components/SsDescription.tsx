import React, { Component } from 'react'
import { Text } from 'react-native'
import { SsDescriptionPropsType } from '../utils/PropTypes'
import ErrorTip from './helper/ErrorTip'
import getFieldDecorator from '../utils/getFieldDecorator'

export default class SsDescription extends Component<SsDescriptionPropsType, {}> {
  private fieldDecorator: any

  componentWillMount() {
    const { form, id, initialValue, rules } = this.props
    this.fieldDecorator = getFieldDecorator(form, id, initialValue, rules)
  }

  render() {
    const { label, form, id } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(
          <Text style={{ color: '#888888', fontSize: 12, marginHorizontal: 20, marginVertical: 8 }}>{label}</Text>
        )}
      </ErrorTip>
    )
  }
}
