<template>
  <button class="btn" :class="filled ? 'btn--filled' : 'btn--empty'">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  filled: boolean;
}>();
</script>

<style scoped>
.btn {
  text-decoration: none;
  border: 1px solid rgb(201, 164, 0);
  position: relative;
  overflow: hidden;
  text-shadow: 2px 2px 10px rgb(255, 208, 0);
  min-width: 100px;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.4s ease;
}

.btn:hover {
  transform: scale(1.1);
}

.btn--filled {
  background: rgb(201, 164, 0);
  color: #ffffff;
}

.btn--filled:hover {
  background: rgb(161, 139, 37);
  color: #ffffff;
}

.btn--filled:before {
  background: rgb(201, 164, 0);
  color: #ffffff;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(190, 190, 190, 0.603),
    transparent
  );
}

.btn--empty {
  background: none;
  color: #fff;
}

.btn--empty:before {
  background: none;
  color: #fff;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(201, 164, 0, 0.4),
    transparent
  );
}

.btn:hover {
  box-shadow: 1px 1px 25px 10px rgba(201, 164, 0, 0.4);
}

.btn:before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  transition: all 800ms;
}

.btn:hover:before {
  left: 100%;
}
</style>
