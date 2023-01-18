AFRAME.registerComponent("bullets", {
    init: function(){
        this.shootBullet();
    },
    shootBullet: function(){
        window.addEventListener("keydown", (e) => {
            if(e.key === "z"){
                var bullet = document.createElement("a-entity");

                bullet.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.1
                });

                bullet.setAttribute("material", "color", "blue");

                var cam = document.querySelector("#camera-rig");
                pos = cam.getAttribute("position");

                bullet.setAttribute("position", {
                    x: pos.x,
                    y: pos.y + 1,
                    z: pos.z - 0.5
                });

                var camera = document.querySelector("#camera").object3D;

                //getting the camera direction as Three.js vector
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);

                //setting the velocity and its direction
                bullet.setAttribute("velocity", direction.multiplyScalar(-50));

                //setting the bullet as a dynamic body
                bullet.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "50"
                });

                //adding the collide event listener to the bullet
                bullet.addEventListener("collide", this.removeBullet);

                //appending the bullet child into the scene
                var scene = document.querySelector("#scene");
                scene.appendChild(bullet);

                //shooting sound
                this.shootSound();
            }
        });
    },
    removeBullet: function(e) {
        var scene = document.querySelector("#scene");
        
        //bullet element
        var element = e.detail.target.el;

        //the element which gets hit
        var elementHit = e.detail.body.el;

        if(elementHit.id.includes("enemy")){
            print("DFDFDFDDDDDDDDD")
            scene.removeChild(elementHit);
            console.log(element.id)
        }

        //remove event listener
        element.removeEventListener("collide", this.removeBullet);

        //remove the bullets from the scene to prevent memory leak
        scene.removeChild(element);
    },
    shootSound: function(){
        var entity = document.querySelector("#sound1");
        entity.components.sound.playSound();
    }
});