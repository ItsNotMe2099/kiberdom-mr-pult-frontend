import {HTMLInputTypeAttribute, MouseEventHandler} from 'react'
import {FieldConfig} from 'formik'
import { UrlObject } from 'url'


export class RequestError extends Error{
  message: string
  code: number
  isNotFoundError: boolean

  constructor(message: string, code: number) {
    super(message)
    this.message = message
    this.code = code
    this.isNotFoundError = code === 404
  }
}

export interface IField<T> extends FieldConfig<T> {
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  error?: string
  disabled?: boolean
}

export interface IButton {
  type?: 'submit' | 'reset' | 'button' | undefined
  form?: string
  spinner?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler
  href?: string | UrlObject
  isExternalHref?: boolean // add target blank and no referrer
}
