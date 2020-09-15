import { slowFade } from './res/utils/custom-functions.js';

import MainBuilding from './res/components/mainBuilding.js';
import NazarethRoom from './res/components/nazarethRoom.js'
import ButtonNazareth from './res/components/buttonNazareth.js';
import AmbientLight from './res/components/ambient-light.js';
import GuilhermeRoom from './res/components/guilhermeRoom.js';
import ButtonGuilherme from './res/components/buttonGuilherme.js';
import ButtonCourses from './res/components/buttonCourses.js'

window.addEventListener('load', () => {
  console.log('page loaded!')

  const mainBuildingAsset = document.querySelector('#main-building-asset')
  mainBuildingAsset.addEventListener('progress', xhr => {
    console.log('predio asset:', xhr.detail.loadedBytes / xhr.detail.totalBytes * 100)
  })
  
  var ambientLight = new AmbientLight();

  var mainBuilding = new MainBuilding();
  const mainBuildingRef = mainBuilding.getReference();

  var buttonNazareth = new ButtonNazareth();
  const buttonNazarethRef = buttonNazareth.getReference();
  
  var nazarethRoom = new NazarethRoom();
  const nazarethRoomRef = nazarethRoom.getReference();

  var buttonGuilherme = new ButtonGuilherme();
  const buttonGuilhermeRef = buttonGuilherme.getReference();
  
  var guilhermeRoom = new GuilhermeRoom();
  const guilhermeRoomRef = guilhermeRoom.getReference();

  var buttonCourses = new ButtonCourses();
  const buttonCoursesRef = buttonCourses.getReference();

  const marker = document.querySelector('#marker')
  
  ambientLight.spawn(marker)
  .then((ambientLightObject) => {
    console.log('AmbientLight spawned! ', ambientLightObject);
  })
  .catch((error) => {
    console.warn(error);
  });

  mainBuilding.spawn(marker)
  .then(()=>{
    console.log('MainBuilding spawned! ', mainBuildingRef);
  })
  .catch((error) => {
    console.warn(error);
  });

  var buttonNazarethState = 'room';
  buttonNazareth.spawn(marker)
  .then(()=>{
    console.log('ButtonNazareth spawned! ', buttonNazarethRef);
    buttonNazarethRef.addEventListener('click', () => {
      if (buttonNazarethState == 'room'){
        const mbSlowFadePromise = slowFade(mainBuildingRef, 1000);
        const bgSlowFadePromise = slowFade(buttonGuilhermeRef, 1000);

        Promise.all([mbSlowFadePromise, bgSlowFadePromise])
        .then(() => {
          const mainBuildingDespawnPromise = mainBuilding.despawn(marker);
          const buttonGuilhermeDespawnPromise = buttonGuilherme.despawn(marker);
          return [mainBuildingDespawnPromise, buttonGuilhermeDespawnPromise];
        })
        .then(() => {
          nazarethRoom.modifyAttribute('model-opacity', '0');
          const nazarethRoomSpawnPromise = nazarethRoom.spawn(marker);
          return nazarethRoomSpawnPromise;
        })
        .then(() => {
          const znSlowFadePromise = slowFade(nazarethRoomRef, 1000, true);
          return znSlowFadePromise;
        })
        .then(() => {
          buttonNazarethState = 'building';
        })
      }
      else if (buttonNazarethState = 'building'){
        slowFade(nazarethRoomRef, 1000)
        .then(() => {
          return nazarethRoom.despawn(marker);
        })
        .then(() => {
          return [
            mainBuilding.spawn(marker),
            buttonGuilherme.spawn(marker)
          ]
        })
        .then(() => {
          buttonNazarethState = 'room';
        });
      }
      // mainBuilding.despawn(marker)
      // setTimeout(() => {
      //   mainBuilding.spawn(marker)
      // }, 3000)
    })
  })
  .catch((error) => {
    console.warn(error);
  });

  var buttonGuilhermeState = 'room';
  buttonGuilherme.spawn(marker)
  .then(()=>{
    console.log('ButtonGuilherme spawned! ', buttonGuilhermeRef);
    buttonGuilhermeRef.addEventListener('click', () => {
      if (buttonGuilhermeState == 'room'){
        const mbSlowFadePromise = slowFade(mainBuildingRef, 1000);
        const bzSlowFadePromise = slowFade(buttonNazarethRef, 1000);

        Promise.all([mbSlowFadePromise, bzSlowFadePromise])
        .then(() => {
          return [
            mainBuilding.despawn(marker),
            buttonNazareth.despawn(marker)
          ];
        })
        .then(() => {
          guilhermeRoom.modifyAttribute('model-opacity', '0');
          return guilhermeRoom.spawn(marker);
        })
        .then(() => {
          return slowFade(guilhermeRoomRef, 1000, true)
        })
        .then(() => {
          buttonGuilhermeState = 'building';
        })
      }
      else if (buttonGuilhermeState == 'building'){
        slowFade(guilhermeRoomRef, 1000)
        .then(() => {
          return guilhermeRoom.despawn(marker);
        })
        .then(() => {
          return [
            mainBuilding.spawn(marker),
            buttonNazareth.spawn(marker)
          ]
        })
        .then(() => {
          buttonGuilhermeState = 'room';
        });
      }
    })
  })
  .catch((error) => {
    console.warn(error);
  });

});
