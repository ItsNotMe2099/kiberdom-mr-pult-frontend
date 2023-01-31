import styles from './index.module.scss'
import Link from 'next/link'
import classNames from 'classnames'
import { IButton } from 'types/types'
import Spinner from '../Spinner'

interface Props extends IButton {
  children?: React.ReactNode
  disabled?: boolean
  spinner?: boolean
  href?: string
  className?: string
  fluid?: boolean
  target?: string
  color?: 'red' | 'blue' | 'green' | 'gray'
}

export default function Button(props: Props) {

  const getClassName = () => {
    return classNames(
      {
        [styles.fluid]: props.fluid,
        [styles.red]: props.color === 'red',
        [styles.blue]: props.color === 'blue',
        [styles.disabled]: props.disabled,
        [styles.green]: props.color === 'green',
        [styles.gray]: props.color === 'gray',
      }, props.className
    )

  }

  return props.href ?
    <Link
      href={props.href}
      onClick={props.onClick}
      target={props.target}
      className={`${styles.link} ${getClassName()}`}>

      {props.children}

    </Link>
    :
    <button onClick={props.onClick} type={props.type}
      disabled={props.disabled || props.spinner}
      className={`${styles.btn} ${getClassName()}`}>
      <span className={classNames({
        [styles.text]: true,
        [styles.textHidden]: props.spinner,
      })}>{props.children}</span>
      <div className={classNames({
        [styles.spinner]: true,
        [styles.spinnerVisible]: props.spinner,
      })}>
        <Spinner size={22} color="#fff" secondaryColor="rgba(255,255,255,0.4)" />
      </div>
    </button>
}

Button.defaultProps = {
  type: 'button',
}
