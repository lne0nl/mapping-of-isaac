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

      state.rooms.forEach((room) => {
        if (room.type) return;

        const xCoordinate = room.x;
        const yCoordinate = room.y;

        const topRoomCoordinates = { x: xCoordinate, y: yCoordinate - 1 };
        const rightRoomCoordinates = { x: xCoordinate + 1, y: yCoordinate };
        const bottomRoomCoordinates = { x: xCoordinate, y: yCoordinate + 1 };
        const leftRoomCoordinates = { x: xCoordinate - 1, y: yCoordinate };

        const topRoom = state.rooms.filter((elem) => elem.x === topRoomCoordinates.x
          && elem.y === topRoomCoordinates.y);
        const leftRoom = state.rooms.filter((elem) => elem.x === leftRoomCoordinates.x
          && elem.y === leftRoomCoordinates.y);
        const bottomRoom = state.rooms.filter((elem) => elem.x === bottomRoomCoordinates.x
          && elem.y === bottomRoomCoordinates.y);
        const rightRoom = state.rooms.filter((elem) => elem.x === rightRoomCoordinates.x
          && elem.y === rightRoomCoordinates.y);

        let validRoomCount = 0;

        if (topRoom[0]
          && topRoom[0].type
          && topRoom[0].type !== 'boss'
          && topRoom[0].type !== 'corridor_v'
          && topRoom[0].type !== 'corridor_h'
          && !topRoom[0].obstacles.includes('bottom')) validRoomCount += 1;
        if (rightRoom[0]
          && rightRoom[0].type
          && rightRoom[0].type !== 'boss'
          && rightRoom[0].type !== 'corridor_v'
          && rightRoom[0].type !== 'corridor_h'
          && !rightRoom[0].obstacles.includes('left')) validRoomCount += 1;
        if (bottomRoom[0]
          && bottomRoom[0].type
          && bottomRoom[0].type !== 'boss'
          && bottomRoom[0].type !== 'corridor_v'
          && bottomRoom[0].type !== 'corridor_h'
          && !bottomRoom[0].obstacles.includes('top')) validRoomCount += 1;
        if (leftRoom[0]
          && leftRoom[0].type
          && leftRoom[0].type !== 'boss'
          && leftRoom[0].type !== 'corridor_v'
          && leftRoom[0].type !== 'corridor_h'
          && !leftRoom[0].obstacles.includes('right')) validRoomCount += 1;

        if (validRoomCount >= 3) secretRooms.push(room.id);
      });

      secretRooms.forEach((roomId) => {
        state.rooms[roomId].type = 'secret';
      });
    },
  },
});
