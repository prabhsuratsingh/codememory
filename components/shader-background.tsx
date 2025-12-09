"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const positionBufferRef = useRef<WebGLBuffer | null>(null)
  const positionLocationRef = useRef<number>(0)
  const resolutionLocationRef = useRef<WebGLUniformLocation | null>(null)
  const timeLocationRef = useRef<WebGLUniformLocation | null>(null)
  const isDarkLocationRef = useRef<WebGLUniformLocation | null>(null)
  const animationIdRef = useRef<number>(0)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
    if (!gl) return

    glRef.current = gl

    const isDark = resolvedTheme === "dark"

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader - Git-themed flowing grid with branches
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_isDark;
      
      // Noise function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      // Draw a glowing line
      float line(vec2 p, vec2 a, vec2 b, float width) {
        vec2 pa = p - a;
        vec2 ba = b - a;
        float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        float d = length(pa - ba * h);
        return smoothstep(width, 0.0, d);
      }
      
      // Git branch pattern
      float branchPattern(vec2 uv, float time) {
        float pattern = 0.0;
        
        // Vertical flowing lines (like git history)
        for (float i = 0.0; i < 5.0; i++) {
          float x = 0.1 + i * 0.2;
          float offset = sin(time * 0.3 + i * 1.5) * 0.02;
          float lineGlow = smoothstep(0.015, 0.0, abs(uv.x - x - offset));
          
          // Add flowing particles along the line
          float particleY = fract(uv.y * 3.0 - time * 0.2 - i * 0.3);
          float particle = smoothstep(0.1, 0.0, abs(particleY - 0.5)) * lineGlow * 2.0;
          
          pattern += lineGlow * 0.3 + particle * 0.5;
        }
        
        // Horizontal connections (merge lines)
        for (float i = 0.0; i < 3.0; i++) {
          float y = fract(0.2 + i * 0.35 + time * 0.05);
          float x1 = 0.1 + mod(i, 3.0) * 0.2;
          float x2 = x1 + 0.2;
          
          if (uv.y > y - 0.01 && uv.y < y + 0.01) {
            if (uv.x > x1 && uv.x < x2) {
              pattern += smoothstep(0.01, 0.0, abs(uv.y - y)) * 0.4;
            }
          }
        }
        
        return pattern;
      }
      
      // Commit nodes
      float commitNodes(vec2 uv, float time) {
        float nodes = 0.0;
        
        for (float i = 0.0; i < 8.0; i++) {
          float x = 0.1 + mod(i, 5.0) * 0.2;
          float y = fract(0.1 + i * 0.15 - time * 0.03);
          float offset = sin(time * 0.3 + i * 1.5) * 0.02;
          
          vec2 nodePos = vec2(x + offset, y);
          float d = length(uv - nodePos);
          
          // Glowing node
          nodes += smoothstep(0.025, 0.0, d) * 0.8;
          // Outer glow
          nodes += smoothstep(0.06, 0.0, d) * 0.2;
        }
        
        return nodes;
      }
      
      // Grid pattern
      float grid(vec2 uv, float scale) {
        vec2 grid = abs(fract(uv * scale - 0.5) - 0.5) / fwidth(uv * scale);
        float line = min(grid.x, grid.y);
        return 1.0 - min(line, 1.0);
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 uvCentered = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
        
        // Background color
        vec3 bgColor = u_isDark > 0.5 
          ? vec3(0.04, 0.04, 0.06) 
          : vec3(0.97, 0.97, 0.98);
        
        // Git green color
        vec3 gitGreen = u_isDark > 0.5 
          ? vec3(0.2, 0.8, 0.4) 
          : vec3(0.1, 0.6, 0.3);
        
        // Secondary accent (orange for commits)
        vec3 accent = u_isDark > 0.5 
          ? vec3(0.9, 0.5, 0.2) 
          : vec3(0.8, 0.4, 0.1);
        
        // Subtle grid
        float gridPattern = grid(uv, 30.0) * 0.03;
        
        // Flowing noise background
        float flow = fbm(uvCentered * 2.0 + u_time * 0.1);
        flow += fbm(uvCentered * 4.0 - u_time * 0.05) * 0.5;
        flow = flow * 0.08;
        
        // Branch pattern
        float branches = branchPattern(uv, u_time);
        
        // Commit nodes
        float commits = commitNodes(uv, u_time);
        
        // Combine
        vec3 color = bgColor;
        
        // Add subtle flow
        color += flow * gitGreen * 0.3;
        
        // Add grid
        color += gridPattern * gitGreen * 0.5;
        
        // Add branches
        color += branches * gitGreen * (u_isDark > 0.5 ? 0.4 : 0.25);
        
        // Add commit nodes with accent color
        color += commits * accent * (u_isDark > 0.5 ? 0.6 : 0.4);
        
        // Vignette
        float vignette = 1.0 - length(uvCentered) * 0.5;
        color *= vignette;
        
        // Add subtle scanlines for terminal feel
        float scanline = sin(gl_FragCoord.y * 1.5) * 0.02 + 1.0;
        color *= u_isDark > 0.5 ? scanline : 1.0;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Compile shader
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    // Create program
    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram()
      if (!program) return null
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program)
        return null
      }
      return program
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    if (!vertexShader || !fragmentShader) return

    const program = createProgram(gl, vertexShader, fragmentShader)
    if (!program) return

    programRef.current = program

    // Set up geometry
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)

    positionBufferRef.current = positionBuffer

    const positionLocation = gl.getAttribLocation(program, "a_position")
    positionLocationRef.current = positionLocation

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    resolutionLocationRef.current = resolutionLocation

    const timeLocation = gl.getUniformLocation(program, "u_time")
    timeLocationRef.current = timeLocation

    const isDarkLocation = gl.getUniformLocation(program, "u_isDark")
    isDarkLocationRef.current = isDarkLocation

    // Resize handler
    function resize() {
      if (!canvas) return
      const displayWidth = canvas.clientWidth
      const displayHeight = canvas.clientHeight
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
      }
    }

    // Animation loop
    function render() {
      const gl = glRef.current
      const program = programRef.current
      const positionBuffer = positionBufferRef.current
      const positionLocation = positionLocationRef.current
      const resolutionLocation = resolutionLocationRef.current
      const timeLocation = timeLocationRef.current
      const isDarkLocation = isDarkLocationRef.current
      const animationId = animationIdRef.current
      const startTime = startTimeRef.current

      resize()
      if (!gl || !program) return

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl["useProgram"](program)

      gl.enableVertexAttribArray(positionLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
      gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000)
      gl.uniform1f(isDarkLocation, isDark ? 1.0 : 0.0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationIdRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationIdRef.current)
      const gl = glRef.current
      const program = programRef.current
      const vertexShader = gl?.getAttachedShaders(program)?.[0]
      const fragmentShader = gl?.getAttachedShaders(program)?.[1]

      if (gl) {
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
      }
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" style={{ pointerEvents: "none" }} />
}
