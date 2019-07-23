import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  error: string
  children: JSX.Element | JSX.Element[]
  last?: boolean
}

class ErrorTip extends Component<Props> {
  render() {
    const { children, error, last } = this.props
    return (
      <View style={!last && styles.container}>
        {children}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    includeFontPadding: true,
    marginLeft: 15,
    paddingBottom: 6,
    textAlignVertical: 'center',
  },
})

export default ErrorTip
