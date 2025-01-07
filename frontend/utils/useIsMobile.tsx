import { useState, useEffect } from "react"

function useIsMobile(maxWidth = 767) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= maxWidth : false
  )

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= maxWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [maxWidth])

  return isMobile
}

export default useIsMobile
