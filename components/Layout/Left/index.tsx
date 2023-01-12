import BackSvg from 'components/svg/BackSvg'
import DemonstrateSvg from 'components/svg/DemonstrateSvg'
import MembersSvg from 'components/svg/MembersSvg'
import SpeakerSvg from 'components/svg/SpeakerSvg'
import { useAppContext } from 'context/state'
import styles from './index.module.scss'
import ScreenControls from './ScreenControls'

interface Props {

}

export default function Left({ }: Props) {

  const appContext = useAppContext()

  const getOptions = (isZoom: boolean = false, isTrueConf: boolean = false) => {
    if (isZoom) {
      return [{ img: <MembersSvg />, label: 'заставка' },
      { img: <SpeakerSvg />, label: 'спикер' }, { img: <DemonstrateSvg />, label: 'демонстрация' }]
    }
    else if (isTrueConf) {
      return [{ img: <MembersSvg />, label: 'заставка' },
      { img: <SpeakerSvg />, label: 'спикер' }, { img: <DemonstrateSvg />, label: 'демонстрация' }]
    }
    else {
      return [{ img: <BackSvg />, label: 'заставка' }, { img: <DemonstrateSvg />, label: 'демонстрация' }]
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        ЭКРАНЫ
      </div>
      <ScreenControls options={getOptions(appContext.isZoom, appContext.isTrueConf)} color={appContext.isZoom ? 'blue' : appContext.isTrueConf ? 'green' : 'gray'} number={1} />
      <ScreenControls options={getOptions(appContext.isZoom, appContext.isTrueConf)} color={appContext.isZoom ? 'blue' : appContext.isTrueConf ? 'green' : 'gray'} number={2} />
      <ScreenControls options={getOptions(appContext.isZoom, appContext.isTrueConf)} color={appContext.isZoom ? 'blue' : appContext.isTrueConf ? 'green' : 'gray'} number={3} />
      <ScreenControls options={getOptions(appContext.isZoom, appContext.isTrueConf)} color={appContext.isZoom ? 'blue' : appContext.isTrueConf ? 'green' : 'gray'} number={4} />
    </div>
  )
}
