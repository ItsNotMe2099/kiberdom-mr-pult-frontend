import { useConfContext } from 'context/conference_state'
import { useAppContext } from 'context/state'
import styles from './index.module.scss'
import Item from './Item'

interface Props {

}

export default function CameraControls({ }: Props) {

  const appContext = useAppContext()
  const confContext = useConfContext()

  return (
    <div className={styles.root}>
      <Item
        active={confContext.isManualCamera}
        onClick={confContext.handleManualCamera}
        color={appContext.isZoom ? 'blue' : 'green'} icon='/img/camera-controls/manual.svg' title='вручную' />
      <Item
        active={confContext.isAutoCamera}
        onClick={confContext.handleAutoCamera}
        color={appContext.isZoom ? 'blue' : 'green'} icon='/img/camera-controls/auto.svg' title='автокадрирование' />
      <Item
        active={confContext.isStreamsCamera}
        onClick={confContext.handleStreamsCamera}
        color={appContext.isZoom ? 'blue' : 'green'} icon='/img/camera-controls/streams.svg' title='несколько потоков' />
    </div>
  )
}
