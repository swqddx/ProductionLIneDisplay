import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

class VehicleCar {

  constructor(_option) {
    this.$canvas = _option.canvas;
    this.width = _option.width;
    this.height = _option.height;
    this.setScene();
    this.setCamera();
    this.setAxis();
    this.setLight();
    this.setRenderer();
    this.setPlane();
  }
}

export default VehicleCar;
