import { useState, useCallback } from "react"

const usePress = (timeout = 300) => {
  const [isPressed, setIsPressed] = useState(false)

  const handleClick: any = useCallback(() => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), timeout)
  }, [timeout])

  return [isPressed, handleClick]
}

export default usePress
