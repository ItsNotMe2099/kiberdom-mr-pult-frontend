import TextField from 'components/fields/TextField'
import Button from 'components/ui/Button'
import { useAppContext } from 'context/state'
import ConferenceRepository from 'data/repositories/ConferenceRepository'
import { useFormik, Form, FormikProvider } from 'formik'
import { useState } from 'react'
import { colors } from 'styles/variables'
import { SnackbarType } from 'types/enums'
import Validator from 'utils/validator'
import styles from './index.module.scss'

interface Props {
  onSubmit?: () => void
  color: 'blue' | 'green'
  onCancel: () => void
}

export default function LoginForm({ onSubmit, color, onCancel }: Props) {

  const appContext = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)

  const initialValues = {
    login: '',
    password: ''
  }

  const handleSubmit = async (data: { login: string, password: string }) => {
    setLoading(true)
    try {
      await ConferenceRepository.join(data)
    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      appContext.showSnackbar(errorMessage, SnackbarType.error)
    }
    setLoading(false)
    onSubmit ? onSubmit() : null
  }

  const handleCancel = () => {
    onCancel()
  }


  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const getBorderColor = (color: 'blue' | 'green') => {
    switch (color) {
      case 'blue':
        return colors.zoom
      case 'green':
        return colors.trueconf
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <TextField validate={Validator.required} name='login' label='ID' brdrColor={getBorderColor(color)} />
        <TextField validate={Validator.required} className={styles.key} name='password' type={'password'} label='ключ' brdrColor={getBorderColor(color)} />
        <div className={styles.btns}>
          <Button disabled={loading} onClick={handleCancel} color={'red'} fluid>
            отмена
          </Button>
          <Button spinner={loading} type='submit' color={color} fluid>
            подключить
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
