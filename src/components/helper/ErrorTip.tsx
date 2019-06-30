import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  error: string
  children: JSX.Element | JSX.Element[]
}

class ErrorTip extends Component<Props> {
  public render() {
    const { children, error } = this.props
    return (
      <View style={styles.container}>
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
