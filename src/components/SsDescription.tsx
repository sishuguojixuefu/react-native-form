import React, { Component } from 'react'
import { Text } from 'react-native'
import { SsDescriptionPropsType } from '../utils/PropTypes'

export default class SsDescription extends Component<SsDescriptionPropsType, {}> {
  render() {
    const { initialValue } = this.props
    return (
      <Text style={{ color: '#888888', fontSize: 12, marginHorizontal: 20, marginVertical: 8 }}>{initialValue}</Text>
    )
  }
}
