AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        
        setInterval(this.shootEnemyFireball, 2000)
    },
    shootEnemyFireball: function () {
        //get all enemies using class name
        //.querySelectorAll() fetches all the elements which have enemy included in there ids
        var els = document.querySelectorAll(".enemy"); //. means classes

        for (var i = 0; i < els.length; i++) {
            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "red");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 2,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyFireball);

            //Three.js Vector Variables
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;

            //getting enemy and player position using Three.js methods
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            //.getWorldPosition() is a method in Three.js to store the value of positions as vectors
            player.getWorldPosition(position1); 
            enemy.getWorldPosition(position2);

            //setting the velocity and it's direction
            var direction = new THREE.Vector3();

            //subVectors() gets you the EXACT difference between the positions of two points
            //normalize() is used to get the unit vector which is the direction vector of Vec1
            direction.subVectors(position1, position2).normalize();

            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));

            //setting dynamic-body attribute
            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0"
            });

            //getting text attribute
            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value); //parseInt() converts string into integer

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {       
                    if(playerLife > 0){
                        playerLife -= 1;
                        element.setAttribute("text", {
                            value: playerLife
                        });
                    }

                    if(playerLife <= 0){
                        //show text
                        var txt = document.querySelector("#over");
                        txt.setAttribute("visible", true);

                        //remove tanks
                        var tankEl = document.querySelectorAll(".enemy"); 
                        
                        for(var i = 0; i < tankEl.length; i++){
                            scene.removeChild(tankEl[i]);
                        }
                    }
                }
            });
        }
    },
});