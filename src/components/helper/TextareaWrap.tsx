import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

interface Props {
  error: string
  children: JSX.Element
  required: boolean | undefined
  label: string
  count?: number
  inputed: number
  last: boolean
}

export default class TextareaWrap extends Component<Props, {}> {
  render() {
    const { required, label, children, error, count, inputed, last } = this.props
    return (
      <View style={last && styles.container}>
        <View style={styles.label}>
          <Image
            source={require('../../../images/required.png')}
            style={{ width: 9, height: required ? 9 : 0, marginHorizontal: 3 }}
          />
          <Text style={styles.labelText}>{label}</Text>
          <Text style={styles.count}>{count ? `${inputed} / ${count}` : ''}</Text>
        </View>
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
  count: {
    flex: 1,
    textAlign: 'right',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    includeFontPadding: true,
    marginLeft: 15,
    paddingBottom: 6,
    textAlignVertical: 'center',
  },
  label: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingRight: 15,
    paddingTop: 6,
  },
  labelText: {
    color: '#000000',
    fontSize: 17,
    textAlignVertical: 'center',
  },
})
