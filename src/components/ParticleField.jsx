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
      new THREE.Color('#4D66FF'),
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
const SHAPE_DATA = [
  { type: 'box',          color: '#4D66FF', emissive: '#3050CC', x: -3.8, y:  1.6, z: -1.2, scale: 0.18, speed: 0.28, phase: 0.0  },
  { type: 'octahedron',   color: '#FF6D4D', emissive: '#CC4020', x:  3.2, y: -1.1, z: -0.9, scale: 0.22, speed: 0.21, phase: 1.1  },
  { type: 'cone',         color: '#41EAFF', emissive: '#20B8CC', x: -1.4, y: -2.4, z: -1.5, scale: 0.17, speed: 0.33, phase: 2.2  },
  { type: 'box',          color: '#828AFF', emissive: '#5060CC', x:  2.6, y:  2.2, z: -2.0, scale: 0.14, speed: 0.18, phase: 3.3  },
  { type: 'octahedron',   color: '#FF6D4D', emissive: '#AA3A1C', x: -4.4, y: -0.6, z: -1.8, scale: 0.19, speed: 0.24, phase: 0.7  },
  { type: 'cone',         color: '#4D66FF', emissive: '#3050CC', x:  4.1, y:  0.8, z: -1.4, scale: 0.15, speed: 0.30, phase: 1.8  },
  { type: 'box',          color: '#41EAFF', emissive: '#18A0B8', x:  0.4, y:  2.9, z: -2.4, scale: 0.12, speed: 0.22, phase: 4.1  },
  { type: 'octahedron',   color: '#828AFF', emissive: '#5060AA', x: -2.2, y:  0.3, z: -2.1, scale: 0.21, speed: 0.16, phase: 2.9  },
]

function FlatShapes({ darkMode }) {
  const refs = useRef([])
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const d = SHAPE_DATA[i]
      mesh.position.x = d.x + Math.sin(t * d.speed + d.phase) * 0.22 + mouse.current.x * 0.12
      mesh.position.y = d.y + Math.cos(t * d.speed * 0.85 + d.phase) * 0.18 + mouse.current.y * 0.09
      mesh.rotation.x = t * d.speed * 0.6 + d.phase
      mesh.rotation.y = t * d.speed * 0.9
    })
  })

  const opacity = darkMode ? 0.55 : 0.35

  return (
    <>
      {SHAPE_DATA.map((d, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} position={[d.x, d.y, d.z]} scale={d.scale}>
          {d.type === 'box'        && <boxGeometry args={[1, 1, 1]} />}
          {d.type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
          {d.type === 'cone'       && <coneGeometry args={[0.8, 1.6, 5, 1]} />}
          <meshPhongMaterial
            color={d.color}
            emissive={d.emissive}
            emissiveIntensity={darkMode ? 0.35 : 0.18}
            transparent
            opacity={opacity}
            flatShading={true}
            shininess={30}
          />
        </mesh>
      ))}
    </>
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
        <pointLight position={[3, 4, 3]} color="#4D66FF" intensity={1.05} />
        <pointLight position={[-3, -2, 3]} color="#FF6D4D" intensity={0.62} />
        <pointLight position={[0, 3, -3]} color="#41EAFF" intensity={0.36} />
        <KineticSpheres darkMode={darkMode} count={180} />
        <FloatingAccent darkMode={darkMode} />
        <FlatShapes darkMode={darkMode} />
      </Canvas>
    </div>
  )
}
