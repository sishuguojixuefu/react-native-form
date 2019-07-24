import { getRules } from './Rules'
import { RulePropsType } from './PropTypes'

const getFieldDecorator = (
  form: any,
  id?: string,
  initialValue?: string | (string | undefined)[],
  required?: boolean,
  originRules?: RulePropsType,
  restOptions?: object
) => {
  const rules = getRules(required, originRules)

  const fieldDecorator = form.getFieldDecorator(id, {
    initialValue,
    rules,
    validateFirst: true,
    ...restOptions,
  })

  return fieldDecorator
}

export default getFieldDecorator
