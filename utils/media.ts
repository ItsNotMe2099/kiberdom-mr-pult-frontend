
function isMedia(media: string, ssrValue = false) {
  if (typeof window === 'object' && window.matchMedia) {
    return window.matchMedia(media).matches
  }
  return ssrValue ?? false
}


export const isServer: boolean = typeof window === 'undefined'
export const isClient: boolean = typeof window !== 'undefined'
