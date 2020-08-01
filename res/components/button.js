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
