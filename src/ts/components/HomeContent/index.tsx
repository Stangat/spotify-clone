import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { getPlaylist } from '../../../../api';
import { CardItem } from '../CardItem';

type HomeContentProps = {
  token: string;
}; 

export const HomeContent: React.FC<HomeContentProps> = (props) => {
  const [playlist,setPlaylists] = useState([])
  
  const playlists = async () => {
   const response = await getPlaylist(props);
   setPlaylists(response)
   console.log(response)
  }

  useEffect(()=>{
    playlists()
  },[])
  
  return (
    <Content
      style={{
        margin: '24px 16px 0',
        overflow: 'initial',
        backgroundColor: '#1e1e1e',
        color: 'white',
        fontWeight: 600,
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      <CardItem token={props.token}/>
{/*       <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem /> */}
    </Content>
  );
};
