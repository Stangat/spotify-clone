import { Content } from 'antd/es/layout/layout';
import React from 'react';

export const HomeContent = () => {
  return (
    <Content style={{ margin: '24px 16px 0', overflow: 'initial', backgroundColor: '#1e1e1e', color: 'white', fontWeight: 600 }}>
      {' '}
      <div
        style={{
          padding: 24,
          textAlign: 'center',
        }}
      >
        <p>long content</p>
        {
          // indicates very long content
          Array.from({ length: 100 }, (_, index) => (
            <React.Fragment key={index}>
              {index % 20 === 0 && index ? 'more' : '...'}
              <br />
            </React.Fragment>
          ))
        }
      </div>
    </Content>
  );
};
