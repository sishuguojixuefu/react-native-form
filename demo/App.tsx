import React, { Component } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Button, Provider as AntdProvider } from '@sishuguojixuefu/antd-mobile-rn'
import Form, { SsImagePicker, SsDropDown } from '@sishuguojixuefu/react-native-form'
// import Form, { SsImagePicker, SsDropDown } from './src'

import appSchema from './json/appSchema'

class App extends Component {
  public form: any
  public RcForm: any

  public onRcFormRef = ref => {
    if (ref) {
      this.RcForm = ref
    }
  }

  public onFormRef = ref => {
    if (ref) {
      this.form = ref
    }
  }

  public onSubmit = () => {
    this.RcForm.validateFields(error => {
      if (error) return
      const values = this.form.getValues()
      console.log('values:', values)
    })
  }

  public render() {
    return (
      <AntdProvider>
        <View style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Form
              items={appSchema.items}
              // customItems={customItems}
              wrappedComponentRef={this.onFormRef}
              ref={this.onRcFormRef}
            >
              <SsDropDown
                id="SsMultiSelect"
                options={['a', 'b', 'c', 'd', 'f', 'g', 'v', 'x']}
                label="最喜欢的明星"
                required
                multiple
              />
              <SsDropDown
                id="SsMultiSelectsdsd"
                options={['a', 'b', 'c', 'd', 'f', 'g', 'v', 'x']}
                label="最喜欢的明星"
                required
                multiple={false}
              />
              <SsImagePicker id="SsImagePicker_2" label="选择图片" required />

              {/* <SsDateRange id="ChooseDateRange_1" label={['开始时间', '结束时间']} required />
              <SsAmount id="SsAmount_1" label="请输入金额" />
              <SsDescription id="SsDescription" label="真的超级超级长唱唱唱" />
              <SsRating id="SsRating" label="评分" required />
              <SsImagePicker id="SsImagePicker" label="上传图片" required /> */}
            </Form>
          </ScrollView>
        </View>
        <View style={styles.confirmBtn}>
          <Button type="primary" onPress={this.onSubmit}>
            提交
          </Button>
        </View>
      </AntdProvider>
    )
  }
}

const styles = StyleSheet.create({
  confirmBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
  },
})

export default App
