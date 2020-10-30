import Home from '@/pages/Home';
import Study from '@/pages/Study';
import Presentation from '@/pages/Presentation';
import Web3D from '@/pages/Web3D';
import ThreeJS from '@/components/Three';
import CannonJS from '@/components/Cannon';
import Vehicle from '@/pages/Vehicle';

const routerConfig = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/study',
    component: Study,
    children:[
      {
        path:'/three',
        component: ThreeJS,
      },
      {
        path:'/cannon',
        component: CannonJS,
      },
      {
        path: '/',
        redirect: '/study/three',
      }
    ]
  },
  {
    path: '/presentation',
    exact: true,
    component: Presentation,
  },
  {
    path: '/web3D',
    exact: true,
    component: Web3D,
  },
  {
    path: '/vehicle',
    exact: true,
    component: Vehicle,

  }
]

export default routerConfig