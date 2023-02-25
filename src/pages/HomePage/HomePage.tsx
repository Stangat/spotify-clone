import { width } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedPlaylistsSpotifyApi, getRecentlyPlayedTracks } from '../../../api/api';
import { AlbumType, ProfileType } from '../../../interface/interface';
import { CardItem } from '../../components/CardItem/CardItem';
import { HeaderHome } from '../../components/Header/Header';
import { HomeContent } from '../../components/HomeContent/HomeContent';
import { PaginationHeader } from '../../components/Pagination/Pagination';
import { RowOfCards } from '../../components/RowOfCards/RowOfCards';

type HomePageProps = {
  token: string;
  setToken: (token: string) => void;
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  page: number;
  setPage: (page: number) => void;
  totalAlbums: number;
  setTotalAlbums: (totalAlbums: number) => void;
  limit: number;
};

export const HomePage: React.FC<HomePageProps> = props => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState<SpotifyApi.ListOfFeaturedPlaylistsResponse>();
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<SpotifyApi.UsersRecentlyPlayedTracksResponse>();
  const navigate = useNavigate();

  const handleRows = async () => {
    const res = await getFeaturedPlaylistsSpotifyApi(props.token);
    const res2 = await getRecentlyPlayedTracks(props.token);
    setFeaturedPlaylists(res);
    setRecentlyPlayedTracks(res2);
  };

  useEffect(() => {
    handleRows();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <HeaderHome profile={props.profile} setProfile={props.setProfile} token={props.token} setToken={props.setToken} />
      <RowOfCards title={featuredPlaylists?.message}>
        {featuredPlaylists?.playlists
        && featuredPlaylists?.playlists?.items.map((e, i) => i < 8 ? 
        <CardItem key={e.id} album={e} 
        onClick={() => {
          navigate(`/playlist/${e.id}`);
        }}></CardItem> : '')}
      </RowOfCards>
      <RowOfCards title={featuredPlaylists?.message}>
        {featuredPlaylists?.playlists
        && featuredPlaylists?.playlists?.items.map((e, i) => i < 8 ? 
        <CardItem key={e.id} album={e} 
        onClick={() => {
          navigate(`/playlist/${e.id}`);
        }}></CardItem> : '')}
      </RowOfCards>
      <PaginationHeader page={props.page} setPage={props.setPage} totalAlbums={props.totalAlbums} limit={props.limit}/>
      <HomeContent
        token={props.token}
        totalAlbums={props.totalAlbums}
        setTotalAlbums={props.setTotalAlbums}
        albums={props.albums}
        setALbums={props.setALbums}
      />
    </div>
  );
};
