<template>
  <div class="Joker">
    <div class="Joker__image-wrapper">
      <img class="Joker__img" :src="img" />
      <div>
        <p class="Joker__name">{{ name }}</p>
        <p class="Joker__description">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  description: string;
  img: string;
}>()
</script>

<style scoped>
.Joker {
  margin: 15px;
  cursor: pointer;
  transition: all .3s ease;
}
.Joker:hover {
  filter: drop-shadow(0 0 10px rgba(201, 164, 0, 0.726));
  transform: scale(1.1);
}

.Joker__image-wrapper {
  position: relative; /* Conteneur de l'image et du texte, permet de superposer le texte */
  display: flex;
  justify-content: center;
  align-items: center;
}

.Joker__image-wrapper div {
  position: absolute;
}

.Joker__img {
  display: block;
  max-width: 170px;
  width: 13vw;
  aspect-ratio: 535/756;
  object-fit: contain;
  pointer-events: none;
}

.Joker__name {
  color: rgb(201, 164, 0); /* Pour que le texte soit visible sur l'image */
  font-size: .9vw;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  margin: 0;
  pointer-events: none; /* Pour que le texte ne bloque pas les clics */
  text-align: center;
  padding: 0 20px;
  margin-bottom: 10px;
}

.Joker__description {
  color: #fff; /* Pour que le texte soit visible sur l'image */
  font-size: .8vw;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  margin: 0;
  pointer-events: none; /* Pour que le texte ne bloque pas les clics */
  text-align: center;
  padding: 0 20px;
}

@media (max-width: 1200px) {
  .Joker__name {
    font-size: 1.3vw; /* Taille de police pour les écrans de moins de 1200px */
  }
  .Joker__description {
    font-size: 1.2vw; /* Taille de police pour les écrans de moins de 1200px */
  }
}
</style>
