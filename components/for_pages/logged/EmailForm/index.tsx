import TextField from 'components/fields/TextField'
import Button from 'components/ui/Button'
import { useConfContext } from 'context/conference_state'
import RecordRepository from 'data/repositories/RecordRepository'
import { useFormik, Form, FormikProvider } from 'formik'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { colors } from 'styles/variables'
import Validator from 'utils/validator'
import styles from './index.module.scss'

interface Props {
  onSubmit?: () => void
  style?: 'invite' | 'send'
  isActive: boolean
}

export default function EmailForm({ onSubmit, style, isActive }: Props) {

  const initialValues = {
    email: ''
  }

  const confContext = useConfContext()

  const handleSubmit = async (data: {email: string}) => {
    onSubmit ? onSubmit() : null
    if(style === 'send'){
      RecordRepository.send(data)
    }
  }

  const handleCancel = () => {
    formik.setFieldValue('email', '')
    confContext.handleCancelEmailForm()
  }


  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const nodeRef = useRef(null)

  return (
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
            <div className={styles.title}>{style === 'invite' ? 'кого' : 'куда'}</div>
            <TextField name='email' label='эл. почта' brdrColor={colors.zoom} />
            <div className={styles.btns}>
              <Button onClick={handleCancel} color={'red'} fluid>
                отмена
              </Button>
              <Button onClick={() => handleSubmit(formik.values)}
                type='submit'
                disabled={!Validator.emailRe.test(formik.values.email)}
                color={'blue'}
                fluid>
                {style === 'send' ? 'отправить файл mp4' : 'подключить'}
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </CSSTransition>
  )
}
