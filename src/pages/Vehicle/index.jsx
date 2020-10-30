import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import SceneDemo from './utils/Scene';
// import VehicleCar from './utils/Vehicle';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import Time from './utils/Time';
import { saveAs } from 'file-saver';
// import { FBXLoader } from 'three/examples/js/loaders/FBXLoader';
import * as THREE from 'three';
import { Object3D, Vector3 } from 'three';


const Vehicle = () => {
  var scene, time, vehicle, wheels = [];
  // const [OrbitControls, setOrbitControls] = useState(false);
  var OrbitControls = false;
  const container = useRef();

  const init = () => {
    scene = new SceneDemo({
      canvas: container,
      width: container.current.offsetWidth,
      height: container.current.offsetHeight
    });
    time = new Time();
    //添加平面
    const geometry = new THREE.PlaneGeometry(500, 500, 1, 1);
    geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(- Math.PI / 2));
    const material = new THREE.MeshLambertMaterial({ color: 0xdddddd });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    scene.add(mesh);

    //添加小车模型, 解析零部件
    const fileLoader = new FBXLoader();
    fileLoader.load("models/HandAndCar_group.FBX", (obj) => {
      vehicle = obj;
      console.log(vehicle);
      scene.add(vehicle);
      vehicle.children[0].children.forEach((item) => {
        wheels.push(item.children[0]);
      });
      // 初始化轮子角度
      wheels.forEach((item, index) => {
        item.curPos = 0;
      })
      console.log(obj.position);
      vehicle.castShadow = true;
      let direction = 0;
      let speed = 0;
      const DEG = Math.PI / 30;
      const rOfCircle = 10;
      // speed单位为 圈/s
      function refreshCarPos() {
        obj.rotateY(direction);
        if (speed != 0 || direction!=0) {
          wheels.forEach((item) => {
            item.curPos += speed * DEG;
            if (item.curPos > DEG * 30000) {
              item.curPos = item.curPos - DEG * 30000;
            }
            item.rotateX(item.curPos);
          });
        }
        obj.translateOnAxis(new Vector3(Math.sin(direction), 0, Math.cos(direction)), speed * 0.1);
        // obj.translateY(10);
      }
      time.on("render", () => {
        refreshCarPos();
      });

      document.addEventListener('keydown', (e) => {
        switch (e.key) {
          case "w":
            speed = 10;
            console.log("w");
            break;
          case "a":
            direction = 0.02;
            console.log("a");
            break;
          case "s":
            speed = -10;
            console.log("s");
            break;
          case "d":
            direction = -0.02;
            console.log("d");
            break;
          default:
            console.log('defalt');
            break;
        }
      });

      document.addEventListener('keyup', (e) => {
        switch (e.key) {
          case "w":
            speed = 0;
            break;
          case "s":
            speed = 0;
            break;
          case "a":
            direction = 0;
            break;
          case "d":
            direction = 0;
            break;
          default:
            break;
        }
      })
      // 模型格式转化文件
      // var blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
      // saveAs(blob, "HandAndCar.json");

      // let posX = 0;
      // setInterval(()=>{
      //   posX+=10;
      //   obj.translateX(posX);
      // },1000)
    });

  }


  const switchControl = () => {
    OrbitControls = !OrbitControls;
    scene.setOrbitControls(OrbitControls);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <div className={styles.body}>
      <div className={styles.title}>小车3D物理实践</div>
      <div className={styles.controlLeft}>
        <button onClick={() => { switchControl(); }}>Control Button</button>
      </div>
      <div ref={container} className={styles.container}>

      </div>
    </div>
  )
}

export default Vehicle;
