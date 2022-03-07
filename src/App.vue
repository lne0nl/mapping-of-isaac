<template>
  <h1><img src="./assets/logo.png" alt="The Mapping Of Isaac"></h1>
  <div class="floor">
    <Room v-for="room in rooms"
      :id="room.id"
      :key="room.id"
      :type="room.type"
      :obstacles="room.obstacles"
      @click="getActiveElement" />
    <Types v-if="showTypes" />
  </div>
  <div class="actions">
    <button title="Destroy floor" class="button" @click="raz">
      <img src="./assets/bomb.png" alt="Destroy floor"><br>
      Destroy the floor
    </button>
  </div>
</template>

<script>
import Room from './components/Room.vue';
import Types from './components/Types.vue';

export default {
  name: 'App',
  components: { Room, Types },
  methods: {
    raz() {
      this.$store.commit('RAZ');
    },
    getActiveElement(e) {
      const { target } = e;
      this.toggleTypes(target.id);
    },
    toggleTypes(activeElementId) {
      this.$store.commit('TOGGLE_TYPES', activeElementId);
    },
  },
  computed: {
    rooms() {
      return this.$store.state.rooms;
    },
    showTypes() {
      return this.$store.state.showTypes;
    },
  },
};
</script>

<style lang="scss">
body, html, * {
  box-sizing: border-box
}
#app {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
h1, h2 {
  width: 100%;
  margin: 0;
  padding: 0;
}
.floor {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 772px;
  border: 2px solid black;
}
.actions {
  margin: 10px 0;
  width: 100%;
}
.button {
  padding: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
