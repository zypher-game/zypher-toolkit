import { Snow } from 'jparticles'
import { useEffect } from 'react'

export const useSnow = () => {
  useEffect(() => {
    try {
      // eslint-disable-next-line no-new
      new Snow('#snow', {
        maxR: 2,
        minR: 1,
        maxSpeed: 3,
        minSpeed: 1,
        swing: false,
        num: 1,
        swingProbability: 0,
        shape: ['circle', 'circle:0.2:0.2', 'circle:0.5:0.5']
        // shape: ['circle', 'snow']
      } as any)
    } catch {
      //
    }
  }, [])
}
