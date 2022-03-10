import { createStore } from 'vuex';

const checkCoordinates = (referenceRoomCoordinates) => {
  const top = { x: referenceRoomCoordinates.x, y: referenceRoomCoordinates.y - 1 };
  const right = { x: referenceRoomCoordinates.x + 1, y: referenceRoomCoordinates.y };
  const bottom = {
    x: referenceRoomCoordinates.x,
    y: referenceRoomCoordinates.y + 1,
  };
  const left = { x: referenceRoomCoordinates.x - 1, y: referenceRoomCoordinates.y };
  return {
    top, right, bottom, left,
  };
};

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

        const coordinates = { x: room.x, y: room.y };
        const roomCoordinates = checkCoordinates(coordinates);

        const topRoom = state.rooms.filter((elem) => elem.x === roomCoordinates.top.x
          && elem.y === roomCoordinates.top.y);
        const leftRoom = state.rooms.filter((elem) => elem.x === roomCoordinates.left.x
          && elem.y === roomCoordinates.left.y);
        const bottomRoom = state.rooms.filter((elem) => elem.x === roomCoordinates.bottom.x
          && elem.y === roomCoordinates.bottom.y);
        const rightRoom = state.rooms.filter((elem) => elem.x === roomCoordinates.right.x
          && elem.y === roomCoordinates.right.y);

        let validRoomCount = 0;

        if (topRoom[0]
          && (topRoom[0].obstacles.includes('bottom') || topRoom[0].type === 'boss' || topRoom[0].type === 'corridor_v' || topRoom[0].type === 'corridor_h' || topRoom[0].type === 'super')) return;
        if (rightRoom[0]
          && (rightRoom[0].obstacles.includes('left') || rightRoom[0].type === 'boss' || rightRoom[0].type === 'corridor_v' || rightRoom[0].type === 'corridor_h' || rightRoom[0].type === 'super')) return;
        if (bottomRoom[0]
          && (bottomRoom[0].obstacles.includes('top') || bottomRoom[0].type === 'boss' || bottomRoom[0].type === 'corridor_v' || bottomRoom[0].type === 'corridor_h' || bottomRoom[0].type === 'super')) return;
        if (leftRoom[0]
          && (leftRoom[0].obstacles.includes('right') || leftRoom[0].type === 'boss' || leftRoom[0].type === 'corridor_v' || leftRoom[0].type === 'corridor_h' || leftRoom[0].type === 'super')) return;

        if (topRoom[0] && topRoom[0].type && topRoom[0].type !== 'secret') validRoomCount += 1;
        if (rightRoom[0] && rightRoom[0].type && rightRoom[0].type !== 'secret') validRoomCount += 1;
        if (bottomRoom[0] && bottomRoom[0].type && bottomRoom[0].type !== 'secret') validRoomCount += 1;
        if (leftRoom[0] && leftRoom[0].type && leftRoom[0].type !== 'secret') validRoomCount += 1;

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
    TEST_SUPER(state, type) {
      if (type !== 'boss') return;
      const bossRoomX = state.rooms[state.activeElement].x;
      const bossRoomY = state.rooms[state.activeElement].y;

      const bossRoomCoordinates = { x: bossRoomX, y: bossRoomY };

      const roomsCoordinates = checkCoordinates(bossRoomCoordinates);

      // Get nearest room.
      const topRoom = state.rooms.filter((elem) => elem.x === roomsCoordinates.top.x
        && elem.y === roomsCoordinates.top.y);
      const leftRoom = state.rooms.filter((elem) => elem.x === roomsCoordinates.left.x
        && elem.y === roomsCoordinates.left.y);
      const bottomRoom = state.rooms.filter((elem) => elem.x === roomsCoordinates.bottom.x
        && elem.y === roomsCoordinates.bottom.y);
      const rightRoom = state.rooms.filter((elem) => elem.x === roomsCoordinates.right.x
        && elem.y === roomsCoordinates.right.y);

      let adjacentRoom = {};

      if (topRoom[0].type) adjacentRoom = state.rooms[topRoom[0].id];
      if (rightRoom[0].type) adjacentRoom = state.rooms[rightRoom[0].id];
      if (bottomRoom[0].type) adjacentRoom = state.rooms[bottomRoom[0].id];
      if (leftRoom[0].type) adjacentRoom = state.rooms[leftRoom[0].id];

      const adjacentRoomCoordinates = { x: adjacentRoom.x, y: adjacentRoom.y };

      const potentialSuper = [];

      const potentialSuperCoordinates = checkCoordinates(adjacentRoomCoordinates);
      const topSecret = state.rooms.filter((elem) => elem.x === potentialSuperCoordinates.top.x
        && elem.y === potentialSuperCoordinates.top.y);
      const rightSecret = state.rooms.filter((elem) => elem.x === potentialSuperCoordinates.right.x
        && elem.y === potentialSuperCoordinates.right.y);
      const bottomSecret = state.rooms.filter(
        (elem) => elem.x === potentialSuperCoordinates.bottom.x
          && elem.y === potentialSuperCoordinates.bottom.y,
      );
      const leftSecret = state.rooms.filter((elem) => elem.x === potentialSuperCoordinates.left.x
        && elem.y === potentialSuperCoordinates.left.y);

      if (!topSecret[0].type && !adjacentRoom.obstacles.includes('top')) potentialSuper.push(topSecret[0]);
      if (!rightSecret[0].type && !adjacentRoom.obstacles.includes('right')) potentialSuper.push(rightSecret[0]);
      if (!bottomSecret[0].type && !adjacentRoom.obstacles.includes('bottom')) potentialSuper.push(bottomSecret[0]);
      if (!leftSecret[0].type && !adjacentRoom.obstacles.includes('left')) potentialSuper.push(leftSecret[0]);

      potentialSuper.forEach((superSecret) => {
        state.rooms[superSecret.id].type = 'super';
      });
    },
  },
});
