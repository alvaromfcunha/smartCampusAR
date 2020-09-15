const tag = '[NarazerhRoom]'

export default class MainBuilding {
  constructor(props){
    this.entity = document.createElement('a-entity');
    this.entity.setAttribute('nazareth-room', '');
    this.entity.setAttribute('id','nazareth-room')
    this.entity.setAttribute('gltf-model','#nazareth-room-asset')
    this.entity.setAttribute('position','0 0 1')
    this.entity.setAttribute('rotation','0 -90 90')
    this.entity.setAttribute('scale','.3 .3 .3')
    this.entity.setAttribute('model-opacity','1')
    this.entity.setAttribute('animation__zoom_out',`
      property: scale; 
      to: 0 0 0; 
      dur: 1600;
      loop: false;
      easing: linear;
      startEvents: zoom_out;
    `)
    this.entity.setAttribute('animation__zoom_in',`
      property: scale; 
      to: .2 .2 .2; 
      dur: 1600;
      loop: false;
      easing: linear;
      startEvents: zoom_in;
    `)
    this.entity.setAttribute('animation__rotation',`
      property: rotation; 
      from: 0 -90 90;
      to: 360 -90 90; 
      dur: 1600;
      loop: false;
      elasticity: 500;
      easing: easeInOutQuad;
      startEvents: rotate;
    `)

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

