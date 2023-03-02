import { useAppContext } from 'context/state'
import { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import classNames from 'classnames'
import { OnOffState } from 'data/enum/OnOffState'

interface Props {
  icon: React.ReactNode
  title: string
  onClick?: () => void
}

export default function Record({ icon, onClick, title }: Props) {

  const appContext = useAppContext()

  const handleClick = () => {
    onClick ? onClick() : null
  }

  const titleRef = useRef(null)
  const recRef = useRef(null)
  const recControlsRef = useRef(null)
  const pauseRef = useRef(null)
  const resumeRef = useRef(null)

  useEffect(() => {
    if (appContext.isRecording) {
      setTimeout(() => {
        appContext.handleVisibleRecControls()
      }, 10000)
    }
  }, [appContext.isRecording])

  return (
    <div className={classNames(styles.root, { [styles.recording]: appContext.isRecording })} onClick={handleClick}>
      {icon}
      <CSSTransition
        timeout={500}
        in={!appContext.isRecording}
        nodeRef={titleRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <div className={styles.title} ref={titleRef}>{title}</div>
      </CSSTransition>
      <CSSTransition
        timeout={500}
        in={appContext.isRecording}
        nodeRef={recRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.warnEnter,
          enterActive: styles.warnEnterActive,
          exit: styles.warnExit,
          exitActive: styles.warnExitActive,
        }}
      >
        <div className={styles.warn} ref={recRef}>
          <div className={styles.title}>запись начата</div>
          <div className={styles.text}>после остановки укажите почту, на которую нужно отправить файл mp4</div>
        </div>
      </CSSTransition>
      <CSSTransition
        timeout={500}
        in={appContext.isRecControls}
        nodeRef={recControlsRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <div className={styles.recControls} ref={recControlsRef}>
          <CSSTransition
            timeout={500}
            in={appContext.isRecPaused === OnOffState.Off ? true : false}
            nodeRef={pauseRef}
            mountOnEnter
            unmountOnExit
            classNames={{
              enter: styles.itemEnter,
              enterActive: styles.itemEnterActive,
              exit: styles.itemExit,
              exitActive: styles.itemExitActive,
            }}
          >
            <div className={styles.pause} onClick={appContext.handleRecIsPaused} ref={pauseRef}>
              пауза
            </div>
          </CSSTransition>
          <CSSTransition
            timeout={500}
            in={appContext.isRecPaused === OnOffState.On ? true : false}
            nodeRef={resumeRef}
            mountOnEnter
            unmountOnExit
            classNames={{
              enter: styles.itemEnter,
              enterActive: styles.itemEnterActive,
              exit: styles.itemExit,
              exitActive: styles.itemExitActive,
            }}
          >
            <div className={styles.resume} onClick={appContext.handleRecIsPaused} ref={resumeRef}>
              продолжить
            </div>
          </CSSTransition>
          <div className={styles.stop} onClick={appContext.handleStopRec} ref={pauseRef}>
            остановить<br /> запись
          </div>
        </div>
      </CSSTransition>
    </div >
  )
}
