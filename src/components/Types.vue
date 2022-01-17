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
    border: 2px solid black;
    cursor: pointer;
  }
}

h3 {
  width: 100%;
}
</style>
