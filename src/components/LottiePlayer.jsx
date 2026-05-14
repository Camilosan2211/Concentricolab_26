import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

export default function LottiePlayer({ src, loop = true, autoplay = true, speed = 1 }) {
  const containerRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      path: src,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        progressiveLoad: true,
      },
    })

    anim.setSpeed(speed)
    animRef.current = anim

    return () => anim.destroy()
  }, [src, loop, autoplay, speed])

  return <div ref={containerRef} className="w-full h-full" />
}
