import { useAppContext } from 'context/state'
import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  className?: string
}

export default function Qr({ className }: Props) {

  const appContext = useAppContext()

  return (
    <div className={classNames(styles.qr, className)}>
      <div className={styles.text}>
        копировать ссылку<br />этой конференции<br />в свой телефон
      </div>
      <Image
        className={styles.qrImage}
        src={appContext.coreStatus ? appContext.coreStatus?.conference?.short_link?.qr : ''}
        alt='' fill />
    </div>
  )
}
