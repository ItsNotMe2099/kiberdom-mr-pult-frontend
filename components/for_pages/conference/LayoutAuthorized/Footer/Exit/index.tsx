import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'

interface Props {
  icon: React.ReactNode
  title: string
  onClick?: () => void
  exit?: boolean
  onExit?: () => void
  onLeave?: () => void
}

export default function Exit({ icon, onClick, title, exit, onExit, onLeave }: Props) {

  const handleClick = () => {
    onClick ? onClick() : null
  }

  const exitRef = useRef(null)


  return (
    <div className={styles.root} onClick={handleClick}>
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
            <span>завершить<br /> для всех</span>
          </div>
          <div className={styles.leave} onClick={onLeave}>
            <span>покинуть<br />  встречу</span>
          </div>
        </div>
      </CSSTransition>
      {icon}
      {exit ? null : <div className={styles.title}>{title}</div>}
    </div >
  )
}
