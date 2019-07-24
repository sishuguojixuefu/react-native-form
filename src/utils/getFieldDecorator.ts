import { getRules } from './Rules'
import { RulePropsType } from './PropTypes'

const getFieldDecorator = (
  form: any,
  id?: string,
  initialValue?: string | (string | undefined)[],
  originRules?: RulePropsType,
  restOptions?: object
) => {
  const rules = getRules(originRules)

  const fieldDecorator = form.getFieldDecorator(id, {
    initialValue,
    rules,
    validateFirst: true,
    ...restOptions,
  })

  return fieldDecorator
}

export default getFieldDecorator
