import styles from './index.module.scss'
import {FieldConfig, useField} from 'formik'
import classNames from 'classnames'
import {IField} from 'types/types'
import ErrorInput from 'components/fields/ErrorInput'
import { useState } from 'react'

interface Props extends IField<string> {
  className?: string
  onChange?: (val: string) => void
  label: string
}

export default function TextField(props: Props) {
  // @ts-ignore
  const [field, meta, helpers] = useField(props as FieldConfig)
  const showError = meta.touched && !!meta.error
  const [focused, setFocus] = useState<boolean>(false)

  const handleLabel = () => {
    if(!field.value){
      setFocus(false)
    }
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
        {!focused ? <div className={styles.label}>
          {props.label}
        </div> : null}
        <input
          {...field}
          onChange={(e) => {
            field.onChange(e)
            if(props.onChange){
              props.onChange(e.currentTarget.value)
            }
          }}
          onFocus={(e) => {
            setFocus(true)
          }}
          onBlur={(e) => {
            handleLabel()
            field.onBlur(e)
          }}
          disabled={props.disabled}
          type={props.type}
          className={classNames({
            [styles.input]: true,
            [styles.inputError]: showError,
          })}
          placeholder={props.placeholder}
        />
        </div>
         <ErrorInput {...meta}/>
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text',
}

