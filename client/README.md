# Frontend

|![](https://img.icons8.com/color/344/javascript.png)|![](https://cdn.iconscout.com/icon/free/png-256/react-3-1175109.png)|![](https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/386/square_256/redux.png)|![](https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png)|
|--|--|--|--|--|

### Some notes about the Frontend
The frontend is deployed on Netlify. Memoir uses a React frontend that uses Redux to store it's global state and Sass for styling.

### Usage and Installation

```
$ git clone https://github.com/hector4213/memoir.git (if you haven't already)
$ cd client
$ npm install
$ npm start
```

## Testing
|![](https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png)|![](https://images.opencollective.com/cypressio/b6f8a1e/logo/256.png)|
|--|--|

Memoir uses Storybook to test the component User Interface and Cypress for end to end testing to make sure all core fearures are working.

To run Storybook
```
$ npm run storybook
```

To run Cypress
```
$ npm run cypress
```

### Dependencies
- sass
- redux
- redux-thunk
- react-redux
- react-router
- react-icons
- storybook
- cypress
- axios