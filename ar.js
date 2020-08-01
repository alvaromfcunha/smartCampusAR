//import {slowFade} from 'res/utils/custom-function.js';

window.addEventListener('load', ()=>{ 
  console.log('page loaded!')
  
  // const predioAsset = document.querySelector('#main-building');
  
  // predioAsset.addEventListener('progress', xhr => {
  //   console.log('predio asset:', xhr.detail.loadedBytes / xhr.detail.totalBytes * 100)
  // })

  const assets = document.querySelector('#assets-loader');
  console.log(assets)
      
  // const predio = document.querySelector('#predioEntity');

  // predio.addEventListener('animationbegin__rotate', () => {
  //   console.log("rodou")
  //   predio.emit('zoom_out')
  //   slowFade(predio, 50)
  // })

  // predio.addEventListener('animationcomplete__zoom_out', () => {
  //   predio.emit('zoom_out')
  //   slowFade(predio, 50)
  // })

});
    