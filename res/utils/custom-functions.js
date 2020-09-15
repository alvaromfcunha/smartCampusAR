export function slowFade(entity, duration, inverse=false) {  
  return new Promise((resolve) => {
    var step = .02;
    var stepDuration = duration/(100/step);
    
    if (!inverse) {
      var opacity = 1
      var routine = setInterval(function(){
      opacity = Math.round(((opacity - step) + Number.EPSILON) * 100) / 100
      entity.setAttribute('model-opacity',opacity)
      if (opacity <= 0){
          entity.object3D.visible = false;
          resolve();
          clearInterval(routine);
      }
      }, stepDuration)
    }
    else if (inverse) {
      var opacity = 0
      var routine = setInterval(function(){
      opacity = Math.round(((opacity + step) + Number.EPSILON) * 100) / 100
      if (opacity <= 1)
          entity.setAttribute('model-opacity', opacity)
      else {
          entity.setAttribute('model-opacity', 1)
          resolve();
          clearInterval(routine);
      }
      }, stepDuration)
    }
  })
}