import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { SsAmountProps } from '../utils/PropTypes'
import getFieldDecorator from '../utils/getFieldDecorator'
import Label from './helper/Label'
import ErrorTip from './helper/ErrorTip'

export default class SsCalculateView extends Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    title: PropTypes.string,
    placeholder: PropTypes.string,
  }

  constructor(props: Readonly<{}>) {
    super(props)
  }

  render() {
    return <View />
  }
}

export class SsCalculate extends Component<SsAmountProps, {}> {
  private fieldDecorator: any

  private static defaultProps = {
    required: false,
    placeholder: '请输入',
    textAlign: 'right',
    upper: true,
  }

  public componentWillMount() {
    const { form, id, defaultValue, rules, required } = this.props

    this.fieldDecorator = getFieldDecorator(form, id, defaultValue)
  }

  public render() {
    const { placeholder, label, form, id } = this.props
    return (
      <ErrorTip error={form.getFieldError(id)}>
        {this.fieldDecorator(<SsCalculateView title={label} placeholder={placeholder} value={8} />)}
      </ErrorTip>
    )
  }
}
