import React from 'react';
import { Shell, Nav, Icon } from '@alifd/next';
import { Link, history } from 'ice';
import styles from './index.module.scss';

const Study = ({ children }) => {

  return (
    <div>
      <Shell className={styles.iframeHack} style={{ border: '1px solid #eee' }} type="brand">
        <Shell.Branding>
          <div className={styles.rectangular} onClick={() => { history.push('/'); }}>
            学
          </div>
          <span style={{ marginLeft: 10 }}>study repo</span>
        </Shell.Branding>
        <Shell.Navigation direction="ver" collapse={false} trigger={null}>
          <Nav embeddable aria-label="global navigation">
            <Nav.Item
              key="three"
              icon={<Icon type="3D" />}
            >
              <Link to='/study/three'>
                <span> three.js</span>
              </Link>
            </Nav.Item>
            <Nav.Item
              key="cannon"
              icon={<Icon type="tubiaozhizuomoban-" />}
            >
              <Link to='/study/cannon'>
                <span> cannon.js</span>
              </Link>
            </Nav.Item>
          </Nav>
        </Shell.Navigation>
        <Shell.Action>
          <img src="../../public/avatar.jpg" className={styles.avatar} alt="用户头像" />
          <span style={{ marginLeft: 10 }}>奇骥</span>
        </Shell.Action>

        <Shell.Content style={{ minHeight: "800px" }}>
          {children}
        </Shell.Content>

        <Shell.Footer>
          <span style={{ color: "#000" }}>Alibaba Fusion</span>
          <span style={{ color: "#000" }}>@ 2019 Alibaba Piecework 版权所有</span>
        </Shell.Footer>
      </Shell>
    </div >
  )
};

export default Study;
