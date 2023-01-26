import { useAppContext } from 'context/state'
import Climate from './Climate'
import Help from './Help'
import styles from './index.module.scss'
import Light from './Light'
import Sound from './Sound'
import classNames from 'classnames'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

interface Props {
  loading: boolean
}

export default function Right({ loading }: Props) {

  const appContext = useAppContext()

  const getRootClass = () => {
    return classNames(
      {
        [styles.start]: appContext.isSoundActive || appContext.isClimateActive
      }
    )
  }

  const nodeRef = useRef(null)

  return (
    <div className={classNames(styles.root, getRootClass())}>
      <CSSTransition
        timeout={2000}
        in={!loading}
        nodeRef={nodeRef}
        mountOnEnter
        classNames={{
          enter: styles.menuEnter,
          enterActive: styles.menuEnterActive,
        }}
      >
        <div className={styles.wrapper} ref={nodeRef}>
          <Sound />
          <Light />
          <Climate />
          <Help />
        </div>
      </CSSTransition>
    </div>
  )
}
