var scene = null;
            var camera = null;
            var renderer = null;
            
            var material = null;
            var cube = null;
            
            function init() {
                renderer = new THREE.WebGLRenderer({
                    canvas: document.getElementById('mainCanvas')
                });
                scene = new THREE.Scene();
                
                camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
                camera.position.set(5, 15, 25);
                camera.lookAt(new THREE.Vector3(0, 0, 0));
                scene.add(camera);
                
                var light = new THREE.DirectionalLight();
                light.position.set(3, 2, 5);
                scene.add(light);
                
                // load shader
                $.get('shader/my.vs', function(vShader){
                    $.get('shader/my.fs', function(fShader){
                        material = new THREE.ShaderMaterial({
                            vertexShader: vShader,
                            fragmentShader: fShader
                        });
                
                        cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), material);
                        scene.add(cube);
                        
                        draw();
                    });
                });
            }
            
            function draw() {
                cube.rotation.y += 0.01;
                if (cube.rotation.y > Math.PI * 2) {
                    cube.rotation.y -= Math.PI * 2;
                }
            
                renderer.render(scene, camera);
                
                requestAnimationFrame(draw);
            }