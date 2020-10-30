/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import styles from './index.module.scss';



const ThreeJS = () => {
  const sceneBox = useRef<any>();
  let width: number;
  let height: number;

  // const [width, setWidth] = useState(1300);
  // const [height, setHeight] = useState(1200);
  // 获取元素的宽和高
  // const getSize = () => {
  //   // console.log("height: ", sceneBox.current.offsetHeight);
  //   // console.log("width: ", sceneBox.current.offsetWidth);
  //   setWidth(sceneBox.current.offsetWidth);
  //   setHeight(sceneBox.current.offsetHeight);
  // }



  const threeInit = () => {
    /**
     * 创建场景对象Scene
     */
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 0, 500);
    // 环境光
    const ambient = new THREE.AmbientLight(0x111111);
    scene.add(ambient);

    /**
     * 光源设置
     */
    // 点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 0); // 点光源位置
    scene.add(point); // 点光源添加到场景中
    // 设置用于计算阴影的光源对象
    point.castShadow = true;

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // // 设置光源位置
    // directionalLight.position.set(60, 100, 40);
    // scene.add(directionalLight);
    // // 设置用于计算阴影的光源对象
    // directionalLight.castShadow = true;
    // // 设置计算阴影的区域，最好刚好紧密包围在对象周围
    // // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
    // // 设置mapSize属性可以使阴影更清晰，不那么模糊
    // directionalLight.shadow.mapSize.set(1024, 1024)

    /**
     * 相机设置
     */
    // 创建相机对象
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 200, -200); // 设置相机位置
    camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)

    /**
     *  辅助相机设置
     */
    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);
    /**
     * 创建渲染器对象
     */
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);// 设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
    renderer.shadowMap.enabled = true; // 设置阴影
    sceneBox.current.appendChild(renderer.domElement); // 指定容器中插入canvas对象

    // 辅助坐标系
    const axes = new THREE.AxesHelper(10);
    scene.add(axes);

    // 添加地面
    const geometry = new THREE.PlaneGeometry(500, 500, 1, 1);
    geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(- Math.PI / 2));
    const material = new THREE.MeshLambertMaterial({ color: 0xdddddd });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    scene.add(mesh);

    // 添加物体
    const box = new THREE.BoxGeometry(10, 10, 10);
    for (let i = 0; i < 6; i++) {
      const boxMesh = new THREE.Mesh(box, material);
      boxMesh.castShadow = true;
      scene.add(boxMesh);
      boxMesh.position.set((Math.random() - 0.5) * 400, 5, (Math.random() - 0.5) * 400);
    }

    // 添加几何体
    const geometryBuffer = new THREE.SphereGeometry(20, 15, 15);

    // // 顶点数据
    // const vertices = new Float32Array([
    //   0, 0, 0,
    //   50, 0, 0,
    //   0, 100, 0,
    //   0, 0, 0,
    //   50, 0, 0,
    //   0, 0, 100,
    // ])

    // const colors = new Float32Array([
    //   1, 0, 0, // 顶点1颜色
    //   0, 1, 0, // 顶点2颜色
    //   0, 0, 1, // 顶点3颜色
    //   1, 1, 0, // 顶点4颜色
    //   0, 1, 1, // 顶点5颜色
    //   1, 0, 1, // 顶点6颜色
    // ]);

    // const attribue = new THREE.BufferAttribute(vertices, 3);
    // geometryBuffer.attributes.position = attribue;
    // geometryBuffer.attributes.color = new THREE.BufferAttribute(colors, 3);

    // 高亮模型
    const materialBuffer = new THREE.MeshPhongMaterial({
      // vertexColors: THREE.VertexColors, // 以顶点颜色为准
      color: 0xff0000,
      specular: 0x444444, // 高光部分的颜色
      shininess: 100, // 高光部分的亮度，默认30
    });
    const customMesh = new THREE.Mesh(geometryBuffer, materialBuffer);
    customMesh.position.set(0, 0, 0);
    scene.add(customMesh);

    // 加载树纹理贴图
    // const textureTree = new THREE.TextureLoader().load('tree.png');
    // // 批量创建表示一个树的精灵模型
    // for (let i = 0; i < 100; i++) {
    //   const spriteMaterial = new THREE.SpriteMaterial({
    //     map: textureTree,// 设置精灵纹理贴图
    //   });
    //   // 创建精灵模型对象
    //   const sprite = new THREE.Sprite(spriteMaterial);
    //   scene.add(sprite);
    //   // 控制精灵大小,
    //   sprite.scale.set(100, 100, 1); // 只需要设置x、y两个分量就可以
    //   const k1 = Math.random() - 0.5;
    //   const k2 = Math.random() - 0.5;
    //   // 设置精灵模型位置，在xoz平面上随机分布
    //   sprite.position.set(1000 * k1, 50, 1000 * k2)
    // }

    // 执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
    function render() {
      renderer.render(scene, camera);// 执行渲染操作
    }
    render();
    // 添加鼠标控制器
    const controls = new OrbitControls(camera, renderer.domElement);// 创建控件对象
    controls.addEventListener('change', render);// 监听鼠标、键盘事件
  }


  useEffect(() => {
    width = sceneBox.current.offsetWidth;
    height = sceneBox.current.offsetHeight;
    threeInit();

  }, []);

  return (
    <>
      <div ref={sceneBox} className={styles.container}>
      </div>
    </>
  )
};

export default ThreeJS;