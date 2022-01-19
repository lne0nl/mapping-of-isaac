<template>
  <div class="room" :id="id" v-memo="[type, obstacles]" :data-type="type">
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
  background-color: rgba(255, 0, 0, 0.452);

  &-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
  }

  &-right {
    top: 0;
    right: 0;
    width: 6px;
    height: 100%;
  }

  &-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
  }

  &-left {
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
  }
}
</style>
