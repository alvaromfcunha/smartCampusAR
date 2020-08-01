export function slowFade(entity, duration, inverse=false) {
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