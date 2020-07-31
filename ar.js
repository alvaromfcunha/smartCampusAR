window.addEventListener('load', ()=>{ 
    console.log('page loaded!')
    
    // const predioAsset = document.querySelector('#predio');
    // const predio = document.querySelector('#predioEntity');

    // predioAsset.addEventListener('progress', xhr => {
    //   console.log('predio asset:', xhr.detail.loadedBytes / xhr.detail.totalBytes * 100)
    // })

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
    

function slowFade(entity, duration, inverse=false) {
  if (!inverse) {
    var opacity = 1
    var routine = setInterval(function(){
    var step = .02
    opacity = Math.round(((opacity - step) + Number.EPSILON) * 100) / 100
    entity.setAttribute('model-opacity',opacity)
    if (opacity <= 0){
        entity.object3D.visible = false;
        clearInterval(routine);
    }
    }, duration)
  }
  else if (inverse) {
    var opacity = 0
    var routine = setInterval(function(){
    var step = .02
    opacity = Math.round(((opacity + step) + Number.EPSILON) * 100) / 100
    if (opacity <= 1)
        entity.setAttribute('model-opacity', opacity)
    else {
        entity.setAttribute('model-opacity', 1)
        clearInterval(routine);
    }
    }, duration)
  }
}

AFRAME.registerComponent('model-opacity', {
  schema: {default: 1.0},
  init: function () {
    this.el.addEventListener('model-loaded', this.update.bind(this));
  },
  update: function () {
    var mesh = this.el.getObject3D('mesh');
    var data = this.data;
    if (!mesh) { return; }
    mesh.traverse(function (node) {
    if (node.isMesh) {
        node.material.opacity = data;
        node.material.transparent = true;
        node.material.needsUpdate = true;
    }      
    });
  }
});

AFRAME.registerComponent('button', {
  init: function() {
    const button = document.querySelector('#buttonEntity');
    const predio = document.querySelector('#predioEntity');
    const sala = document.querySelector('#salaEntity');

    button.addEventListener('click', function(ev, target){
      console.log("clicked!");

      predio.emit('rotate');
      predio.emit('zoom_out');
      slowFade(predio, 50);
      
      setTimeout(()=>{
        sala.object3D.position.set(0, 0, .3);
        sala.emit('rotate');
        sala.emit('zoom_in');
        slowFade(sala, 50, true);
      }, 3000);
    });
  }
});