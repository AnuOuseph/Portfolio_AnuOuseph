<template>
  <div ref="container" class="relative w-full h-full" />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  src: String
})

const container = ref(null)
let scene, camera, renderer, planeMesh
let mouse = new THREE.Vector2(0.5, 0.5)
let prevMouse = new THREE.Vector2(0.5, 0.5)
let targetMouse = new THREE.Vector2(0.5, 0.5)
let easeFactor = 0.02
let animationId
let aberrationIntensity = 0

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;
  uniform float u_aberrationIntensity;

  void main() {
    vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
    vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);

    vec2 direction = u_mouse - u_prevMouse;
    vec2 pixelDir = centerOfPixel - u_mouse;
    float distance = length(pixelDir);
    float strength = smoothstep(0.3, 0.0, distance);

    vec2 offset = strength * -direction * 0.2;
    vec2 uv = vUv - offset;

    vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
    vec4 colorG = texture2D(u_texture, uv);
    vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

    gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
  }
`

onMounted(() => {
  const width = container.value.offsetWidth
  const height = container.value.offsetHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(80, width / height, 0.01, 10)
  camera.position.z = 1

  const textureLoader = new THREE.TextureLoader()
  textureLoader.load(props.src, (texture) => {
    const uniforms = {
      u_mouse: { value: mouse.clone() },
      u_prevMouse: { value: prevMouse.clone() },
      u_aberrationIntensity: { value: 0.0 },
      u_texture: { value: texture }
    }

    planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader
      })
    )

    scene.add(planeMesh)

    renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(width, height)
    container.value.appendChild(renderer.domElement)

    animate()
  })

  container.value.addEventListener('mousemove', onMouseMove)
  container.value.addEventListener('mouseenter', onMouseEnter)
  container.value.addEventListener('mouseleave', onMouseLeave)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  container.value.removeEventListener('mousemove', onMouseMove)
  container.value.removeEventListener('mouseenter', onMouseEnter)
  container.value.removeEventListener('mouseleave', onMouseLeave)
})

function animate() {
  animationId = requestAnimationFrame(animate)

  mouse.lerp(targetMouse, easeFactor)
  planeMesh.material.uniforms.u_mouse.value.set(mouse.x, 1 - mouse.y)
  planeMesh.material.uniforms.u_prevMouse.value.set(prevMouse.x, 1 - prevMouse.y)

  aberrationIntensity = Math.max(0, aberrationIntensity - 0.05)
  planeMesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity

  renderer.render(scene, camera)
}

function onMouseMove(e) {
  const rect = container.value.getBoundingClientRect()
  prevMouse.copy(targetMouse)
  targetMouse.x = (e.clientX - rect.left) / rect.width
  targetMouse.y = (e.clientY - rect.top) / rect.height
  aberrationIntensity = 1
}

function onMouseEnter(e) {
  const rect = container.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  mouse.set(x, y)
  targetMouse.set(x, y)
}

function onMouseLeave() {
  easeFactor = 0.05
  targetMouse.copy(prevMouse)
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
