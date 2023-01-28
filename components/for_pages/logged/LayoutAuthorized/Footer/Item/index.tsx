import classNames from 'classnames'
import Gradient from 'components/for_pages/common/gradient'
import { colors } from 'styles/variables'
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
        return `linear-gradient(180deg, ${colors.zoom} 0%, rgba(11, 91, 253, 0.3) 37.5%, rgba(11, 91, 253, 0) 86.98%)` 
      case 'green':
        return `linear-gradient(180deg, ${colors.trueconf} 0%, rgba(1, 151, 167, 0.3) 37.5%, rgba(1, 151, 167, 0) 86.98%)` 
    }
  }

  const handleClick = () => {
    onClick ? onClick() : null
  }

  return (
    <div className={classNames(styles.root, getStyle())} onClick={handleClick}>
      <Gradient
        isActive={active}
        timeout={500}
        enterClass={styles.itemEnter}
        enterActiveClass={styles.itemEnterActive}
        exitClass={styles.itemExit}
        exitActiveClass={styles.itemExitActive}
        style={getColor(color)} />
      {icon}
      {style === 'members' ? <div className={styles.number}>{numberOfUsers}</div> : null}
      <div className={styles.title}>{title}</div>
    </div>
  )
}
