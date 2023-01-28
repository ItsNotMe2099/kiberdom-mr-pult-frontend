import TextField from 'components/fields/TextField'
import Button from 'components/ui/Button'
import { useFormik, Form, FormikProvider } from 'formik'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

interface Props {
  onSubmit: () => void
  color: 'blue' | 'green'
  onCancel: () => void
}

export default function LoginForm({ onSubmit, color, onCancel }: Props) {

  const initialValues = {
    id: '',
    key: ''
  }

  const handleSubmit = async () => {
    onSubmit()
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
        <TextField name='id' label='ID' brdrColor={getBorderColor(color)} />
        <TextField className={styles.key} name='key' type={'password'} label='ключ' brdrColor={getBorderColor(color)} />
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
