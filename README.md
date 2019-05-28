# @sishuguojixuefu/react-native-form

> 私塾动态表单项目

## 特性

- 根据特定的领域模型，自动匹配 Form 表单组件，自动映射数据
- 基于 `rc-form` 实现自动表单校验
- 支持以 `children` 的形式扩展组件

## 内置的组件

- Input: 文本输入框
- NumberInput: 数字输入框，基于文本输入框。只是 `type="string"`并增加默 "number"
  属性
- SsSelect: 单选框

## 安装

```sh
$ yarn add @sishuguojixuefu/react-native-form
$ yarn add @sishuguojixuefu/antd-mobile-rn
```

### 链接字体图标

```sh
$ react-native link @ant-design/icons-react-native
```

### 按需加载

```sh
$ yarn add babel-plugin-import -D
```

**babel.config.js:**

```js
plugins: [
  ['import', { libraryName: '@sishuguojixuefu/antd-mobile-rn' }],
],
```

### 使用 Modal、Toast

如果需要使用 `Modal` 以及 `Toast` 还需要在 App 的入口处加上 `Provider`:

```jsx
import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Button, Provider, Toast } from '@sishuguojixuefu/antd-mobile-rn'

class HelloWorldApp extends Component {
  render() {
    return (
      <Provider>
        <Button onPress={() => Toast.info('This is a toast tips')}>Start</Button>
      </Provider>
    )
  }
}
```

## 使用

```tsx
import React, { Component } from 'react'
...
export default class HelloWorldApp extends Component {
  onRef = (r) => this.ref = r
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled" // http://t.cn/EowE3r3
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Form items={appSchema.items} ref={this.onRef}>
          <Input label="自定义输入框" id="custom-1" required />
          <Input label="自定义输入框" id="custom-2" required />
        </Form>
      </ScrollView>
    )
  }
}
```

## API

### 属性

| 属性  | 说明                                                  | 类型                    | 默认值 |
| ----- | ----------------------------------------------------- | ----------------------- | ------ |
| items | 动态表单渲染的依据，结构需严格遵守 FormItemsPropsType | `FormOptionPropsType[]` | -      |

### 方法

> 注意：getValues 方法返回的是未序列化的对象，但是一般网络请求库都会自动序列化参数。

| 方法                    | 说明                          | 类型            | 默认值 |
| ----------------------- | ----------------------------- | --------------- | ------ |
| getValues               | 获取一个由 values 组成的对象  | `(): void`      | -      |
| getAllowedFormItemTypes | 获取 items 允许传入的组件类型 | `(): arrary | - |
| getAllowedFormRules     | _获取 items 允许传入的 rules_ | `(): arrary`    | -      |

## 依赖

- [rc-form](http://t.cn/EKrwFUy): React 高阶 Form 组件(web & react-native)
- [kind-of](http://t.cn/E9KortF): 获取一个值的原生类型
- [string-width](http://t.cn/E9Kac4p): 获取一个字符串视觉上的宽度 - 需要显示数字和字母

## 参考链接

- [React - 修改 children(上)](http://t.cn/E9XKVGW)
- [React - 修改 children(下)](http://t.cn/E9XKYDU)
- [javascript 高阶函数介绍](http://t.cn/E9SPeN1)
- [高阶函数，你怎么那么漂亮呢！](http://t.cn/RmB0uKp)
