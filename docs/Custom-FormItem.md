```js
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'

export interface Props {
  id: string;
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  rules?: any;
  required?: boolean
  form?: any;
  custom: boolean;
}

@observer
class CustomFormItem extends Component<Props, any> {
  static defaultProps = {
    custom: true,
    required: false
  }

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> ParentTagSelect </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CustomFormItem
```
