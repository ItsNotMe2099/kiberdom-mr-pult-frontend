import classNames from 'classnames'
import Gradient from 'components/for_pages/common/gradient'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
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
  exit?: boolean
  onExit?: () => void
}

export default function Item({ style, icon, active, onClick, color, title, numberOfUsers, exit, onExit }: Props) {

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

  const exitRef = useRef(null)

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
      <CSSTransition
        timeout={200}
        in={exit}
        nodeRef={exitRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <div className={styles.exitMenu} ref={exitRef}>
          <div className={styles.end} onClick={onExit}>
            <span>завершить<br/> для всех</span>
          </div>
          <div className={styles.leave} onClick={onExit}>
            <span>покинуть<br/>  встречу</span>
          </div>
        </div>
      </CSSTransition>
      {icon}
      {style === 'members' ? <div className={styles.number}>{numberOfUsers}</div> : null}
      <div className={styles.title}>{title}</div>
    </div>
  )
}
