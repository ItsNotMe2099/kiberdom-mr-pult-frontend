import CameraSvg from 'components/svg/CameraSvg'
import ExitSvg from 'components/svg/ExitSvg'
import InviteSvg from 'components/svg/InviteSvg'
import Members2Svg from 'components/svg/Members2Svg'
import { useAppContext } from 'context/state'
import styles from './index.module.scss'
import Item from './Item'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { CSSTransition } from 'react-transition-group'
import Record from './Record'
import Exit from './Exit'
import ConferenceRepository from 'data/repositories/ConferenceRepository'
import { Platform } from 'data/enum/Platorm'
import { IParticipant } from 'data/interfaces/IParticipant'

interface Props {
  users: IParticipant[]
}

export default function Footer({ users }: Props) {

  const appContext = useAppContext()

  const getSvgColor = (type: boolean) => {
    return classNames(
      {
        [styles.blue]: appContext.coreStatus?.platform === Platform.Zoom && type,
        [styles.green]: appContext.coreStatus?.platform === Platform.TrueConf && type
      }
    )
  }

  const [isExit, setIsExit] = useState<boolean>(false)

  useEffect(() => {
    if (isExit) {
      setTimeout(() => {
        setIsExit(false)
      }, 5000)
    }
  }, [isExit])

  const router = useRouter()

  const handleExit = () => {
    ConferenceRepository.exit()
    router.push('/')
    appContext.fetch()
  }

  const handleLeave = () => {
    ConferenceRepository.leave()
    router.push('/')
    appContext.fetch()
  }

  const notRecordingRef = useRef(null)
  const recRef = useRef(null)

  return (
    <div className={styles.root}>
      <Item style='members' title='участники' numberOfUsers={users.length}
        platform={appContext.coreStatus?.platform as Platform}
        active={appContext.isActiveUsersList}
        onClick={appContext.handleActiveUsersListMenu} icon={<Members2Svg className={getSvgColor(appContext.isActiveUsersList)} />} />
      <Item title='пригласить' platform={appContext.coreStatus?.platform as Platform} active={appContext.isActiveInvite}
        onClick={appContext.handleInvite} icon={<InviteSvg className={getSvgColor(appContext.isActiveInvite)} />} />
      <Item title='упр. камерой' platform={appContext.coreStatus?.platform as Platform} active={appContext.isActiveCameraMenu}
        onClick={appContext.handleCameraMenu} icon={
          <CameraSvg className={getSvgColor(appContext.isActiveCameraMenu)} />
        } />
      <Record onClick={() => appContext.isRecording ? null : appContext.handleRecording()} title='начать запись' icon={
        <>
          <CSSTransition
            timeout={500}
            in={!appContext.isRecording}
            nodeRef={notRecordingRef}
            mountOnEnter
            unmountOnExit
            classNames={{
              enter: styles.itemEnter,
              enterActive: styles.itemEnterActive,
              exit: styles.itemExit,
              exitActive: styles.itemExitActive,
            }}
          >
            <svg ref={notRecordingRef} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1992 61.5998C19.1992 39.0666 37.466 20.7998 59.9992 20.7998C82.5324 20.7998 100.799 39.0666 100.799 61.5998C100.799 84.133 82.5324 102.4 59.9992 102.4C37.466 102.4 19.1992 84.133 19.1992 61.5998ZM59.9992 29.0981C42.049 29.0981 27.4975 43.6496 27.4975 61.5998C27.4975 79.55 42.049 94.1015 59.9992 94.1015C77.9494 94.1015 92.5009 79.55 92.5009 61.5998C92.5009 43.6496 77.9494 29.0981 59.9992 29.0981Z" />
              <rect x="36.8008" y="38.4004" width="46.4" height="46.4" rx="23.2" />
            </svg>
          </CSSTransition>
          <CSSTransition
            timeout={500}
            in={appContext.isRecording}
            nodeRef={recRef}
            mountOnEnter
            unmountOnExit
            classNames={{
              enter: styles.newEnter,
              enterActive: styles.newEnterActive,
              exit: styles.newExit,
              exitActive: styles.newExitActive,
            }}
          >
            <svg ref={recRef} width="102" height="72" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 51C0 22.8335 22.8335 0 51 0C79.1665 0 102 22.8335 102 51C102 79.1665 79.1665 102 51 102C22.8335 102 0 79.1665 0 51ZM51 10.3729C28.5623 10.3729 10.3729 28.5623 10.3729 51C10.3729 73.4377 28.5623 91.6271 51 91.6271C73.4377 91.6271 91.6271 73.4377 91.6271 51C91.6271 28.5623 73.4377 10.3729 51 10.3729ZM56 45V73H46V45H56ZM56 39V29H46V39H56Z" fill="#707070" />
            </svg>

          </CSSTransition>
        </>
      } />
      <Exit
        onExit={handleExit}
        onLeave={handleLeave}
        exit={isExit}
        onClick={() => setIsExit(true)}
        title='завершить'
        icon={<ExitSvg />} />
    </div>
  )
}
