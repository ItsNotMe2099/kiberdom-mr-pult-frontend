import CameraSvg from 'components/svg/CameraSvg'
import ExitSvg from 'components/svg/ExitSvg'
import InviteSvg from 'components/svg/InviteSvg'
import Members2Svg from 'components/svg/Members2Svg'
import RecordSvg from 'components/svg/RecordSvg'
import { useConfContext } from 'context/conference_state'
import { useAppContext } from 'context/state'
import styles from './index.module.scss'
import Item from './Item'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Props {

}

export default function Footer({ }: Props) {

  const confContext = useConfContext()
  const appContext = useAppContext()

  const getSvgColor = (type: boolean) => {
    return classNames(
      {
        [styles.blue]: appContext.isZoom && type,
        [styles.green]: appContext.isTrueConf && type
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

  return (
    <div className={styles.root}>
      <Item style='members' title='участники' numberOfUsers={confContext.newUsers.length + confContext.users.length}
        color={appContext.isZoom ? 'blue' : 'green'}
        active={confContext.isActiveUsersList}
        onClick={confContext.handleActiveUsersListMenu} icon={<Members2Svg className={getSvgColor(confContext.isActiveUsersList)} />} />
      <Item  title='пригласить' color={appContext.isZoom ? 'blue' : 'green'} active={confContext.isActiveInvite}
        onClick={confContext.handleInvite} icon={<InviteSvg className={getSvgColor(confContext.isActiveInvite)} />} />
      <Item title='упр. камерой' color={appContext.isZoom ? 'blue' : 'green'} active={confContext.isActiveCameraMenu}
        onClick={confContext.handleCameraMenu} icon={<CameraSvg className={getSvgColor(confContext.isActiveCameraMenu)} />} />
      <Item title='начать запись' color={appContext.isZoom ? 'blue' : 'green'} active={false} style='record' icon={<RecordSvg />} />
      <Item onExit={() => router.push('/')} exit={isExit} onClick={() => setIsExit(true)} title='завершить' color={appContext.isZoom ? 'blue' : 'green'} active={false} style='exit' icon={<ExitSvg />} />
    </div>
  )
}
