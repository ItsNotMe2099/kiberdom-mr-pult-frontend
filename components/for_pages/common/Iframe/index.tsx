import styles from './index.module.scss'
import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'
import { useAppContext } from 'context/state'

interface Props {

}

export default function Iframe({ }: Props) {

  const nodeRef = useRef(null)

  const appContext = useAppContext()

  return (
    <CSSTransition
      timeout={2000}
      in={appContext.isIframeShown}
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
      <div className={styles.root} ref={nodeRef}>
        <iframe className={styles.frame} src='https://yandex.ru' width='100%' height='100%' />
        <div className={styles.title} onClick={appContext.showIframe}>
          закрыть меню
        </div>
      </div>
    </CSSTransition>
  )
}
