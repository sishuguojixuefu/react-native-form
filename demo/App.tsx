import React, { Component } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Button, Provider as AntdProvider } from '@sishuguojixuefu/antd-mobile-rn'
// import Form, { Input, NumberInput, SsSelect } from '@sishuguojixuefu/react-native-form'
import Form, { SsDateRange, SsAmount, SsDescription, SsRating, SsImagePicker,SsCalculate} from './src'

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

  private changeValue = ()=>{
    this.refs.calref.refresh()
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
            keyboardShouldPersistTaps="handled" // http://t.cn/EowE3r3
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
              <SsDateRange id="ChooseDateRange_1" label={['开始时间', '结束时间']} required />
              <SsAmount id="SsAmount_1" label="请输入金额" defaultValue={13}/>
              <SsAmount id="SsAmount_2" label="请输入金额2"  defaultValue={12}/>
              <SsDescription id="SsDescription" label="真的超级超级长唱唱唱" />
              <SsRating id="SsRating" label="评分" required defaultValue={4} />
              <SsImagePicker id="SsImagePicker" label="上传图片" required />
              <SsCalculate id='SsCalculate' label='总计'
                formula={[{id:'SsAmount_1'},'+',{id:'SsAmount_2'}]} ref='calref'/>
              {/* <Form items={appSchema.items} wrappedComponentRef={this.onFormRef} ref={this.onRcFormRef}>
              <Picker
                data={[{ label: '猫', value: '猫' }, { label: '狗', value: '狗' }]}
                cols={1}
                id="pet"
                initialValue="猫"
              >
                <List.Item arrow="horizontal">宠物</List.Item>
              </Picker>
            </Form> */}
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
