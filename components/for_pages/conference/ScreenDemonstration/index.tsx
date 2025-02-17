import DemonstrateSvg from 'components/svg/DemonstrateSvg'
import { useRef, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

interface Props {

}

export default function ScreenDemonstration({ }: Props) {

  const [isActive, setIsActive] = useState<boolean>(false)
  const [isBrowser, setIsBrowser] = useState<boolean>(false)

  const nodeRef = useRef(null)

  return (
    <div className={classNames(styles.root, { [styles.active]: isActive })} onClick={() => !isActive ? setIsActive(true) : null}>
      <CSSTransition
        timeout={200}
        in={isActive}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <>
        <div className={styles.back}></div>
        <div className={styles.menu} ref={nodeRef}>
          <div className={styles.head}>
            <div className={styles.item}>
              использовать
            </div>
            <div onClick={() => setIsBrowser(false)} className={classNames(styles.item, { [styles.activeItem]: !isBrowser })}>
              приложение zoom
            </div>
            <div onClick={() => setIsBrowser(true)} className={classNames(styles.item, { [styles.activeItem]: isBrowser })}>
              браузер
            </div>
          </div>
          {isBrowser ?
            <>
              <div className={styles.data}>
                <div className={styles.text}>
                  перейти
                </div>
                <div className={styles.text}>
                  share.zoom.us
                </div>
              </div>
              <div className={styles.data}>
                <div className={styles.text}>
                  ID конф.
                </div>
                <div className={styles.text}>
                  852 7038 6844
                </div>
              </div>
              <div className={styles.data}>
                <div className={styles.text}>
                  ключ
                </div>
                <div className={styles.text}>
                  5 3 3 5 5 6
                </div>
              </div>
            </>
            :
            <>
              <div className={styles.data}>
                <div className={styles.text}>
                  начать
                </div>
                <div className={styles.text}>
                  демонстрация экрана
                </div>
              </div>
              <div className={styles.data}>
                <div className={styles.text}>
                  ID конф.
                </div>
                <div className={styles.text}>
                  DDMEJN
                </div>
              </div>
            </>
          }
        </div>
        </>
      </CSSTransition>
      <DemonstrateSvg />
      <div className={styles.title} onClick={() => setIsActive(false)}>
        {isActive ? 'завершить демонстрацию' : 'демонстрация экрана'}
      </div>
    </div>
  )
}
