<template>
  <div class="backdrop" @click.self="closeTypes"></div>
  <div class="types">
    <div class="container">
      <button @click="removeType">Remove Type</button>
      <h3>Special rooms</h3>
      <img @click="selectType"
        :src="require('@/assets/rooms/arcade.png')" data-type="arcade" data-cy="arcade">
      <img @click="selectType"
        :src="require('@/assets/rooms/boss.png')" data-type="boss" data-cy="boss">
      <img @click="selectType"
        :src="require('@/assets/rooms/challenge.png')" data-type="challenge" data-cy="challenge">
      <img @click="selectType"
        :src="require('@/assets/rooms/curse.png')" data-type="curse" data-cy="curse">
      <img @click="selectType"
        :src="require('@/assets/rooms/dice.png')" data-type="dice" data-cy="dice">
      <img @click="selectType"
        :src="require('@/assets/rooms/library.png')" data-type="library" data-cy="library">
      <img @click="selectType"
        :src="require('@/assets/rooms/miniboss.png')" data-type="miniboss" data-cy="miniboss">
      <img @click="selectType"
        :src="require('@/assets/rooms/planetarium.png')"
        data-type="planetarium" data-cy="planetarium">
      <img @click="selectType"
        :src="require('@/assets/rooms/sacrifice.png')" data-type="sacrifice" data-cy="sacrifice">
      <img @click="selectType"
        :src="require('@/assets/rooms/shop.png')" data-type="shop" data-cy="shop">
      <img @click="selectType"
        :src="require('@/assets/rooms/treasure.png')" data-type="treasure" data-cy="treasure">
      <img @click="selectType"
        :src="require('@/assets/rooms/vault.png')" data-type="vault" data-cy="vault">
      <img @click="selectType"
        :src="require('@/assets/rooms/superchallenge.png')"
        data-type="superchallenge" data-cy="superchallenge">
      <h3>Normal rooms</h3>
      <img @click="selectType"
        :src="require('@/assets/rooms/empty.png')" data-type="empty" data-cy="empty">
      <img @click="selectType"
        :src="require('@/assets/rooms/corridor_h.png')" data-type="corridor_h" data-cy="corridor_h">
      <img @click="selectType"
        :src="require('@/assets/rooms/corridor_v.png')" data-type="corridor_v" data-cy="corridor_v">
      <div v-if="showObstacles" class="obstacles">
        <h3>Obstacles</h3>
        <div @click="AddObstacles" class="obstacle" data-obstacle=""></div>
        <div @click="AddObstacles" class="obstacle obstacle-top" data-obstacle="top"></div>
        <div @click="AddObstacles" class="obstacle obstacle-right" data-obstacle="right"></div>
        <div @click="AddObstacles" class="obstacle obstacle-bottom" data-obstacle="bottom"></div>
        <div @click="AddObstacles" class="obstacle obstacle-left" data-obstacle="left"></div>
        <div @click="AddObstacles" class="obstacle obstacle-top obstacle-bottom"
          data-obstacle="top, bottom"></div>
        <div @click="AddObstacles" class="obstacle obstacle-right obstacle-left"
          data-obstacle="right, left"></div>
        <div @click="AddObstacles" class="obstacle obstacle-top obstacle-right"
          data-obstacle="top, right"></div>
        <div @click="AddObstacles" class="obstacle obstacle-right obstacle-bottom"
          data-obstacle="right, bottom"></div>
        <div @click="AddObstacles" class="obstacle obstacle-bottom obstacle-left"
          data-obstacle="bottom, left"></div>
        <div @click="AddObstacles" class="obstacle obstacle-left obstacle-top"
          data-obstacle="left, top"></div>
        <div @click="AddObstacles" class="obstacle obstacle-left obstacle-top obstacle-right"
          data-obstacle="left, top, right"></div>
        <div @click="AddObstacles" class="obstacle obstacle-top obstacle-right obstacle-bottom"
          data-obstacle="top, right, bottom"></div>
        <div @click="AddObstacles" class="obstacle obstacle-left obstacle-bottom obstacle-right"
          data-obstacle="left, bottom, right"></div>
        <div @click="AddObstacles" class="obstacle obstacle-top obstacle-left obstacle-bottom"
          data-obstacle="top, left, bottom"></div>
        <div @click="AddObstacles"
          class="obstacle obstacle-top obstacle-right obstacle-bottom obstacle-left"
          data-obstacle="top, right, bottom, left"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Types',
  methods: {
    closeTypes() {
      this.$store.commit('TOGGLE_TYPES');
    },
    selectType(e) {
      const { target } = e;
      this.$store.commit('CHANGE_TYPE', target.dataset.type);
      this.closeTypes();
    },
    removeType() {
      this.$store.commit('REMOVE_TYPE');
      this.closeTypes();
    },
    AddObstacles(e) {
      const { target } = e;
      let obstacles = [];
      if (target.dataset.obstacle) obstacles = target.dataset.obstacle.split(',').map((value) => value.trim());
      this.$store.commit('ADD_OBSTACLES', obstacles);
      this.closeTypes();
    },
  },
  computed: {
    showObstacles() {
      return this.$store.state.showObstacles;
    },
  },
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
