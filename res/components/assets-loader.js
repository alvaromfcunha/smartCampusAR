AFRAME.registerComponent('assets-loader', {
  init: function() {
    console.log("HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    const mainBuilding = document.createElement('a-asset-item');
    mainBuilding.setAttribute('src', "/res/gltf/predioCentral.gltf");
    mainBuilding.setAttribute('id', 'main-building')
    this.appendChild(mainBuilding);

    const nazarethRoom = document.createElement('a-asset-item');
    nazarethRoom.setAttribute('src', "/res/gltf/salaNazareth.gltf");
    nazarethRoom.setAttribute('id', 'nazareth-room')
    this.appendChild(nazarethRoom);

    const box = document.createElement('a-asset-item');
    box.setAttribute('src', "/res/gltf/box.gltf");
    box.setAttribute('id', 'box')
    this.appendChild(box);
  }
})