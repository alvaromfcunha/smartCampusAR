import { slowFade } from './res/utils/custom-functions.js';
import MainBuilding from './res/components/mainBuilding.js';
import NazarethRoom from './res/components/nazarethRoom.js'
import Button from './res/components/button.js';
import AmbientLight from './res/components/ambient-light.js';

window.addEventListener('load', () => {
  console.log('page loaded!')

  const mainBuildingAsset = document.querySelector('#main-building-asset')
  mainBuildingAsset.addEventListener('progress', xhr => {
    console.log('predio asset:', xhr.detail.loadedBytes / xhr.detail.totalBytes * 100)
  })
  
  var mainBuilding = new MainBuilding();
  var button = new Button();
  var ambientLight = new AmbientLight();
  var nazarethRoom = new NazarethRoom();
  
  const marker = document.querySelector('#marker')
  
  ambientLight.spawn(marker)
  .then((ambientLightObject) => {
    console.log('AmbientLight spawned! ', ambientLightObject)
  })
  .catch((error) => {
    console.warn(error)
  });

  mainBuilding.spawn(marker)
  .then((mainBuildingObject) => {
    console.log('MainBuilding spawned! ', mainBuildingObject)

    button.spawn(marker)
    .then((buttonObject) => {
      console.log('Button spawned! ', buttonObject)
      buttonObject.addEventListener('click', ()=>{
        console.log("clicked!");
        // mainBuildingObject.emit('rotate');

        slowFade(mainBuildingObject, 50);

        mainBuildingObject.emit('zoom_out');

        mainBuildingObject.addEventListener('animationcomplete__zoom_out', ()=>{
          nazarethRoom.modifyAttribute('model_opacity', '0')
          nazarethRoom.spawn(marker).then((nazarethRoomObject)=>{
            console.log('NazarethRoom spawned! ', nazarethRoomObject)
            slowFade(nazarethRoomObject, 50, true)
            //nazarethRoomObject.emit('zoom_out')
          })
          .catch((error) => {
            console.warn(error)
          });
        })

      })
    })
    .catch((error) => {
      console.warn(error)
    });
    
  })
  .catch((error) => {
    console.warn(error)
  });

 


  //console.log('OG:   ', gea.object3D)
  // const gea = document.querySelector('#gea')
  // gea.addEventListener('model-loaded', () => {
  //   var object = gea.getObject3D('mesh');
  //   console.log('object:  ', object)
  // })

  // const predioAsset = document.querySelector('#main-building');
  // const predio = document.querySelector('#predioEntity');

  // // predio.addEventListener('animationbegin__rotate', () => {
  //   console.log("rodou")
  //   predio.emit('zoom_out')
  //   slowFade(predio, 50)
  // })

  // predio.addEventListener('animationcomplete__zoom_out', () => {
  //   predio.emit('zoom_out')
  //   slowFade(predio, 50)
  // })

});
