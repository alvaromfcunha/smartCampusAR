const tag = '[GEA]'

export default class Gea {
  constructor(props){
    this.entity = document.createElement('a-entity');
    this.entity.setAttribute('gea', '');
    this.entity.setAttribute('id','gea')
    this.entity.setAttribute('gltf-model','#gea-asset')
    this.entity.setAttribute('position','0 0 1')
    this.entity.setAttribute('rotation','0 0 0')
    this.entity.setAttribute('scale','1 1 1')
    this.entity.setAttribute('model-opacity','1')

    AFRAME.registerComponent('nazareth-room', {
      init: function() {
        
      }
    })
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

  getReference(){
    return this.entity
  }
}

