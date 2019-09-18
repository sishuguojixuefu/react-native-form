import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import { Button, Toast, Portal } from '@sishuguojixuefu/antd-mobile-rn'
import Form, { Input, NumberInput, SsSelect, Rules } from '@sishuguojixuefu/react-native-form'
import SplashScreen from 'react-native-splash-screen'
import BaseScreen, { BaseScreenProps } from '~/screens/BaseScreen'
import theme from '~/theme'
import NavigationService from '~/utils/NavigationService'

class Store {
  form: any

  @action onSubmit = () => {
    this.form.validateFields(async (error, values) => {
      if (error) {
        return
      }
      const loading = Toast.loading('提交中...', 0)
      try {
        // 对请求参数进行处理
        const jsonParams = { ...values }
        // await API(jsonParams)
        Toast.success('提交成功', 2, () => {
          // 提交成功后的逻辑
          NavigationService.goBack()
        })
      } catch (e) {
        console.log('FormInfo:', error)
      } finally {
        Portal.remove(loading)
      }
    })
  }

  onFormRef = ref => {
    if (ref) {
      this.form = ref.props.form
    }
  }
}

@observer
class FormScreen extends BaseScreen<BaseScreenProps, any> {
  store: Store
  constructor(props: BaseScreenProps) {
    super(props)
    this.store = new Store()
    SplashScreen.hide()
  }

  render() {
    const { onFormRef, onSubmit } = this.store
    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled" // http://t.cn/EowE3r3
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Form wrappedaComponentRef={onFormRef}>
          <Input
            id="username"
            label="姓名"
            placeholder="请输入姓名"
            required
            rules={[
              {
                required: true,
                message: '姓名不能为空',
              },
            ]}
          />
          <Input
            id="phonenumber"
            label="联系方式"
            rules={[
              { message: '联系方式格式不正确', pattern: Rules.phone },
              { required: true, message: '联系方式不能为空' },
            ]}
          />
          <NumberInput id="age" label="请输入年龄" last />
          <SsSelect label="人员规模" id="staffSize" placeholder="请选择" options={[{ label: '1', value: '1' }]} />
        </Form>
        <Button
          type="primary"
          size="large"
          style={{ marginTop: 40, marginHorizontal: 20, borderRadius: 20, height: 40 }}
          onPress={onSubmit}
        >
          提交表单
        </Button>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.fill_body,
    flex: 1,
  },
})

export default FormScreen
