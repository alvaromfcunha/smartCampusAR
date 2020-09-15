const tag = '[AmbientLight]'

export default class AmbientLight {
  constructor(props){
    this.entity = document.createElement('a-entity');
    this.entity.setAttribute('ambient-light', '');
    this.entity.setAttribute('id','visible: false')
    this.entity.setAttribute('material','visible: false')
    this.entity.setAttribute('position','0.5 1 -0.5')
    this.entity.setAttribute('light',`
      type: point;
      intensity: 1.5;
      distance: 0;
      decay: .5
    `)
    
    AFRAME.registerComponent('ambient-light', {
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

  getReference(){
    return this.entity
  }
}