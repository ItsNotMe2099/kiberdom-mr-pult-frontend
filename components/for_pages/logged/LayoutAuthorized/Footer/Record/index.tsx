import { useConfContext } from 'context/conference_state'
import { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'

interface Props {
  icon: React.ReactNode
  title: string
  onClick?: () => void
}

export default function Record({ icon, onClick, title }: Props) {

  const confContext = useConfContext()

  const handleClick = () => {
    onClick ? onClick() : null
  }

  const titleRef = useRef(null)
  const recRef = useRef(null)
  const recControlsRef = useRef(null)
  const pauseRef = useRef(null)
  const resumeRef = useRef(null)

  useEffect(() => {
    if (confContext.isRecording) {
      setTimeout(() => {
        confContext.handleVisibleRecControls()
      }, 10000)
    }
  }, [confContext.isRecording])

  return (
    <div className={styles.root} onClick={handleClick}>
      {icon}
      <CSSTransition
        timeout={500}
        in={!confContext.isRecording}
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
        in={confContext.isRecording}
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
        in={confContext.isRecControls}
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
            in={!confContext.isRecPaused}
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
            <div className={styles.pause} onClick={confContext.handleRecIsPaused} ref={pauseRef}>
              пауза
            </div>
          </CSSTransition>
          <CSSTransition
            timeout={500}
            in={confContext.isRecPaused}
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
            <div className={styles.resume} onClick={confContext.handleRecIsPaused} ref={resumeRef}>
              продолжить
            </div>
          </CSSTransition>
          <div className={styles.stop} onClick={confContext.handleStopRec} ref={pauseRef}>
            остановить запись
          </div>
        </div>
      </CSSTransition>
    </div >
  )
}
