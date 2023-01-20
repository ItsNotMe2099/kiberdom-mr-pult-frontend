import CameraSvg from 'components/svg/CameraSvg'
import ExitSvg from 'components/svg/ExitSvg'
import InviteSvg from 'components/svg/InviteSvg'
import Members2Svg from 'components/svg/Members2Svg'
import RecordSvg from 'components/svg/RecordSvg'
import { useAppContext } from 'context/state'
import styles from './index.module.scss'
import Item from './Item'

interface Props {

}

export default function Footer({ }: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <Item icon={<Members2Svg />} />
      <Item icon={<InviteSvg />} />
      <Item icon={<CameraSvg />} />
      <Item icon={<RecordSvg />} />
      <Item style='exit' icon={<ExitSvg />} />
    </div>
  )
}
