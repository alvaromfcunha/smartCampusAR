const tag = '[ButtonGuilherme]'

export default class ButtonNazareth {
  constructor(props){
    this.entity = document.createElement('a-entity');
    this.entity.setAttribute('buttonGuilherme', '');
    this.entity.setAttribute('id','buttonGuilherme')
    this.entity.setAttribute('class','clickable')
    this.entity.setAttribute('gltf-model','#button-asset')
    this.entity.setAttribute('position','1 0 .5')
    this.entity.setAttribute('rotation','0 -90 90')
    this.entity.setAttribute('scale','.2 .1 .2')
    
    AFRAME.registerComponent('button', {
      init: function() {
    
      }
    });
    
  }
  
  spawn(scene){
    return new Promise((resolve, reject) =>{
      try {
        if(scene.tagName == 'A-MARKER'){
          scene.appendChild(this.entity)
          resolve(this.entity);
        }
        else
          reject(`Can't spawn ${tag} on a non scene element!`);
      }catch(e){
        reject(`Can't spawn ${tag}! ${e}`);
      }
    })
  }

  despawn(scene){
    return new Promise((resolve, reject) =>{
      try {
        if(scene.tagName == 'A-MARKER'){
          scene.removeChild(this.entity)
          resolve(this.entity);
        }
        else
          reject(`Can't despawn ${tag} on a non scene element!`);
      }catch(e){
        reject(`Can't despawn ${tag}! ${e}`);
      }
    })
  }

  modifyAttribute(attr, value){
    this.entity.setAttribute(attr, value)
  }
}





