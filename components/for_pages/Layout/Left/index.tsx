import BackSvg from 'components/svg/BackSvg'
import DemonstrateSvg from 'components/svg/DemonstrateSvg'
import MembersSvg from 'components/svg/MembersSvg'
import SpeakerSvg from 'components/svg/SpeakerSvg'
import styles from './index.module.scss'
import ScreenControls from './ScreenControls'

interface Props {
  isZoom: boolean
  isTrueConf: boolean
}

export default function Left({ isZoom, isTrueConf }: Props) {

  const getOptions = (isZoom: boolean, isTrueConf: boolean) => {
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
      <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} number={1} />
      <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} number={2} />
      <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} number={3} />
      <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} number={4} />
    </div>
  )
}
