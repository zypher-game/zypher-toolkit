import { useEffect, useRef, useState } from 'react';

export function useEffectValue<T>(init: T, handler: () => Promise<T>, deps: any[]) {
  const [state, _state] = useState<T>(init);
  const ref = useRef(1);

  useEffect(() => {
    ref.current++;
    const id = ref.current;
    handler().then((res) => {
      if (ref.current !== id) return;
      _state(res);
    });
  }, deps);
  return state;
}
