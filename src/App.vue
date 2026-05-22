<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div style="font-family: 'vcr', sans-serif;" class="bg-[#0e0e0d] w-full h-screen p-10 relative">
    <div class="absolute bottom-0 left-0 left-column md:flex hidden items-end p-18">
      <div class="z-99 text-green-800 text-sm uppercase">
        <p>M.SC. Research in Media Engineering</p>
        <a
          href="/Anu_Ouseph_Resume.pdf"
          download="Anu_Ouseph_Resume.pdf"
          class="resume-link cursor-pointer"
        >→ Resume</a>
        <br>
        <a href="mailto:anuouseph04@gmail.com" class="cursor-pointer">→ Contact</a>
      </div>
    </div>
    <div class="absolute w-[500px] h-[300px] md:flex hidden top-0 right-0 bg-black"></div>
  <div class="w-full h-full border-[0.5px] border-[#ffffff44] flex-center relative z-[50]">
    <RouterView />
  </div>
  <div class="absolute bottom-34 -rotate-90 -left-19 text-[#ffffff88] text-xs flex gap-5 uppercase">
    <a href="https://www.linkedin.com/in/anuouseph/" target="_blank">_linkedIn</a>
    <a href="https://github.com/AnuOuseph" target="_blank">_github</a>
    <a href="https://x.com/anu_ouseph" target="_blank">_twitter</a>
  </div>
  <div class="absolute bottom-5 right-10 text-[#ffffff88] text-xs flex gap-5">
    <p>©anuouseph</p>
  </div>
  <div class="absolute top-10 right-10 text-white uppercase text-xs flex z-50">
    <div class="bg-image w-fit px-2 pl-3 py-1"><RouterLink to="/" active-class="text-red-900"><p>about</p></RouterLink></div>
    <div class="bg-image w-fit px-2 pr-3 py-1"><RouterLink to="/projects" active-class="text-blue-900"><p>projects</p></RouterLink></div>
  </div>
</div>
</template>
<style>
.bg-image{
  background-image: url('./assets/images/texture.png');
  background-color: rgb(174, 180, 186);
  background-size: contain;
  background-repeat: repeat;
  background-position: center;
  color: black;
}
.left-column {
  width: 600px;
  height: 350px;

  /* Gradient background */
  background: radial-gradient(
    circle at 20% 20%,
    rgba(255, 255, 255, 0.05),
    rgba(0, 0, 0, 0.9) 60%
  );

  background-size: 400% 400%;
  animation: drift 20s ease infinite;
}
</style>


