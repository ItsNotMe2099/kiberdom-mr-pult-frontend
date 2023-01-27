import classNames from 'classnames'
import styles from './index.module.scss'

interface Props {
  style?: 'members' | 'record' | 'exit'
  icon: React.ReactNode
  title: string
  active: boolean
  onClick?: () => void
  color: 'blue' | 'green'
  numberOfUsers?: number
}

export default function Item({ style, icon, active, onClick, color, title, numberOfUsers }: Props) {

  const getStyle = () => {
    return classNames(
      {
        [styles.exit]: style === 'exit',
        [styles.record]: style === 'record',
      }
    )
  }

  const getColor = (color: 'blue' | 'green') => {
    switch (color) {
      case 'blue':
        return active ? `linear-gradient(360deg, rgba(0,0,0,1) 0%, rgba(3,24,67,1) 45%, rgba(9,72,200,1) 100%)` : ''
      case 'green':
        return active ? `linear-gradient(360deg, rgba(0,1,1,1) 0%, rgba(1,101,111,1) 95%, rgba(1,123,137,1) 100%)` : ''
    }
  }

  const handleClick = () => {
    onClick ? onClick() : null
  }

  return (
    <div className={classNames(styles.root, getStyle())} onClick={handleClick} style={{ background: getColor(color) }}>
      {icon}
      {style === 'members' ? <div className={styles.number}>{numberOfUsers}</div> : null}
      <div className={styles.title}>{title}</div>
    </div>
  )
}
