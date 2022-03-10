<template>
  <div class="room" :id="id" v-memo="[type, obstacles]" :data-type="type">
    <div class="cypress-test">{{ id }}</div>
    <img v-if="type" :src="require(`@/assets/rooms/${type}.png`)" />
    <div class="obstacles" v-if="obstacles.length">
      <div v-for="obstacle in obstacles" :key="obstacle" :class="`obstacle obstacle-${obstacle}`">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Room',
  props: {
    id: Number,
    type: String,
    obstacles: Array,
  },
};
</script>

<style scoped lang="scss">
.room {
  position: relative;
  width: 64px;
  height: 56px;
  background-color: rgb(20, 20, 20);
  border: 2px solid black;
  cursor: pointer;

  &:hover {
    background-color: rgb(51, 51, 51);
  }

  & img {
    width: 100%;
    background-color: black;
  }

  &.secret {
    border: 2px solid red;
  }

  & > * {
    pointer-events: none;
  }
}

.obstacles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.obstacle {
  position: absolute;
  background-color: red;

  &-top {
    top: 0;
    left: 50%;
    width: 86%;
    height: 4px;
    transform: translateX(-50%);
  }

  &-right {
    top: 50%;
    right: 0;
    width: 4px;
    height: 86%;
    transform: translateY(-50%);
  }

  &-bottom {
    bottom: 0;
    left: 50%;
    width: 86%;
    height: 4px;
    transform: translateX(-50%);
  }

  &-left {
    top: 50%;
    left: 0;
    width: 4px;
    height: 86%;
    transform: translateY(-50%);
  }
}

.cypress-test {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color: white;
  opacity: 0.2;
}
</style>
