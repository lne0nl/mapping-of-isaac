![cypress](https://github.com/lne0nl/mapping-of-isaac/actions/workflows/github-actions-init.yml/badge.svg?branch=master)

<div align="center">
    <img src="https://raw.githubusercontent.com/lne0nl/mapping-of-isaac/master/src/assets/logo-rm.png">
</div>

<p>
    <b><a href="https://lne0nl.github.io/mapping-of-isaac/">The Mapping of Isaac</a></b> is a simple website developped in Vue.js for the game <b>Binding of Isaac</b>.
    It allows you to place the rooms on the map of the floor you are playing, then calculate the probability for the secret rooms placements.
    </p>

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Launch Cypress tests
```
npm run cypress:run
```

### Deploy on Github pages (if you have the rights)
```
npm run deploy
```
<div align="center">
    <img src="https://raw.githubusercontent.com/lne0nl/mapping-of-isaac/master/src/assets/isaac.png" width="100">
</div>

### TODO

- [ ] Build the map gradually when user add a room
- [x] Calculate secret room position when user add a room
- [ ] Implement super secret room calculation