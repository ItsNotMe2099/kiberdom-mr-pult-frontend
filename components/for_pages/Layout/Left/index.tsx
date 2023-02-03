import BackSvg from 'components/svg/BackSvg'
import DemonstrateSvg from 'components/svg/DemonstrateSvg'
import MembersSvg from 'components/svg/MembersSvg'
import SpeakerSvg from 'components/svg/SpeakerSvg'
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
      return [{ img: <MembersSvg />, label: 'участники' },
      { img: <SpeakerSvg />, label: 'спикер' }, { img: <DemonstrateSvg />, label: 'демонстрация' }]
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
          <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} index={0} />
          <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} index={1} />
          <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} index={2} />
          <ScreenControls options={getOptions(isZoom, isTrueConf)} color={isZoom ? 'blue' : isTrueConf ? 'green' : 'gray'} index={3} />
        </div>
      </CSSTransition>
    </div>
  )
}
