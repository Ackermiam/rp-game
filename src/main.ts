import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Particles from '@tsparticles/vue3';
//import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import { loadSlim } from "@tsparticles/slim";

createApp(App).use(Particles, {
  init: async engine => {
    // await loadFull(engine);
    await loadSlim(engine);
  }
}).mount("#app");
