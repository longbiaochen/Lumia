/*
*
* */

// Global variables
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var FLOOR = -250;

$(function() {
	var container;
	var scene, camera, renderer;
	var geometry, material, mesh;

	var controls;

	var mouseX = 0, mouseY = 0;
	var mouseXOnMouseDown = 0, mouseYOnMouseDown = 0;
	var targetRotationX = 0, targetRotationY = 0;
	var targetRotationXOnMouseDown = 0, targetRotationYOnMouseDown = 0;
	var isDragging = false;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	init();
	interact();

	function init() {
		container = document.createElement('div');
		document.body.appendChild(container);

		camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 20000);
		camera.position.x = 500;
		camera.position.y = 500;
		camera.position.z = 500;

		scene = new THREE.Scene();
		scene.add(camera);

		// CONTROLS
		controls = new THREE.TrackballControls(camera);
		controls.rotateSpeed = 3.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = false;
		controls.dynamicDampingFactor = 0.3;

		// LIGHTS
		var directionalLightFront = new THREE.DirectionalLight(0xffffff);
		directionalLightFront.position.set(0, 0, 1000).normalize();
		scene.add(directionalLightFront);

		var directionalLightBack = new THREE.DirectionalLight(0xffffff);
		directionalLightBack.position.set(0, 0, -1000).normalize();
		scene.add(directionalLightBack);

		var directionalLightLeft = new THREE.DirectionalLight(0xffffff);
		directionalLightLeft.position.set(-1000, 0, 0).normalize();
		scene.add(directionalLightLeft);

		var directionalLightRight = new THREE.DirectionalLight(0xffffff);
		directionalLightRight.position.set(1000, 0, 0).normalize();
		scene.add(directionalLightRight);

		var directionalLightTop = new THREE.DirectionalLight(0xffffff);
		directionalLightTop.position.set(0, 1000, 0).normalize();
		scene.add(directionalLightTop);

		var directionalLightBottom = new THREE.DirectionalLight(0xffffff);
		directionalLightBottom.position.set(0, -1000, 0).normalize();
		scene.add(directionalLightBottom);

		// RENDERER
		try {
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
			renderer.domElement.style.position = "relative";

			container.appendChild(renderer.domElement);

		} catch (e) {
		}

		// LOADER
		var loader = new THREE.JSONLoader();
		loader.load("/Objects/bird/bird.json", function(geometry) {
			geometry.computeBoundingSphere();
			var radius = geometry.boundingSphere.radius;
			var scale = 400 / radius;
			mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
			mesh.position.set(0, -radius, 0);
			mesh.scale.set(scale, scale, scale);
			scene.add(mesh);

			animate();

		});

	}

	function interact() {

	}

	function animate() {
		requestAnimationFrame(animate);

		render();

	}

	function render() {
		controls.update();

		renderer.render(scene, camera);

	}

});
