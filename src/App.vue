<template>
  <h1><img src="./assets/logo.png" alt="The Mapping Of Isaac"></h1>
  <div class="floor">
    <Room v-for="room in rooms"
      :id="room.id"
      :key="room.id"
      :type="room.type"
      :x="room.x"
      :y="room.y"
      @click="getActiveElement" />
    <Types v-if="showTypes" />
  </div>
  <div class="actions">
    <button class="button" @click="raz">Begin again</button>
    <button class="button" @click="checkSecretRooms">Show me the secret rooms</button>
  </div>
</template>

<script>
import Room from './components/Room.vue';
import Types from './components/Types.vue';

export default {
  name: 'App',
  components: { Room, Types },
  data() {
    return {
      numberOfRooms: 144,
    };
  },
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
    checkSecretRooms() {
      this.$store.commit('TEST_SECRET');
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
  border: 1px solid black;
  background-color: transparent;
  cursor: pointer;
}
</style>
