import Rules from './Rules'
import { RulePropsType } from './PropTypes'

const getFieldDecorator = (
  form: any,
  id?: string,
  defaultValue?: string | string[],
  required?: boolean,
  originRules?: RulePropsType,
  restOptions?: object
) => {
  const rules = Rules.getRules(required, originRules)

  const fieldDecorator = form.getFieldDecorator(id, {
    initialValue: defaultValue,
    rules,
    validateFirst: true,
    ...restOptions,
  })

  return fieldDecorator
}

export default getFieldDecorator
