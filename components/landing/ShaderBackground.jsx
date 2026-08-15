"use client";

import React, { useEffect, useRef } from "react";

const ShaderBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let animationFrameId;
        let resizeObserver;

        function syncSize() {
            const w = canvas.clientWidth || window.innerWidth || 1280;
            const h = canvas.clientHeight || window.innerHeight || 720;
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
        }

        if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(syncSize);
            resizeObserver.observe(canvas);
        }
        syncSize();

        const gl =
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");
        if (!gl) return;

        const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

        const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
          vec2 uv = v_texCoord;
          vec2 mouse = u_mouse / u_resolution;
          vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
          
          // Distance accounting for screen aspect ratio
          float aspectDist = length((uv - mouse) * aspect);

          // Organic background waves
          float n = snoise(uv * 2.5 + u_time * 0.12);
          n += 0.5 * snoise(uv * 4.5 - u_time * 0.2);
          
          // Interactive ripple from mouse cursor
          float ripple = sin(aspectDist * 18.0 - u_time * 3.0) * exp(-aspectDist * 3.0);
          n += ripple * 0.4;
          
          vec3 color1 = vec3(0.31, 0.27, 0.90); // Electric Indigo #4f46e5
          vec3 color2 = vec3(0.97, 0.98, 1.0);  // Soft surface off-white #f8f9ff
          vec3 color3 = vec3(0.72, 0.80, 0.94); // Deep blue-gray tint #cbdbf5
          
          vec3 finalColor = mix(color2, color3, uv.y + n * 0.35);
          finalColor = mix(finalColor, color1, clamp(n * 0.7 + (1.0 - uv.y) * 0.5 - 0.1, 0.0, 1.0) * 0.3);
          
          // Cursor radial glow spotlight
          float cursorGlow = (1.0 - smoothstep(0.0, 0.4, aspectDist));
          finalColor += color1 * cursorGlow * 0.35;

          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

        function cs(type, src) {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        }

        const prog = gl.createProgram();
        gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
        gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
        gl.linkProgram(prog);
        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW,
        );

        const pos = gl.getAttribLocation(prog, "a_position");
        gl.enableVertexAttribArray(pos);
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

        const uTime = gl.getUniformLocation(prog, "u_time");
        const uRes = gl.getUniformLocation(prog, "u_resolution");
        const uMouse = gl.getUniformLocation(prog, "u_mouse");

        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const handleMouseMove = (event) => {
            const nx = event.clientX;
            const ny = window.innerHeight - event.clientY;
            mouse.x = nx;
            mouse.y = ny;
        };

        window.addEventListener("mousemove", handleMouseMove);

        function render(t) {
            if (typeof ResizeObserver === "undefined") syncSize();
            gl.viewport(0, 0, canvas.width, canvas.height);
            if (uTime) gl.uniform1f(uTime, t * 0.001);
            if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
            if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animationFrameId = requestAnimationFrame(render);
        }

        animationFrameId = requestAnimationFrame(render);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (resizeObserver) resizeObserver.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-90">
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
};

export default ShaderBackground;
