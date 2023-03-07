import TextField from 'components/fields/TextField'
import Button from 'components/ui/Button'
import { useAppContext } from 'context/state'
import { Platform } from 'data/enum/Platorm'
import ConferenceRepository from 'data/repositories/ConferenceRepository'
import CoreRepository from 'data/repositories/CoreRepository'
import { useFormik, Form, FormikProvider } from 'formik'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { colors } from 'styles/variables'
import { SnackbarType } from 'types/enums'
import styles from './index.module.scss'

interface Props {
  onSubmit?: () => void
  color: 'blue' | 'green'
  onCancel: () => void
  platform: Platform
  active: boolean
  image: string
  timeOut: () => void
}

export default function LoginForm({ onSubmit, color, onCancel, platform, active, image, timeOut }: Props) {

  const appContext = useAppContext()

  const [focus, setFocus] = useState<boolean>(false)

  const initialValues = {
    login: '',
    password: ''
  }

  const handleSubmit = async (data: { login: string, password: string }) => {
    appContext.handleLoginLoading(true)
    //onSubmit ? onSubmit() : null
    try {
      await CoreRepository.selectPlatform(platform)
      if (data.login) {
        await ConferenceRepository.join(data)
      }
      else {
        await ConferenceRepository.create()
      }
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

  const nodeRef = useRef(null)

  const getColor = (color: 'blue' | 'green') => {
    switch (color) {
      case 'blue':
        return `linear-gradient(136.27deg, rgba(11, 91, 253, 0) 41.98%, rgba(11, 91, 253, 0.3) 69.36%, ${colors.zoom} 100.25%)`
      case 'green':
        return `linear-gradient(223.73deg, rgba(1, 151, 167, 0) 42.72%, rgba(1, 151, 167, 0.3) 69.64%, ${colors.trueconf} 100%)`
    }
  }

  useEffect(() => {
    const ms = focus ? 120000 : 5000
    if (active) {
      const timer = setTimeout(() => {
        appContext.loginLoading ? null : timeOut()
      }, ms)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [active, formik.values, appContext.loginLoading, focus])

  return (
    <CSSTransition
      timeout={2000}
      in={active}
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: styles.loginEnter,
        enterActive: styles.loginEnterActive,
        exit: styles.loginExit,
        exitActive: styles.loginExitActive,
      }}
    >
      <div className={styles.login} ref={nodeRef}>
        <div className={styles.gradient} style={{ background: getColor(color) }}></div>
        <Image className={styles.imgLogin} src={image} alt='' fill />
        <FormikProvider value={formik}>
          <Form className={styles.form}>
            <TextField
              name='login'
              label='ID'
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              brdrColor={getBorderColor()} />
            <TextField
              className={styles.key}
              name='password'
              label='ключ'
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
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
      </div>
    </CSSTransition>
  )
}
