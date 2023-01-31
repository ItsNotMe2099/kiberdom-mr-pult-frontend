import TextField from 'components/fields/TextField'
import Button from 'components/ui/Button'
import { useAppContext } from 'context/state'
import { Platform } from 'data/enum/Platorm'
import ConferenceRepository from 'data/repositories/ConferenceRepository'
import CoreRepository from 'data/repositories/CoreRepository'
import { useFormik, Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
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

export default function LoginForm({ onSubmit, color, onCancel , platform }: Props) {

  const appContext = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)

  const initialValues = {
    login: '',
    password: ''
  }

  const router = useRouter()
  
  const handleSubmit = async (data: { login: string, password: string }) => {
    setLoading(true)
    //onSubmit ? onSubmit() : null
    try {
      await CoreRepository.selectPlatform(platform)
      await ConferenceRepository.join(data)
      router.push('/conference')
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
