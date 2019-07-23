import kindOf from 'kind-of'
import { RulePropsType } from './PropTypes'

const rules = {
  required: {
    required: true,
    message: '该字段是必填字段',
  },
  /**
   * 邮编
   */
  zip: {
    pattern: /^[1-9]\d{5}(?!\d)$/,
    message: '该字段不是合法的邮编格式',
  },
  /**
   * 邮箱
   */
  email: {
    pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    message: '该字段不是合法的邮箱格式',
  },
  /**
   * 中文字符
   */
  zh: {
    pattern: /^[\u4e00-\u9fa5]+$/gm,
    message: '该字段不是合法的中文字符串',
  },
  /**
   * 中文名正则
   */
  zhName: {
    pattern: /^[\u4e00-\u9fa5]{2,15}$/,
    message: '该字段不是合法的中文名',
  },
  /**
   * 网址
   */
  url: {
    pattern: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
    message: '该字段不是合法的url',
  },
  /**
   * 电话号正则，包含手机号、固话号、400电话
   */
  phone: {
    pattern: /^(0|86|17951)?(13[0-9]|14[579]|15[012356789]|166|17[1235678]|18[0-9]|19[189])\s{0,1}[0-9]{4}\s{0,1}[0-9]{4}$|^(0[0-9]{2,3}-?)?[0-9]{7,8}$|^400-?\d{3}-?\d{4}$/,
    message: '该字段不是有效的电话号',
  },
  /**
   * 手机号正则
   */
  mobilePhone: {
    pattern: /^(0|86|17951)?(13[0-9]|14[579]|15[012356789]|166|17[1235678]|18[0-9]|19[189])\s{0,1}[0-9]{4}\s{0,1}[0-9]{4}$/,
    message: '该字段不是有效的手机号',
  },
  /**
   * 固话正则，包含400电话
   */
  telephone: {
    pattern: /^(0[0-9]{2,3}-?)?[0-9]{7,8}$|^400-?\d{3}-?\d{4}$/,
    message: '该字段不是有效的固话号',
  },
  /**
   * 身份证正则
   */
  idCard: {
    pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
    message: '该字段不是合法的身份证格式',
  },
  /**
   * 日期
   */
  date: {
    pattern: /^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/,
    message: '该字段不是合法的日期格式',
  },
  /**
   * 货币字符
   */
  money: {
    pattern: /^[+-]?[0-9]+(.{1}[0-9]+){0,1}$/,
    message: '该字段不是合法的金额',
  },
  /**
   * 数字
   */
  number: {
    pattern: /^[+-]?\d+$/,
    message: '该字段不是合法的数字',
  },
  /**
   * 整型数字
   */
  integer: {
    pattern: /^[+-]?\d+$/,
    message: '该字段不是合法的整型数字',
  },
  /**
   * 浮点数
   */
  floating: {
    pattern: /^[+-]?[0-9]+(.{1}[0-9]+){0,1}$/,
    message: '该字段不是合法的浮点型数字',
  },
  /**
   * 2的倍数
   */
  twoTimes: {
    pattern: /^([02468]|[13579][13579]*[02468])*$/,
    message: '该字段值必须是2的倍数',
  },
  /**
   * 3的倍数
   */
  threeTimes: {
    pattern: /^([0369]|[258][0369]*[147]|([147]|[258][0369]*[258])([0369]|[147][0369]*[258])*([258]|[147][0369]*[147]))*$/,
    message: '该字段值必须是3的倍数',
  },
  /**
   * 4的倍数
   */
  fourTimes: {
    validator: (rule, value, callback) => {
      if (isNaN(value) || value % 4 !== 0) {
        callback(rule.message)
      }
      callback()
    },
    message: '该字段必须是4的倍数',
  },
  fiveTimes: {
    validator: (rule, value, callback) => {
      if (isNaN(value) || value % 5 !== 0) {
        callback(rule.message)
      }
      callback()
    },
    message: '该字段必须是5的倍数',
  },
  sixTimes: {
    validator: (rule, value, callback) => {
      if (isNaN(value) || value % 6 !== 0) {
        callback(rule.message)
      }
      callback()
    },
    message: '该字段必须是6的倍数',
  },
}

export const getRules = (required?: boolean, originRules?: RulePropsType) => {
  const rulesObj: any = []
  if (required) {
    rulesObj.push(rules.required)
  }
  originRules &&
    originRules.forEach((item: any) => {
      if (kindOf(item) === 'string') {
        const rule = rules[item]
        rulesObj.push(rule)
      } else if (item.type) {
        const rule = rules[item.type]
        const customMessage = {
          pattern: rule.pattern,
          message: item.message || rule.message,
        }
        rulesObj.push(customMessage)
      } else {
        rulesObj.push(item)
      }
    })
  return rulesObj
}
