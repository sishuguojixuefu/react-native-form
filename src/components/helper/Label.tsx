import React, { Component } from 'react'
import { StyleSheet, Text, Image, View, ImageSourcePropType } from 'react-native'

interface Props {
  required?: boolean
  icon?: ImageSourcePropType
  label?: string
}

class Label extends Component<Props> {
  static defaultProps = {
    required: false,
    label: '',
  }

  render() {
    const { required, icon, label } = this.props
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../../../images/required.png')}
          style={{ width: 9, height: required ? 9 : 0, marginHorizontal: 3 }}
        />
        {icon && <Image source={icon} style={{ width: 30, height: 30, marginHorizontal: 3 }} />}
        {!icon && label && <Text style={styles.text}>{label}</Text>}
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
