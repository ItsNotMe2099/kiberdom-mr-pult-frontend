import TextField from 'components/fields/TextField'
import Button from 'components/ui/Button'
import { useAppContext } from 'context/state'
import { Platform } from 'data/enum/Platorm'
import ConferenceRepository from 'data/repositories/ConferenceRepository'
import CoreRepository from 'data/repositories/CoreRepository'
import { useFormik, Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import { colors } from 'styles/variables'
import { SnackbarType } from 'types/enums'
import Validator from 'utils/validator'
import styles from './index.module.scss'

interface Props {
  onSubmit?: () => void
  color: 'blue' | 'green'
  onCancel: () => void
  platform: Platform
}

export default function LoginForm({ onSubmit, color, onCancel, platform }: Props) {

  const appContext = useAppContext()

  const initialValues = {
    login: '',
    password: ''
  }

  const router = useRouter()

  const handleSubmit = async (data: { login: string, password: string }) => {
    appContext.handleLoginLoading(true)
    //onSubmit ? onSubmit() : null
    try {
      await CoreRepository.selectPlatform(platform)
      await ConferenceRepository.join(data)
      router.push(`/conference/${platform}`)
      appContext.fetch()
    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      appContext.showSnackbar(errorMessage, SnackbarType.error)
    }
    appContext.handleLoginLoading(false)
  }

  const handleCancel = () => {
    onCancel()
  }


  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const getBorderColor = () => {
    switch (platform) {
      case Platform.Zoom:
        return colors.zoom
      case Platform.TrueConf:
        return colors.trueconf
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <TextField
          name='login'
          label='ID'
          brdrColor={getBorderColor()} />
        <TextField
          className={styles.key}
          name='password'
          type={'password'}
          label='ключ'
          brdrColor={getBorderColor()} />
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
