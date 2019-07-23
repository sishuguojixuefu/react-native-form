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

## 内置组件

- Input: 普通的输入框
- NumberInput: 数字输入框

## 属性

| 属性                | 说明                                                        | 类型                    | 默认值 |
| ------------------- | ----------------------------------------------------------- | ----------------------- | ------ |
| wrappedComponentRef | `wrappedComponentRef={ref => {this.form = ref.props.form}}` | Function                | -      |
| items               | 动态表单渲染的依据，结构需严格遵守 FormItemsPropsType       | `FormOptionPropsType[]` | -      |
| noBorder            | 是否显示 border                                             | boolean                 | true   |
| style               | 样式                                                        | object                  | -      |

## 方法

| 属性             | 说明                          |
| ---------------- | ----------------------------- |
| getFormItemTypes | 获取 items 允许传入的组件类型 |
| getRules         | 获取 items 允许传入的 rules   |

## 参考链接

- [React - 修改 children(上)](http://t.cn/E9XKVGW)
- [React - 修改 children(下)](http://t.cn/E9XKYDU)
- [javascript 高阶函数介绍](http://t.cn/E9SPeN1)
- [高阶函数，你怎么那么漂亮呢！](http://t.cn/RmB0uKp)
