import React, { Component } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'

interface Props {
  required?: boolean
  label: string
}

class Label extends Component<Props> {
  public static defaultProps = {
    required: false,
    label: '',
  }

  public render() {
    const { required, label } = this.props
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../../../images/required.png')}
          style={{ width: 9, height: required ? 9 : 0, marginHorizontal: 3 }}
        />
        <Text style={styles.text}>{label}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 17,
    textAlignVertical: 'center',
  },
})

export default Label
