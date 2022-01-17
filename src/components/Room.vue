<template>
  <div class="room" :id="id" v-memo="[type]" :data-type="type">
    <img v-if="type" :src="require(`@/assets/rooms/${type}.png`)" />
  </div>
</template>

<script>
export default {
  name: 'Room',
  props: {
    id: Number,
    type: String,
  },
};
</script>

<style scoped lang="scss">
.room {
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
</style>
