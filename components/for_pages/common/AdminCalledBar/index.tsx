import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import RunSvg from 'components/svg/RunSvg'
import { colors } from 'styles/variables'

interface Props {
  isActive: boolean
}

export default function AdminCalledBar({ isActive }: Props) {

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
        <div className={styles.container} ref={nodeRef}>
          <RunSvg color={colors.white} />
          <div className={styles.text}>спешим на помощь!</div>
        </div>
      </div>
    </CSSTransition>
  )
}
