import styles from './index.module.scss'
import Left from './Left'
import Right from './Right'

interface Props {
  children?: React.ReactNode
  loading: boolean
}

export default function Layout({ children, loading }: Props) {

  return (
    <div className={styles.root}>
      {!loading ? <Left /> : null}
        {children}
      {!loading ? <Right /> : null}
    </div>
  )
}
