import BackSvg from 'components/svg/BackSvg'
import DemonstrateSvg from 'components/svg/DemonstrateSvg'
import MembersSvg from 'components/svg/MembersSvg'
import SpeakerSvg from 'components/svg/SpeakerSvg'
import { LedState } from 'data/enum/LedState'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import ScreenControls from './ScreenControls'

interface Props {
  isZoom: boolean
  isTrueConf: boolean
  loading: boolean
}

export default function Left({ isZoom, isTrueConf, loading }: Props) {

  const getOptions = (isZoom: boolean, isTrueConf: boolean) => {
    if (isZoom || isTrueConf) {
      return [{ img: <MembersSvg />, label: 'участники', value: LedState.Content },
      { img: <SpeakerSvg />, label: 'спикер', value: LedState.Gallery },
      { img: <DemonstrateSvg />, label: 'демонстрация' }]
    }
    else {
      return [{ img: <BackSvg />, label: 'заставка' }, { img: <DemonstrateSvg />, label: 'демонстрация' }]
    }
  }

  const nodeRef = useRef(null)

  return (
    <div className={styles.root}>
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
        <div ref={nodeRef} className={styles.wrapper}>
          <div className={styles.title}>
            ЭКРАНЫ
          </div>
          <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} indexScreen={'0'} />
          <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} indexScreen={'1'} />
          <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} indexScreen={'2'} />
          <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} indexScreen={'3'} />
        </div>
      </CSSTransition>
    </div>
  )
}
