const projects = [
  {
    "image":new URL('../src/assets/images/hoomans.webp', import.meta.url).href,
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
    "label": "hoomans.co",
    "contribution": "crafted with the team at hoomans.co"
  },
  {
    "image":new URL('../src/assets/images/lyst.webp', import.meta.url).href,
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
    "label": "lyst.so",
    "contribution": "crafted with the team at hoomans.co"
  },
  {
    "image":new URL('../src/assets/images/baystreet.webp', import.meta.url).href,
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
    "label": "baystreet.finance",
    "contribution": "crafted with the team at hoomans.co"
  },
  {
    "image":new URL('../src/assets/images/lagom.webp', import.meta.url).href,
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
    "label": "findlagom.app",
    "contribution": "crafted with the team at hoomans.co"
  },
  {
    "image":new URL('../src/assets/images/mira.webp', import.meta.url).href,
    "title":"mira",
    "context":"Marketing website for a digital wellness product, focused on visualizing user behavior and usage trends.",
    "role":[
      "Built a full-stack music analysis and comparison tool whereusers upload audio and get tempo, key, genre, mood, and instrument features extracted in real time",
      "Implemented music similarity comparison using weighted cosine similarity over MFCC, chroma, and spectral feature vectors",
    ],
    "tech":[
      "Next.js", 
      "FastAPI", 
      "Python", 
      "Librosa", 
      "Hugging Face"
    ],
    "link":"https://mir-a.vercel.app",
    "label": "mira",
    "contribution": "personal project"
  },
  {
    "image":new URL('../src/assets/images/ar.webp', import.meta.url).href,
    "title":"spatial",
    "context":"Marketing website for a digital wellness product, focused on visualizing user behavior and usage trends.",
    "role":[
      "Browser-based 3D furniture configurator using real GLTF models with drag-to-rotate orbit controls and real-time material switching",
      "Implemented scene graph traversal and material cloning for per-part customization on multi-mesh models",
    ],
    "tech":[
      "React", 
      "Three.js", 
      "react-three-fiber", 
      "Tailwind CSS",
    ],
    "link":"https://spatial-ar-furniture-configurator.vercel.app/",
    "label": "spatial",
    "contribution": "personal project"
  },
];

export default projects;