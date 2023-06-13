import { useAppContext } from 'context/state'
import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  className?: string
  imgClass?: string
  textClass?: string
}

export default function Qr({ className, imgClass, textClass }: Props) {

  const appContext = useAppContext()

  return (
    <div className={classNames(styles.qr, className)}>
      <div className={classNames(styles.text, textClass)}>
        копировать ссылку<br />этой конференции<br />в свой телефон
      </div>
      <Image
        className={classNames(styles.qrImage, imgClass)}
        src={appContext.coreStatus ? appContext.coreStatus?.conference?.short_link?.qr : ''}
        alt='' fill />
    </div>
  )
}
