import TextField from 'components/fields/TextField'
import Button from 'components/ui/Button'
import { useAppContext } from 'context/state'
import ConferenceRepository from 'data/repositories/ConferenceRepository'
import { useFormik, Form, FormikProvider } from 'formik'
import { colors } from 'styles/variables'
import { SnackbarType } from 'types/enums'
import styles from './index.module.scss'

interface Props {
  onSubmit: () => void
  color: 'blue' | 'green'
  onCancel: () => void
}

export default function LoginForm({ onSubmit, color, onCancel }: Props) {

  const appContext = useAppContext()

  const initialValues = {
    login: '',
    password: ''
  }

  const handleSubmit = async (data: {login: string, password: string}) => {
    onSubmit()
    try{
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
        <TextField name='login' label='ID' brdrColor={getBorderColor(color)} />
        <TextField className={styles.key} name='password' type={'password'} label='ключ' brdrColor={getBorderColor(color)} />
        <div className={styles.btns}>
          <Button onClick={handleCancel} color={'red'} fluid>
            отмена
          </Button>
          <Button type='submit' color={color} fluid>
            подключить
          </Button>
        </div>
      </Form>
    </FormikProvider>
  )
}
