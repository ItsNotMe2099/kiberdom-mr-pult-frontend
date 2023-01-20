import classNames from 'classnames'
import styles from './index.module.scss'

interface Props {
  style?: 'members' | 'record' | 'exit'
  icon: React.ReactNode
}

export default function Item({ style, icon }: Props) {

  const getStyle = () => {
    return classNames(
      {
        [styles.exit]: style === 'exit'
      }
    )
  }

  return (
    <div className={classNames(styles.root, getStyle())}>
      {icon}
    </div>
  )
}
