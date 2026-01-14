<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';

// List of image URLs
const images = [
  new URL('../assets/images/hoomans.png', import.meta.url).href,
  new URL('../assets/images/lyst.png', import.meta.url).href,
  new URL('../assets/images/baystreet.png', import.meta.url).href,
  new URL('../assets/images/lagom.png', import.meta.url).href
];

const projects = [
  {
    "image":new URL('../assets/images/hoomans.png', import.meta.url).href,
    "title":"HOOMANS.CO",
    "context":"Marketing website designed to communicate brand identity through motion and interaction.",
    "role":[
      "Complex scroll-driven storytelling combined with interactive D3.js data visualizations.",
      "Implemented scroll-driven animations across pages",
      "Built interactive D3.js data visualizations",
      "Optimized animation performance for smooth user experience"
    ],
    "tech":[
      "Vue.js",
      "D3.js",
      "GSAP",
      "Tailwind CSS"
    ],
    "link":"https://hoomans.co",
    "label": "hoomans.co"
  },
  {
    "image":new URL('../assets/images/lyst.png', import.meta.url).href,
    "title":"lyst.so",
    "context":"Real-time digital signage CMS used to manage and sync content across 500+ distributed displays.",
    "role":[
      "Built a real-time digital signage cms for managing distributed screens",
      "Implemented WebSocket-based sync achieving <200ms latency",
      "Scalable architecture supporting hundreds of concurrent devices",
      "Deployed and maintained the platform on AWS (Lightsail, S3) with automated CI/CD pipelines"
    ],
    "tech":[
      "Vue.js",
      "Golang",
      "WebSockets",
      "PostgreSQL",
      "AWS",
      "Tailwind CSS"
    ],
    "link":"https://lyst.so",
    "label": "lyst.so"
  },
  {
    "image":new URL('../assets/images/baystreet.png', import.meta.url).href,
    "title":"Baystreet.finance",
    "context":"Responsive financial services website built and shipped in a one-week sprint.",
    "role":[
      "Built a multi-section, responsive layout in a 1-week sprint",
      "Implemented subtle animations to enhance user experience without distraction",
      "Ensured cross-device compatibility and accessibility-friendly structure"
    ],
    "tech":[
      "Vue.js",
      "GSAP",
      "Tailwind CSS"
    ],
    "link":"https://baystreet.finance",
    "label": "baystreet.finance"
  },
  {
    "image":new URL('../assets/images/lagom.png', import.meta.url).href,
    "title":"Lagom.app",
    "context":"Marketing website for a digital wellness product, focused on visualizing user behavior and usage trends.",
    "role":[
      "Built animated charts and transitions to visualize usage trends",
      "Data-driven UI using animated visual feedback",
      "Focused on smooth interactions and responsive layouts",
      "Balanced animation, performance, and clarity of information"
    ],
    "tech":[
      "Vue.js",
      "D3.js",
      "GSAP",
      "Tailwind CSS"
    ],
    "link":"https://findlagom.app",
    "label": "findlagom.app"
  },
];

const canvasContainers = ref([]);
const imageElements = ref([]);

let easeFactor = 0.02;
let mousePosition = { x: 0.5, y: 0.5 };
let targetMousePosition = { x: 0.5, y: 0.5 };
let prevPosition = { x: 0.5, y: 0.5 };
let aberrationIntensity = 0.0;

const scenes = [], cameras = [], renderers = [], planeMeshes = [];

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_texture;    
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;
  uniform float u_aberrationIntensity;

  void main() {
    vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
    vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
    
    vec2 mouseDirection = u_mouse - u_prevMouse;
    vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
 
    vec2 uvOffset = strength * - mouseDirection * 0.2;
    vec2 uv = vUv - uvOffset;

    vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
    vec4 colorG = texture2D(u_texture, uv);
    vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

    gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
  }
`;

function initShaderScene(index, texture) {
  const container = canvasContainers.value[index];
  const rect = container.getBoundingClientRect();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(80, rect.width / rect.height, 0.01, 10);
  camera.position.z = 1;

  const uniforms = {
    u_mouse: { value: new THREE.Vector2() },
    u_prevMouse: { value: new THREE.Vector2() },
    u_aberrationIntensity: { value: 0.0 },
    u_texture: { value: texture }
  };

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    })
  );

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(rect.width, rect.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.inset = "0";

  container.appendChild(renderer.domElement);
  scene.add(mesh);

  scenes.push(scene);
  cameras.push(camera);
  renderers.push(renderer);
  planeMeshes.push(mesh);
}

function animateAll() {
  requestAnimationFrame(animateAll);

  mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
  mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

  planeMeshes.forEach((mesh, i) => {
    mesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);
    mesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y);
    mesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity;
    renderers[i].render(scenes[i], cameras[i]);
  });

  aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
}

function handleMouseMove(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  prevPosition = { ...targetMousePosition };

  targetMousePosition.x = (event.clientX - rect.left) / rect.width;
  targetMousePosition.y = (event.clientY - rect.top) / rect.height;

  aberrationIntensity = 1;
}

function handleMouseEnter(event) {
  easeFactor = 0.02;
  const rect = event.currentTarget.getBoundingClientRect();

  mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width;
  mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height;
}

function handleMouseLeave() {
  easeFactor = 0.05;
  targetMousePosition = { ...prevPosition };
}

onMounted(() => {
  imageElements.value.forEach((img, index) => {
    const texture = new THREE.TextureLoader().load(img.src, () => {
      initShaderScene(index, texture);
      if (index === 0) animateAll(); // start animation once
    });
  });

  const container = document.getElementById("imageContainer");
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseenter", handleMouseEnter);
  container.addEventListener("mouseleave", handleMouseLeave);
});
</script>

<template>
  <div
    id="imageContainer"
    class="overflow-x-auto snap-x snap-mandatory flex w-full h-[600px] scroll-smooth "
  >
    <div
      v-for="(image, index) in projects"
      :key="index"
      id="image-div"
      class="relative w-[100%] h-[400px] mt-[100px] flex-shrink-0 opacity-80 -translate-x-[250px]"
      :ref="el => canvasContainers[index] = el"
    >
      <img
        :src="image.image"
        alt=""
        class="hidden"
        :ref="el => imageElements[index] = el"
      />
      <div class="absolute -right-30 -top-10 text-white uppercase w-[500px] opacity-80">
        <p>{{ index+1 }}.</p>
        <br>
        <p>[ {{ image.title }} ]</p>
        <br>
        <p>Crafted with the team at Hoomans </p>
        <br>
        <p>Key Contributions: </p>
        <ul v-for="(item, index) in image.role" :key="index">
          <li>{{ item }}</li>
        </ul>
        <br>
        <p>Made with:</p>
        <div class="flex flex-wrap gap-2">
          <span v-for="(item, index) in image.tech" :key="index">
            {{ item }}<span v-if="index < image.tech.length - 1"> · </span>
          </span>
        </div>
        <br>
        <p>View Project:</p>
        <a
          :href="image.link"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:opacity-70 transition"
        >
          {{ image.label || image.link }}
        </a>
      </div>
    </div>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

canvas {
  display: block;
}
img.hidden {
  display: none !important;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  width: 0;
  height: 0;
}
#image-div{
  filter: saturate(80%);
  transition: all ease 0.5s;
}
#image-div:hover {
  filter: saturate(100%);
}
</style>
