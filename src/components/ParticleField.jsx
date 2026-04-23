import { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function KineticSpheres({ darkMode, count = 180 }) {
  const instanced = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const data = useMemo(() => {
    const seeds = []
    const colors = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#5170FF'),
      new THREE.Color('#828AFF'),
      new THREE.Color('#41EAFF'),
      new THREE.Color('#FF6D4D'),
      new THREE.Color('#ffffff'),
    ]
    for (let i = 0; i < count; i++) {
      seeds.push({
        x: (Math.random() - 0.5) * 13.5,
        y: (Math.random() - 0.5) * 7.6,
        z: (Math.random() - 0.5) * 4.8,
        ampX: 0.08 + Math.random() * 0.14,
        ampY: 0.08 + Math.random() * 0.18,
        speed: 0.45 + Math.random() * 0.85,
        phase: Math.random() * Math.PI * 2,
        scale: 0.012 + Math.random() * 0.03,
      })
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { seeds, colors }
  }, [count])

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useLayoutEffect(() => {
    if (!instanced.current) return
    instanced.current.instanceColor = new THREE.InstancedBufferAttribute(data.colors, 3)
  }, [data.colors])

  useFrame(({ clock }) => {
    if (!instanced.current) return
    const t = clock.getElapsedTime()
    const mx = mouse.current.x
    const my = mouse.current.y
    for (let i = 0; i < count; i++) {
      const s = data.seeds[i]
      const px = s.x + Math.sin(t * s.speed + s.phase) * s.ampX + mx * 0.28
      const py = s.y + Math.cos(t * (s.speed * 0.9) + s.phase) * s.ampY + my * 0.2
      const pz = s.z + Math.sin(t * (s.speed * 0.7) + s.phase) * 0.08
      dummy.position.set(px, py, pz)
      dummy.scale.setScalar(s.scale)
      dummy.updateMatrix()
      instanced.current.setMatrixAt(i, dummy.matrix)
    }
    instanced.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={instanced} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        transparent
        opacity={darkMode ? 0.52 : 0.38}
        roughness={0.35}
        metalness={0.05}
        depthWrite={false}
      />
    </instancedMesh>
  )
}

function FloatingAccent({ darkMode }) {
  const ref = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.x = 2.55 + mouse.current.x * 0.34
    ref.current.position.y = -0.48 + Math.sin(t * 1.15) * 0.14 + mouse.current.y * 0.24
    ref.current.rotation.z = Math.sin(t * 0.9) * 0.18
    ref.current.rotation.y = t * 0.36
  })

  return (
    <mesh ref={ref}>
      <capsuleGeometry args={[0.12, 0.46, 8, 16]} />
      <meshStandardMaterial
        color={darkMode ? '#7A8BFF' : '#6C7BFF'}
        emissive={darkMode ? '#516AF0' : '#7A8BFF'}
        emissiveIntensity={darkMode ? 0.28 : 0.16}
        transparent
        opacity={darkMode ? 0.6 : 0.46}
        roughness={0.22}
        metalness={0.45}
      />
    </mesh>
  )
}

export default function ParticleField({ darkMode = true }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 58 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.34} />
        <pointLight position={[3, 4, 3]} color="#5170FF" intensity={1.05} />
        <pointLight position={[-3, -2, 3]} color="#FF6D4D" intensity={0.62} />
        <pointLight position={[0, 3, -3]} color="#41EAFF" intensity={0.36} />
        <KineticSpheres darkMode={darkMode} count={180} />
        <FloatingAccent darkMode={darkMode} />
      </Canvas>
    </div>
  )
}
