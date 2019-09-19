import { getRules } from './Rules'
import { RulePropsType } from './PropTypes'

const getFieldDecorator = (
  form: any,
  id?: string,
  initialValue?: string | (string | undefined)[] | boolean | number,
  originRules?: RulePropsType,
  options?: object
) => {
  const rules = getRules(originRules)
  const fieldDecorator = form.getFieldDecorator(id, {
    initialValue,
    rules,
    validateFirst: true,
    ...options,
  })

  return fieldDecorator
}

export default getFieldDecorator
