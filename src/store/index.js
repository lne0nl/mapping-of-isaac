import { createStore } from 'vuex';

const rooms = [];
let x = 0;
let y = 0;

for (let i = 0; i < 144; i += 1) {
  rooms.push({
    id: i, type: i === 66 ? 'empty' : '', x, y, obstacles: [],
  });
  x = x === 11 ? 0 : x += 1;
  if (x === 0) y += 1;
}

export default createStore({
  state: {
    showTypes: false,
    showObstacles: false,
    activeElement: null,
    rooms,
  },
  mutations: {
    TOGGLE_TYPES(state, activeElementId) {
      if (activeElementId) {
        state.activeElement = activeElementId;
        state.showObstacles = !!state.rooms[activeElementId].type;
      }
      state.showTypes = !state.showTypes;
    },
    CHANGE_TYPE(state, newType) {
      state.rooms[state.activeElement].type = newType;
    },
    REMOVE_TYPE(state) {
      state.rooms[state.activeElement].type = '';
      state.rooms[state.activeElement].obstacles = [];
    },
    RAZ(state) {
      state.rooms.forEach((room, index) => {
        const roomToEmpty = room;
        roomToEmpty.type = index === 66 ? 'empty' : '';
        roomToEmpty.obstacles = [];
      });
    },
    ADD_OBSTACLES(state, obstacles) {
      state.rooms[state.activeElement].obstacles = obstacles;
    },
    TEST_SECRET(state) {
      const secretRooms = [];
      const jockerSecretRooms = [];

      state.rooms.forEach((room) => {
        if (room.type === 'secret') state.rooms[room.id].type = '';
        if (room.type) return;

        const topRoom = state.rooms[room.id - 12];
        const rightRoom = state.rooms[room.id + 1];
        const bottomRoom = state.rooms[room.id + 12];
        const leftRoom = state.rooms[room.id - 1];

        let validRoomCount = 0;

        if (topRoom
          && (topRoom.obstacles.includes('bottom') || topRoom.type === 'boss' || topRoom.type === 'corridor_v' || topRoom.type === 'corridor_h' || topRoom.type === 'super')) return;
        if (rightRoom
          && (rightRoom.obstacles.includes('left') || rightRoom.type === 'boss' || rightRoom.type === 'corridor_v' || rightRoom.type === 'corridor_h' || rightRoom.type === 'super')) return;
        if (bottomRoom
          && (bottomRoom.obstacles.includes('top') || bottomRoom.type === 'boss' || bottomRoom.type === 'corridor_v' || bottomRoom.type === 'corridor_h' || bottomRoom.type === 'super')) return;
        if (leftRoom
          && (leftRoom.obstacles.includes('right') || leftRoom.type === 'boss' || leftRoom.type === 'corridor_v' || leftRoom.type === 'corridor_h' || leftRoom.type === 'super')) return;

        if (topRoom && topRoom.type && topRoom.type !== 'secret') validRoomCount += 1;
        if (rightRoom && rightRoom.type && rightRoom.type !== 'secret') validRoomCount += 1;
        if (bottomRoom && bottomRoom.type && bottomRoom.type !== 'secret') validRoomCount += 1;
        if (leftRoom && leftRoom.type && leftRoom.type !== 'secret') validRoomCount += 1;

        if (validRoomCount >= 3) secretRooms.push(room.id);
        if (validRoomCount === 2) jockerSecretRooms.push(room.id);
      });

      if (!secretRooms.length && !jockerSecretRooms.length) return;
      if (secretRooms.length) {
        secretRooms.forEach((roomId) => {
          state.rooms[roomId].type = 'secret';
        });
      } else if (jockerSecretRooms.length) {
        jockerSecretRooms.forEach((roomId) => {
          state.rooms[roomId].type = 'secret';
        });
      }
    },
    TEST_SUPER(state) {
      const bossRoom = state.rooms.filter((elem) => elem.type === 'boss');
      if (!bossRoom.length) return;
      const bossRoomId = state.rooms.filter((elem) => elem.type === 'boss')[0].id;
      // RAZ super secret rooms.
      state.rooms.filter((elem) => elem.type === 'super').forEach((room) => {
        // eslint-disable-next-line no-param-reassign
        room.type = '';
      });

      const adjacentRooms = [];

      // @TODO do something in case an entry is empty.
      // Get nearest room.
      const topRoom = state.rooms[bossRoomId - 12];
      const rightRoom = state.rooms[bossRoomId + 1];
      const bottomRoom = state.rooms[bossRoomId + 12];
      const leftRoom = state.rooms[bossRoomId - 1];

      if (topRoom.type) adjacentRooms.push(state.rooms[topRoom.id]);
      if (rightRoom.type) adjacentRooms.push(state.rooms[rightRoom.id]);
      if (bottomRoom.type) adjacentRooms.push(state.rooms[bottomRoom.id]);
      if (leftRoom.type) adjacentRooms.push(state.rooms[leftRoom.id]);

      // Get second nearest room.
      const secondTopRoom = state.rooms[adjacentRooms[0].id - 12];
      const secondRightRoom = state.rooms[adjacentRooms[0].id + 1];
      const secondBottomRoom = state.rooms[adjacentRooms[0].id + 12];
      const secondLeftRoom = state.rooms[adjacentRooms[0].id - 1];

      if (secondTopRoom.type && secondTopRoom.type !== 'boss' && secondTopRoom.type !== 'secret') adjacentRooms.push(state.rooms[secondTopRoom.id]);
      if (secondRightRoom.type && secondRightRoom.type !== 'boss' && secondRightRoom.type !== 'secret') adjacentRooms.push(state.rooms[secondRightRoom.id]);
      if (secondBottomRoom.type && secondBottomRoom.type !== 'boss' && secondBottomRoom.type !== 'secret') adjacentRooms.push(state.rooms[secondBottomRoom.id]);
      if (secondLeftRoom.type && secondLeftRoom.type !== 'boss' && secondLeftRoom.type !== 'secret') adjacentRooms.push(state.rooms[secondLeftRoom.id]);

      // Get third nearest room.
      const thirdTopRoom = state.rooms[adjacentRooms[1].id - 12];
      const thirdRightRoom = state.rooms[adjacentRooms[1].id + 1];
      const thirdBottomRoom = state.rooms[adjacentRooms[1].id + 12];
      const thirdLeftRoom = state.rooms[adjacentRooms[1].id - 1];

      if (thirdTopRoom.type && thirdTopRoom.type !== 'boss' && thirdTopRoom.type !== 'secret') adjacentRooms.push(state.rooms[thirdTopRoom.id]);
      if (thirdRightRoom.type && thirdRightRoom.type !== 'boss' && thirdRightRoom.type !== 'secret') adjacentRooms.push(state.rooms[thirdRightRoom.id]);
      if (thirdBottomRoom.type && thirdBottomRoom.type !== 'boss' && thirdBottomRoom.type !== 'secret') adjacentRooms.push(state.rooms[thirdBottomRoom.id]);
      if (thirdLeftRoom.type && thirdLeftRoom.type !== 'boss' && thirdLeftRoom.type !== 'secret') adjacentRooms.push(state.rooms[thirdLeftRoom.id]);

      const potentialSuper = [];

      adjacentRooms.forEach((room) => {
        const topSecret = state.rooms[room.id - 12];
        const rightSecret = state.rooms[room.id + 1];
        const bottomSecret = state.rooms[room.id + 12];
        const leftSecret = state.rooms[room.id - 1];

        if (!topSecret.type && !room.obstacles.includes('top')) potentialSuper.push({ room: topSecret, position: 'top' });
        if (!rightSecret.type && !room.obstacles.includes('right')) potentialSuper.push({ room: rightSecret, position: 'right' });
        if (!bottomSecret.type && !room.obstacles.includes('bottom')) potentialSuper.push({ room: bottomSecret, position: 'bottom' });
        if (!leftSecret.type && !room.obstacles.includes('left')) potentialSuper.push({ room: leftSecret, position: 'left' });
      });

      potentialSuper.forEach((superSecret) => {
        // Check if other adjacent rooms exists
        const topAdjacent = state.rooms[superSecret.room.id - 12];
        const rightAdjacent = state.rooms[superSecret.room.id + 1];
        const bottomAdjacent = state.rooms[superSecret.room.id + 12];
        const leftAdjacent = state.rooms[superSecret.room.id - 1];

        switch (superSecret.position) {
          case 'top':
            if ((!topAdjacent.type || topAdjacent.type === 'super')
              && (!rightAdjacent.type || rightAdjacent.type === 'super')
              && (!leftAdjacent.type || leftAdjacent.type === 'super')) state.rooms[superSecret.room.id].type = 'super';
            break;
          case 'right':
            if ((!topAdjacent.type || topAdjacent.type === 'super')
              && (!rightAdjacent.type || rightAdjacent.type === 'super')
              && (!bottomAdjacent.type || bottomAdjacent.type === 'super')) state.rooms[superSecret.room.id].type = 'super';
            break;
          case 'bottom':
            if ((!bottomAdjacent.type || bottomAdjacent.type === 'super')
              && (!rightAdjacent.type || rightAdjacent.type === 'super')
              && (!leftAdjacent.type || leftAdjacent.type === 'super')) state.rooms[superSecret.room.id].type = 'super';
            break;
          case 'left':
            if ((!topAdjacent.type || topAdjacent.type === 'super')
            && (!bottomAdjacent.type || bottomAdjacent.type === 'super')
            && (!leftAdjacent.type || leftAdjacent.type === 'super')) state.rooms[superSecret.room.id].type = 'super';
            break;
          default:
        }
      });
    },
  },
});
