import TextField from 'components/fields/TextField'
import Button from 'components/ui/Button'
import { useFormik, Form, FormikProvider } from 'formik'
import Image from 'next/image'
import styles from './index.module.scss'

interface Props {
  icon: string
  onSubmit: () => void
  degree: number
  color: 'blue' | 'green'
  onCancel: () => void
}

export default function Login({ icon, onSubmit, color, degree, onCancel }: Props) {

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

  const getColor = (color: 'blue' | 'green', degree: number) => {
    switch (color) {
      case 'blue':
        return `linear-gradient(${degree}deg, #073CA7 20%, #020C24 30%, #000 45%)`
      case 'green':
        return `linear-gradient(${degree}deg, #016E7A 20%, #00191C 30%, #000 45%)`
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.gradient} style={{ background: getColor(color, degree) }}></div>
      <Image className={styles.img} src={icon} alt='' fill />
      <FormikProvider value={formik}>
        <Form className={styles.form}>
          <TextField name='id' label='ID' />
          <TextField className={styles.key} name='key' type={'password'} label='ключ' />
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
  )
}
