// Signal Noir reminder: WarpText is a restrained glass-signal accent; preserve readable fallback copy and reduced-motion behavior.
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Texture } from "ogl";
import "./WarpText.css";

type WarpTextProps = { text: string; className?: string; color?: string; fontSize?: string; fontWeight?: number; style?: React.CSSProperties };
const vertex = `attribute vec2 position; attribute vec2 uv; varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}`;
const fragment = `precision highp float; uniform sampler2D uText; uniform vec2 uPointer; uniform float uTime; uniform float uActive; varying vec2 vUv; float n(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);} void main(){vec2 d=vUv-uPointer; float lens=smoothstep(.42,0.,length(d))*uActive; vec2 warp=vec2(sin(vUv.y*18.+uTime*1.4),cos(vUv.x*16.-uTime))*0.006*lens; warp+=vec2(sin(vUv.y*9.+uTime),cos(vUv.x*11.+uTime))*0.004; vec2 uv=vUv+warp; vec4 c=texture2D(uText,uv); float glow=lens*c.a*.16; gl_FragColor=vec4(c.rgb+vec3(glow,.03,0.),c.a);}`;

export default function WarpText({ text, className = "", color = "#fffaf4", fontSize = "clamp(2rem, 6vw, 5rem)", fontWeight = 800, style }: WarpTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current; if (!container) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderer: any, program: any, texture: any, raf = 0, disposed = false;
    const pointer = { x: .5, y: .5, tx: .5, ty: .5, active: 0, target: 0 };
    const canvasText = document.createElement("canvas");
    const ctx = canvasText.getContext("2d");
    if (!ctx) return;
    try { renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) }); } catch { return; }
    const gl = renderer.gl; gl.clearColor(0,0,0,0); texture = new Texture(gl, { generateMipmaps: false });
    program = new Program(gl, { vertex, fragment, transparent: true, uniforms: { uText: { value: texture }, uPointer: { value: [0.5,0.5] }, uTime: { value: 0 }, uActive: { value: 0 } } });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program }); container.appendChild(gl.canvas);
    const rasterize = () => { const rect = container.getBoundingClientRect(); if (!rect.width || !rect.height) return; const dpr = Math.min(window.devicePixelRatio || 1, 2); canvasText.width = rect.width*dpr; canvasText.height = rect.height*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,rect.width,rect.height); ctx.fillStyle = color; ctx.textAlign = "center"; ctx.textBaseline = "middle"; const lines = text.split("\n"); const baseSize = Math.min(parseFloat(getComputedStyle(container).fontSize) || 48, rect.height*.76/Math.max(lines.length,1)); const family = getComputedStyle(container).fontFamily; ctx.font = `${fontWeight} ${baseSize}px ${family}`; const widest = Math.max(...lines.map((line) => ctx.measureText(line).width), 1); const fit = Math.min(1, (rect.width*.92)/widest, (rect.height*.76)/(baseSize*.94*Math.max(lines.length,1))); const size = baseSize*fit; ctx.font = `${fontWeight} ${size}px ${family}`; const lineHeight = size*.94; const start = rect.height/2 - (lines.length-1)*lineHeight/2; lines.forEach((line,index) => ctx.fillText(line, rect.width/2, start+index*lineHeight)); texture.image = canvasText; texture.needsUpdate = true; };
    const resize = () => { const rect = container.getBoundingClientRect(); if (!rect.width || !rect.height) return; renderer.setSize(rect.width, rect.height); rasterize(); };
    const move = (e: PointerEvent) => { const r = container.getBoundingClientRect(); pointer.tx=(e.clientX-r.left)/r.width; pointer.ty=1-(e.clientY-r.top)/r.height; pointer.target=1; };
    const leave = () => { pointer.target=0; };
    const loop = (time: number) => { if (disposed) return; pointer.x += (pointer.tx-pointer.x)*.12; pointer.y += (pointer.ty-pointer.y)*.12; pointer.active += ((pointer.target?1:.16)-pointer.active)*.08; program.uniforms.uPointer.value=[pointer.x,pointer.y]; program.uniforms.uActive.value=reduced.matches?0:pointer.active; program.uniforms.uTime.value=reduced.matches?0:time*.001; renderer.render({ scene: mesh }); raf=requestAnimationFrame(loop); };
    const observer = new ResizeObserver(resize); observer.observe(container); container.addEventListener("pointermove", move); container.addEventListener("pointerleave", leave); resize(); raf=requestAnimationFrame(loop);
    return () => { disposed=true; cancelAnimationFrame(raf); observer.disconnect(); container.removeEventListener("pointermove",move); container.removeEventListener("pointerleave",leave); if (gl.canvas.parentNode===container) container.removeChild(gl.canvas); gl.getExtension("WEBGL_lose_context")?.loseContext(); };
  }, [text, color, fontWeight]);
  return <span ref={ref} className={`warp-text ${className}`.trim()} style={{ ...style, fontSize }} role="img" aria-label={text}><span className="warp-text-fallback">{text}</span></span>;
}
