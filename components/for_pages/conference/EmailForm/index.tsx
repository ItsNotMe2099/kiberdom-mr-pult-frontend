import TextField from 'components/fields/TextField'
import Loader from 'components/for_pages/common/loader'
import Button from 'components/ui/Button'
import { useAppContext } from 'context/state'
import { StatusResponseType } from 'data/enum/StatusResponseType'
import ConferenceRepository from 'data/repositories/ConferenceRepository'
import RecordRepository from 'data/repositories/RecordRepository'
import { useFormik, Form, FormikProvider } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { colors } from 'styles/variables'
import { SnackbarType } from 'types/enums'
import Validator from 'utils/validator'
import styles from './index.module.scss'
import Qr from 'components/for_pages/common/Qr'

interface Props {
  onSubmit?: () => void
  style?: 'invite' | 'send'
  isActive: boolean
}

export default function EmailForm({ onSubmit, style, isActive }: Props) {

  const initialValues = {
    email: ''
  }

  const appContext = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)

  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    }
  }, [success])

  const handleSubmit = async (data: { email: string }) => {
    onSubmit ? onSubmit() : null
    setLoading(true)
    try {
      if (style === 'send') {
        const res = await RecordRepository.send(data)
        if (res.status === StatusResponseType.Ok) {
          setSuccess(true)
        }
      }
      else {
        const res = await ConferenceRepository.invite(data)
        if (res.status === StatusResponseType.Ok) {
          setSuccess(true)
        }
      }
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
    formik.setFieldValue('email', '')
    appContext.handleCancelEmailForm()
  }


  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const nodeRef = useRef(null)

  return (
    <>
      <CSSTransition
        timeout={500}
        in={isActive}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <div className={styles.root}>
          <FormikProvider value={formik}>
            <Form className={styles.form} ref={nodeRef}>
              {style === 'invite' && <Qr className={styles.qr} />}
              <div className={styles.title}>{style === 'invite' ? 'кого' : 'куда'}</div>
              <TextField name='email' label='эл. почта' brdrColor={colors.zoom} />
              <div className={styles.btns}>
                <Button disabled={loading} onClick={handleCancel} color={'red'} fluid>
                  отмена
                </Button>
                <Button onClick={() => handleSubmit(formik.values)}
                  type='submit'
                  disabled={!Validator.emailRe.test(formik.values.email) || loading}
                  color={'blue'}
                  fluid>
                  {style === 'send' ? 'отправить файл mp4' : 'подключить'}
                </Button>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </CSSTransition>
      <Loader
        color='purple'
        isActive={loading}
        text='отправляю, подождите...'
        icon='/img/logos/send.svg' />
      <Loader
        color='yellow'
        isActive={success}
        text='отправленно!'
        icon='/img/logos/success.svg' />
    </>
  )
}
