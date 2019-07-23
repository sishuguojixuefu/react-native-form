import Rules from './utils/Rules'
import Form from './Form'
import FormItem from './components'

/**
 * 获取 items 允许传入的 ItemType
 */
export const getFormItemTypes = () => {
  return Object.keys(FormItem)
}

/**
 * 获取 items 允许传入的 rules
 */
export const getRules = () => {
  return Object.keys(Rules)
}

export { Rules }
export * from './components'

export default Form
