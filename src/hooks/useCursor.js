import { useEffect } from 'react'
export function useCursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return
    const dot = document.querySelector('.cur-dot')
    const ring= document.querySelector('.cur-ring')
    if (!dot||!ring) return
    let mx=0,my=0,rx=0,ry=0,vis=false
    const mv=(e)=>{ mx=e.clientX;my=e.clientY; dot.style.left=mx+'px';dot.style.top=my+'px'; if(!vis){vis=true;dot.style.opacity='1';ring.style.opacity='.55'} }
    let raf
    const loop=()=>{ rx+=(mx-rx)*.1; ry+=(my-ry)*.1; ring.style.left=rx+'px';ring.style.top=ry+'px'; raf=requestAnimationFrame(loop) }
    loop()
    const ov=(e)=>{ if(e.target.closest('a,button,[data-mag]')) ring.classList.add('hov','lnk') }
    const ou=(e)=>{ if(e.target.closest('a,button,[data-mag]')) ring.classList.remove('hov','lnk') }
    const od=()=>{ dot.style.transform='translate(-50%,-50%) scale(.55)' }
    const ou2=()=>{ dot.style.transform='translate(-50%,-50%) scale(1)' }
    document.addEventListener('mousemove',mv,{passive:true})
    document.addEventListener('mouseover',ov)
    document.addEventListener('mouseout',ou)
    document.addEventListener('mousedown',od)
    document.addEventListener('mouseup',ou2)
    return ()=>{ cancelAnimationFrame(raf); document.removeEventListener('mousemove',mv); document.removeEventListener('mouseover',ov); document.removeEventListener('mouseout',ou); document.removeEventListener('mousedown',od); document.removeEventListener('mouseup',ou2) }
  },[])
}
