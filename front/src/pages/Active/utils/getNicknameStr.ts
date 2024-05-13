import { getShortenAddress } from '@ui/src'

export const getNicknameStr = (nickname: string) => {
  return `@${nickname.length > 12 ? getShortenAddress(nickname, 5, 4) : nickname}`
}

export const getNickname = (nickname: string) => {
  return `@${nickname}`
}
