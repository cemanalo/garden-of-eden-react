import { useState, useEffect } from 'react';

export default function useStickyState(deafultValue, key) {
  const [ value, setValue ] = useState(() => {
    const stickyValue = window.localStorage.getItem(key)

    return stickyValue !== null ? JSON.parse(stickyValue) : deafultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [ key, value ])

  return [ value, setValue ]
}