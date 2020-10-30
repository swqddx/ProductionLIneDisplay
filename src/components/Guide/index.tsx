import * as React from 'react';
import { Button } from '@alifd/next';
import { history } from 'ice';
import styles from './index.module.scss';

const Guide = () => {
  const partConfig = [
    {name: 'study'},
    {name: 'web3D'},
    {name: 'presentation'},
    {name: 'vehicle'}
  ]

  const jumpToComponent = (name) => {
    // switch (name) {
    //   case 'study':
    //     console.log('study');
    //     history.push('/study');
    //     break;
    //   case 'web3D':
    //     console.log('web3D');
    //     history.push('/web3D');
    //     break;
    //   case 'presentation':
    //     console.log('presentation');
    //     history.push('/presentation');
    //     break;
    //   default:
    //     console.error('no params');
    //     break;
    // }
    history.push(`/${name}`);
  }


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome to Web3D test!</h2>

      <p className={styles.description}>This is a awesome project, enjoy it!</p>

      <div className={styles.action}>
        {
          partConfig.map((item, key)=>{
            return (
              <Button size='medium' type='secondary' key={key} className={styles.jumpButton} onClick={() => {
                jumpToComponent(item.name);
              }}>
                {item.name.toLocaleUpperCase()}
              </Button>
            )
          })
        }
      </div>
    </div>
  );
};

export default Guide;
