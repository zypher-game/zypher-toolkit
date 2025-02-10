import { UAParser } from 'ua-parser-js'

const parser = new UAParser(window.navigator.userAgent)
const { type } = parser.getDevice()
const { name } = parser.getBrowser()

export const isH5 = type === 'mobile' || type === 'tablet'
const platform = parser.getOS().name
export const isIOS = platform === 'iOS'
export const isNonIOSPhone = !isIOS && type === 'mobile'

export const isMobileSafari = isH5 && isIOS && name?.toLowerCase().includes('safari')
