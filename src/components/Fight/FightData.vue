<template>
  <transition name="slide-fade">
    <div v-if="roundIsPlaying" class="Fight__Damage">
      <div>
        <div
          v-if="roundHealPlayer > 0"
          class="Fight__Damage__score Fight__Damage__score__heal"
        >
          <img src="../../../src/assets/images/heal.png" />
          <p class="Fight__Damage__score__heal">+ {{ roundHealPlayer }} HP</p>
        </div>
        <div
          v-if="roundDamageEnemy > 0"
          class="Fight__Damage__score Fight__Damage__score__anim"
        >
          <img src="../../../src/assets/images/sword.png" />
          <p class="Fight__Damage__score__attack">
            - {{ roundDamageEnemy }} HP
          </p>
        </div>
      </div>
      <div>
        <div
          v-if="roundHealEnemy > 0"
          class="Fight__Damage__score Fight__Damage__score__heal"
        >
          <img src="../../../src/assets/images/heal.png" />
          <p class="Fight__Damage__score__heal">+ {{ roundHealEnemy }} HP</p>
        </div>
        <div
          v-if="roundDamagePlayer > 0"
          class="Fight__Damage__score Fight__Damage__score__animEnemy"
        >
          <img src="../../../src/assets/images/sword.png" />
          <p class="Fight__Damage__score__attack">
            - {{ roundDamagePlayer }} HP
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useCharacter } from "../../composable/character";

const {
  roundDamagePlayer,
  roundHealPlayer,
  roundDamageEnemy,
  roundHealEnemy,
  roundIsPlaying,
} = useCharacter();
</script>

<style scoped>
.Fight__Damage {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -40%);
  display: flex;
  justify-content: space-between;
  width: 35vw;
  z-index: 10;
}

.Fight__Damage__score {
  display: flex;
  align-items: center;
  font-size: 2em;
  opacity: 0;
}

.Fight__Damage__score__heal {
  animation: healAnimation 2.5s cubic-bezier(0.7, -0.5, 0.3, 1.2);
  text-shadow: 2px 2px 10px rgb(1, 211, 95);
}

.Fight__Damage__score__anim {
  animation: damageAnimation 2.5s cubic-bezier(0.7, -0.5, 0.3, 1.2);
  text-shadow: 2px 2px 10px rgba(255, 0, 0, 0.7);
}

.Fight__Damage__score__animEnemy {
  animation: damageEnemyAnimation 2.5s cubic-bezier(0.7, -0.5, 0.3, 1.2);
  text-shadow: 2px 2px 10px rgba(255, 0, 0, 0.7);
}

.Fight__Damage__score p {
  margin: 0;
}

.Fight__Damage__score__attack {
  color: rgb(252, 90, 90);
}

.Fight__Damage__score__heal {
  color: rgb(0, 255, 115);
}

.Fight__Damage__score img {
  width: 5vw;
  max-width: 60px;
  height: auto;
  object-fit: contain;
  margin-right: 10px;
}
</style>
