## Weather Relief

### How to run the project (Getting started)
```shell
git clone
cd weather-relief
```
visit [weather stack](https://weatherstack.com/) to get an api key;
- create a _.env_ file with the sample _.env.sample_ file in the project root
```shell
yarn
yarn start
```
### Info about deployment
An app to look up **current weather** information for cities around the world.
- View weather from 15 largest cities in the world
- Add notes and create favourite city on search

metric is in Celsius.
This app is on netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/4df8a234-7901-40ab-a733-68f3eeb2b112/deploy-status)](https://app.netlify.com/sites/weather-relief/deploys)


### Listed main libraries/concepts
- Axios
- Redux, Redux-Toolkit and Redux-Persist
- React-Router

### Project / Component structure
This project is using Atomic System Design to encourage component re-usability

- App
  - components -- atomic design structure
  - helpers -- logics
  - store -- redux store
    - index -- redux setup
    - reducers -- redux toolkit
      all slices
      - index -- combine reducers
- Utils
  - api
    - request -- http config with caching param
    - index -- all endpoints

### What to do next
Visit the site [Weather Relief](https://weather-relief.netlify.app/)
