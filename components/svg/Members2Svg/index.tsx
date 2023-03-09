import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'

interface Props {
  isOn: boolean
  className?: string
}

export default function Members2Svg({ isOn, className }: Props) {

  const onRef = useRef(null)
  const offRef = useRef(null)

  return (
    <>
      <CSSTransition
        timeout={500}
        in={isOn}
        nodeRef={onRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <svg className={className} ref={onRef} width="47" height="82" viewBox="0 0 47 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M40.7045 0.200195L46.4 5.90904L11.391 41.0002L46.4 76.0914L40.7045 81.8002L0 41.0002L40.7045 0.200195Z" />
        </svg>

      </CSSTransition>
      <CSSTransition
        timeout={500}
        in={!isOn}
        nodeRef={offRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <svg ref={offRef} className={className} width="104" height="82" viewBox="0 0 104 92" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M66.7996 18.4002C66.7996 26.7949 59.9943 33.6002 51.5996 33.6002C43.2049 33.6002 36.3996 26.7949 36.3996 18.4002C36.3996 10.0055 43.2049 3.2002 51.5996 3.2002C59.9943 3.2002 66.7996 10.0055 66.7996 18.4002ZM58.7996 18.4002C58.7996 22.3766 55.5761 25.6002 51.5996 25.6002C47.6232 25.6002 44.3996 22.3766 44.3996 18.4002C44.3996 14.4237 47.6232 11.2002 51.5996 11.2002C55.5761 11.2002 58.7996 14.4237 58.7996 18.4002Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5996 37.4002H77.5996V86.2002H25.5996V37.4002ZM33.5996 78.2002V45.4002H69.5996V78.2002H33.5996Z" />
          <path d="M83.6012 75.8002V67.8002H95.2012V45.8002H83.6012V37.8002H103.201V75.8002H83.6012Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M86.6012 34.0002C92.8972 34.0002 98.0012 28.8962 98.0012 22.6002C98.0012 16.3041 92.8972 11.2002 86.6012 11.2002C80.3051 11.2002 75.2012 16.3041 75.2012 22.6002C75.2012 28.8962 80.3051 34.0002 86.6012 34.0002ZM86.6012 26.0002C88.4789 26.0002 90.0012 24.478 90.0012 22.6002C90.0012 20.7224 88.4789 19.2002 86.6012 19.2002C84.7234 19.2002 83.2012 20.7224 83.2012 22.6002C83.2012 24.478 84.7234 26.0002 86.6012 26.0002Z" />
          <path d="M19.6 76.0004V68.0004H8V46.0004H19.6V38.0004H0V76.0004H19.6Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6 34.2004C10.304 34.2004 5.2 29.0964 5.2 22.8004C5.2 16.5043 10.304 11.4004 16.6 11.4004C22.896 11.4004 28 16.5043 28 22.8004C28 29.0964 22.896 34.2004 16.6 34.2004ZM16.6 26.2004C14.7222 26.2004 13.2 24.6782 13.2 22.8004C13.2 20.9226 14.7222 19.4004 16.6 19.4004C18.4778 19.4004 20 20.9226 20 22.8004C20 24.6782 18.4778 26.2004 16.6 26.2004Z" />
        </svg>

      </CSSTransition>
    </>
  )
}
