import { destroyBrowser, getFollowerCount } from 'follower-count'
import React, { memo } from 'react'
const ButtonFollowerCount = memo(() => {
  const onclick = async () => {
    const a = await getFollowerCount({
      type: 'twitter',
      username: 'Zypher_network'
    })
    await destroyBrowser()
  }
  return (
    <button onClick={onclick}>
      <h1>buttonFollowerCount</h1>
    </button>
  )
})
export default ButtonFollowerCount
