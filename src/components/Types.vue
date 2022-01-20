<template>
  <div class="backdrop" @click.self="closeTypes"></div>
  <div class="types">
    <div class="container">
      <button @click="removeType">Remove Type</button>
      <h3>Special rooms</h3>
      <img @click="selectType" :src="require('@/assets/rooms/arcade.png')" data-type="arcade">
      <img @click="selectType" :src="require('@/assets/rooms/boss.png')" data-type="boss">
      <img @click="selectType"
        :src="require('@/assets/rooms/challenge.png')" data-type="challenge">
      <img @click="selectType" :src="require('@/assets/rooms/curse.png')" data-type="curse">
      <img @click="selectType" :src="require('@/assets/rooms/dice.png')" data-type="dice">
      <img @click="selectType" :src="require('@/assets/rooms/library.png')" data-type="library">
      <img @click="selectType" :src="require('@/assets/rooms/miniboss.png')" data-type="miniboss">
      <img @click="selectType"
        :src="require('@/assets/rooms/planetarium.png')" data-type="planetarium">
      <img @click="selectType"
        :src="require('@/assets/rooms/sacrifice.png')" data-type="sacrifice">
      <img @click="selectType" :src="require('@/assets/rooms/shop.png')" data-type="shop">
      <img @click="selectType" :src="require('@/assets/rooms/treasure.png')" data-type="treasure">
      <img @click="selectType" :src="require('@/assets/rooms/vault.png')" data-type="vault">
      <img @click="selectType"
        :src="require('@/assets/rooms/superchallenge.png')" data-type="superchallenge">
      <h3>Normal rooms</h3>
      <img @click="selectType" :src="require('@/assets/rooms/empty.png')" data-type="empty">
      <img @click="selectType"
        :src="require('@/assets/rooms/corridor_h.png')" data-type="corridor_h">
      <img @click="selectType"
        :src="require('@/assets/rooms/corridor_v.png')" data-type="corridor_v">
      <div v-if="showObstacles" class="obstacles">
        <h3>Obstacles</h3>
        <div @click="addObstacles" class="obstacle" data-obstacle=""></div>
        <div @click="addObstacles" class="obstacle obstacle-top" data-obstacle="top"></div>
        <div @click="addObstacles" class="obstacle obstacle-right" data-obstacle="right"></div>
        <div @click="addObstacles" class="obstacle obstacle-bottom" data-obstacle="bottom"></div>
        <div @click="addObstacles" class="obstacle obstacle-left" data-obstacle="left"></div>
        <div @click="addObstacles" class="obstacle obstacle-top obstacle-bottom"
          data-obstacle="top, bottom"></div>
        <div @click="addObstacles" class="obstacle obstacle-right obstacle-left"
          data-obstacle="right, left"></div>
        <div @click="addObstacles" class="obstacle obstacle-top obstacle-right"
          data-obstacle="top, right"></div>
        <div @click="addObstacles" class="obstacle obstacle-right obstacle-bottom"
          data-obstacle="right, bottom"></div>
        <div @click="addObstacles" class="obstacle obstacle-bottom obstacle-left"
          data-obstacle="bottom, left"></div>
        <div @click="addObstacles" class="obstacle obstacle-left obstacle-top"
          data-obstacle="left, top"></div>
        <div @click="addObstacles" class="obstacle obstacle-left obstacle-top obstacle-right"
          data-obstacle="left, top, right"></div>
        <div @click="addObstacles" class="obstacle obstacle-top obstacle-right obstacle-bottom"
          data-obstacle="top, right, bottom"></div>
        <div @click="addObstacles" class="obstacle obstacle-left obstacle-bottom obstacle-right"
          data-obstacle="left, bottom, right"></div>
        <div @click="addObstacles" class="obstacle obstacle-top obstacle-left obstacle-bottom"
          data-obstacle="top, left, bottom"></div>
        <div @click="addObstacles"
          class="obstacle obstacle-top obstacle-right obstacle-bottom obstacle-left"
          data-obstacle="top, right, bottom, left"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();
const { showObstacles } = store.state;

const closeTypes = () => store.commit('TOGGLE_TYPES');
const selectType = (e) => {
  store.commit('CHANGE_TYPE', e.target.dataset.type);
  closeTypes();
};
const removeType = () => {
  store.commit('REMOVE_TYPE');
  closeTypes();
};
const addObstacles = (e) => {
  let obstacles = [];
  if (e.target.dataset.obstacle) obstacles = e.target.dataset.obstacle.split(',').map((value) => value.trim());
  store.commit('ADD_OBSTACLES', obstacles);
  closeTypes();
};
</script>

<style scoped lang="scss">
.types {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 40px;
  border-radius: 10px;

  background-color: white;

  transform: translate(-50%, -50%);
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 320px;

  img {
    width: 46px;
    height: 40.75px;
    border: 2px solid black;
    cursor: pointer;
  }
}

.obstacles {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
}

.obstacle {
  margin-bottom: 4px;
  width: 46px;
  height: 40.75px;
  border: 2px solid black;
  cursor: pointer;

  &-top {
    border-top: 6px solid red;
  }
  &-right {
    border-right: 6px solid red;
  }
  &-bottom {
    border-bottom: 6px solid red;
  }
  &-left {
    border-left: 6px solid red;
  }
}

h3 {
  width: 100%;
}
</style>
