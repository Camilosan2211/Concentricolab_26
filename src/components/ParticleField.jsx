import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Soft morphing blob — the "cute" core object */
function MorphBlob({ darkMode }) {
  const mesh = useRef()
  const mouse = useRef([0,0])

  useMemo(()=>{
    const onMove = e => {
      mouse.current = [
        (e.clientX/window.innerWidth  - .5)*2,
        -(e.clientY/window.innerHeight - .5)*2,
      ]
    }
    window.addEventListener('mousemove', onMove, {passive:true})
    return ()=>window.removeEventListener('mousemove', onMove)
  },[])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!mesh.current) return
    const pos = mesh.current.geometry.attributes.position
    const orig= mesh.current.geometry.userData.orig
    if (!orig) return
    for (let i=0; i<pos.count; i++) {
      const ox=orig[i*3],oy=orig[i*3+1],oz=orig[i*3+2]
      const noise = Math.sin(ox*2+t*.9)*Math.cos(oy*2+t*.7)*Math.sin(oz*2+t*.6)*0.18
      pos.setXYZ(i, ox+ox*noise, oy+oy*noise, oz+oz*noise)
    }
    pos.needsUpdate=true
    mesh.current.rotation.y = t*.15 + mouse.current[0]*.12
    mesh.current.rotation.x = Math.sin(t*.2)*.08 + mouse.current[1]*.06
    mesh.current.position.x = mouse.current[0]*.25
    mesh.current.position.y = Math.sin(t*.6)*.12 + mouse.current[1]*.15
  })

  const geo = useMemo(()=>{
    const g = new THREE.IcosahedronGeometry(1.1, 5)
    const arr = Float32Array.from(g.attributes.position.array)
    g.userData.orig = arr
    return g
  },[])

  return (
    <mesh ref={mesh} geometry={geo}>
      <meshStandardMaterial
        color={darkMode ? '#5170FF' : '#6080FF'}
        emissive={darkMode ? '#3050CC' : '#4060CC'}
        emissiveIntensity={darkMode ? .55 : .35}
        roughness={0.25} metalness={0.55}
        transparent opacity={darkMode ? .82 : .75}
        wireframe={false}
      />
    </mesh>
  )
}

/* Concentric torus rings around blob */
function Rings({ darkMode }) {
  const group = useRef()
  useFrame(({clock})=>{
    const t=clock.getElapsedTime()
    if(!group.current) return
    group.current.rotation.z = t*.06
    group.current.rotation.x = Math.sin(t*.15)*.3
  })
  const radii=[1.65,2.1,2.55]
  const colors=['#828AFF','#41EAFF','#FF6D4D']
  return (
    <group ref={group}>
      {radii.map((r,i)=>(
        <mesh key={i} rotation={[Math.PI/2 + i*.55, i*.4, 0]}>
          <torusGeometry args={[r,.013-i*.001,16,90]}/>
          <meshStandardMaterial
            color={colors[i]} emissive={colors[i]}
            emissiveIntensity={.4} transparent opacity={.55-i*.08}
          />
        </mesh>
      ))}
    </group>
  )
}

/* Floating hex/sphere particles */
function Particles({ darkMode, count=260 }) {
  const mesh = useRef()
  const { positions, colors, speeds } = useMemo(()=>{
    const positions = new Float32Array(count*3)
    const colors    = new Float32Array(count*3)
    const speeds    = new Float32Array(count)
    const palette   = [
      new THREE.Color('#5170FF'),
      new THREE.Color('#828AFF'),
      new THREE.Color('#41EAFF'),
      new THREE.Color('#FF6D4D'),
      new THREE.Color('#ffffff'),
    ]
    for(let i=0;i<count;i++){
      positions[i*3]   = (Math.random()-.5)*14
      positions[i*3+1] = (Math.random()-.5)*9
      positions[i*3+2] = (Math.random()-.5)*6
      const c=palette[Math.floor(Math.random()*palette.length)]
      colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b
      speeds[i] = .2+Math.random()*.8
    }
    return {positions,colors,speeds}
  },[count])

  useFrame(({clock})=>{
    if(!mesh.current) return
    const t=clock.getElapsedTime()
    mesh.current.rotation.y = t*.03
    mesh.current.rotation.x = Math.sin(t*.02)*.06
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions,3]}/>
        <bufferAttribute attach="attributes-color"    args={[colors,3]}/>
      </bufferGeometry>
      <pointsMaterial
        size={0.045} vertexColors transparent
        opacity={darkMode ? .65 : .45} sizeAttenuation
      />
    </points>
  )
}

export default function ParticleField({ darkMode=true }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas camera={{position:[0,0,5.5],fov:58}} gl={{antialias:true,alpha:true}} style={{background:'transparent'}}>
        <ambientLight intensity={.35}/>
        <pointLight position={[4,4,4]}  color="#5170FF" intensity={2.5}/>
        <pointLight position={[-3,-2,3]} color="#FF6D4D" intensity={1.2}/>
        <pointLight position={[0,3,-3]}  color="#41EAFF" intensity={.8}/>
        <Particles darkMode={darkMode}/>
        <group position={[2, 0, -1.5]}>
          <MorphBlob darkMode={darkMode}/>
          <Rings darkMode={darkMode}/>
        </group>
      </Canvas>
    </div>
  )
}
