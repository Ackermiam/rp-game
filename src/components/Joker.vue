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
}>();
</script>

<style scoped>
.Joker {
  margin: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.Joker:hover {
  filter: drop-shadow(0 0 10px rgba(201, 164, 0, 0.726));
  transform: scale(1.1);
}

.Joker__image-wrapper {
  position: relative;
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
  color: rgb(201, 164, 0);
  font-size: 0.9vw;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  margin: 0;
  pointer-events: none;
  text-align: center;
  padding: 0 20px;
  margin-bottom: 10px;
}

.Joker__description {
  color: #fff;
  font-size: 0.8vw;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  margin: 0;
  pointer-events: none;
  text-align: center;
  padding: 0 20px;
}

@media (max-width: 1200px) {
  .Joker__name {
    font-size: 1.2vw;
  }
  .Joker__description {
    font-size: 1.1vw;
  }

  .Joker__img {
    max-width: 110px;
    width: 16vw;
  }
}

@media (max-width: 800px) {
  .Joker__name {
    font-size: 1.1vw;
  }
  .Joker__description {
    font-size: 0.9vw;
  }
  .Joker__img {
    max-width: 80px;
    width: 16vw;
  }
}
</style>
