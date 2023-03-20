import {useAppContext} from 'context/state'
import Climate from './Climate'
import Help from './Help'
import styles from './index.module.scss'
import Light from './Light'
import Volume from './Volume'
import classNames from 'classnames'
import {useRef} from 'react'
import {CSSTransition} from 'react-transition-group'
import {RightSideControl} from 'data/enum/RightSideControl'

interface Props {
  loading: boolean
}

export default function Right({ loading }: Props) {

  const appContext = useAppContext()

  const getRootClass = () => {
    return classNames(
      {
        [styles.start]: appContext.rightMode === RightSideControl.Volume || appContext.rightMode === RightSideControl.Climate
      }
    )
  }

  const nodeRef = useRef(null)

  return (
    <div className={classNames(styles.root, getRootClass())}>
      <div className={classNames(styles.wrapper, styles.fake, {[styles.none]: !loading})}>
        <Volume />
        <Light />
        <Climate />
        <Help />
      </div>
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
          <Volume />
          <Light />
          <Climate />
          <Help />
        </div>
      </CSSTransition>
    </div>
  )
}
