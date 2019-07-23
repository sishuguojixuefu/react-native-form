# @sishuguojixuefu/react-native-form

> 私塾动态表单项目

## 特性

- 根据特定的领域模型，自动匹配 Form 表单组件，自动映射数据
- 基于 `rc-form` 实现自动表单校验
- 支持以 `children` 的形式扩展组件

## 安装

> 如果要使用内置的组件，请确保安装并配置了 @sishuguojixuefu/antd-mobile-rn

```sh
$ yarn add @sishuguojixuefu/react-native-form
```

## API

### 属性

| 属性                | 说明                                                  | 类型                    | 默认值 |
| ------------------- | ----------------------------------------------------- | ----------------------- | ------ |
| items               | 动态表单渲染的依据，结构需严格遵守 FormItemsPropsType | `FormOptionPropsType[]` | -      |
| wrappedComponentRef | `wrappedComponentRef={ref => {this.formRef = ref}}`   | Function                | -      |
| ref                 | ref={ref => {this.rcFormRef = ref}}                   | Function                | -      |
| noBorder            | 是否显示 border                                       | boolean                 | true   |

#### 低级方法

> 注意：getValues 方法返回的是未序列化的对象，但是一般网络请求库都会自动序列化参数。

| this.formRef.getValues | 获取一个由 values 组成的对象 | `(): void` | - |
| this.formRef.getAllowedFormItemTypes | 获取 items 允许传入的组件类型 | `(): arrary` | - |
| this.formRef.getAllowedFormRules | 获取 items 允许传入的 rules | `(): arrary` | - |

## 使用

### 使用完全自定义的组件

```tsx
import React, { Component } from 'react'
...
export default class HelloWorldApp extends Component {
  store: Store
  form: any
  RcForm: any
  onRcFormRef = ref => {
    if (ref) {
      this.RcForm = ref
    }
  }

  onFormRef = ref => {
    if (ref) {
      this.form = ref
    }
  }

  onLogin = () => {
    this.RcForm.validateFields(error => {
      if (error) {
        console.warn(error)
        return
      }
      const values = this.form.getValues()
      console.log('values:', values)
    })
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled" // http://t.cn/EowE3r3
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Form wrappedComponentRef={this.onFormRef} ref={this.onRcFormRef} noBorder>
          <Input id="phoneNumber" placeholder="手机号" rules={[Rules.rules.mobilePhone]} custom />
          <SmsCodeVerifyView id="codeNumber" placeholder="验证码" custom />
        </Form>
      </ScrollView>
    )
  }
}
```

## 支持的组件

- Input: 普通的输入框
- NumberInput: 数字输入框

## 参考链接

- [React - 修改 children(上)](http://t.cn/E9XKVGW)
- [React - 修改 children(下)](http://t.cn/E9XKYDU)
- [javascript 高阶函数介绍](http://t.cn/E9SPeN1)
- [高阶函数，你怎么那么漂亮呢！](http://t.cn/RmB0uKp)

## TODO

- Picker cols 为 1 时返回的数据结构
- 清除表单
