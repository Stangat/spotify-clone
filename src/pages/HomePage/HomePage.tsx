import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getFeaturedPlaylistsSpotifyApi,
  getRelatedArtists,
  getUserTopArtistsSpotifyApi,
} from '../../../api/api';
import { AlbumType, ProfileType } from '../../../interface/interface';
import { CardArtist } from '../../components/CardItem/CardArtist';
import { CardItem } from '../../components/CardItem/CardItem';
import { HeaderHome } from '../../components/Header/Header';
import { HomeContent } from '../../components/HomeContent/HomeContent';
import { PaginationHeader } from '../../components/Pagination/Pagination';
import { RowOfCards } from '../../components/RowOfCards/RowOfCards';
import styles from './homePage.module.less';

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
  const [favoriteArtists, setFavoriteArtists] = useState<SpotifyApi.UsersTopArtistsResponse>();
  const [relatedArtists, setRelatedArtists] = useState<SpotifyApi.ArtistsRelatedArtistsResponse>();
  const navigate = useNavigate();

  const [featuredPage, setFeaturedPage] = useState(1);
  const [featuredTotal, setFeaturedTotal] = useState(1);

  const LIMIT = 7;
  const OFFSET = (featuredPage - 1) * LIMIT;
  const index =  2;

  const handleRows = async () => {
    const res = await getFeaturedPlaylistsSpotifyApi(props.token, OFFSET, LIMIT);
    const res2 = await getUserTopArtistsSpotifyApi(props.token);
    const res3 = await getRelatedArtists(props.token, res2.items[index].id);
    setFeaturedPlaylists(res);
    setFavoriteArtists(res2);
    setRelatedArtists(res3);
    setFeaturedTotal(res.playlists.total);
  };

  useEffect(() => {
    handleRows();
  }, [OFFSET]);

  return (
    <div style={{ width: '100%', padding: '0 32px 160px' }}>
      <HeaderHome profile={props.profile} setProfile={props.setProfile} token={props.token} setToken={props.setToken} />
      <div className={styles.mainContentContainer}>
        <div className={styles.hat}>
          <h2 className={styles.titleAlbums}>{featuredPlaylists?.message}</h2>
          <PaginationHeader page={featuredPage} setPage={setFeaturedPage} totalAlbums={featuredTotal} limit={LIMIT} />
        </div>
        <RowOfCards>
          {featuredPlaylists?.playlists &&
            featuredPlaylists?.playlists?.items.map((e, i) =>
              i < 8 ? (
                <CardItem
                  key={e.id}
                  album={e}
                  onClick={() => {
                    navigate(`/playlist/${e.id}`);
                  }}
                ></CardItem>
              ) : (
                ''
              )
            )}
        </RowOfCards>
      </div>
      <HomeContent
        token={props.token}
        totalAlbums={props.totalAlbums}
        setTotalAlbums={props.setTotalAlbums}
        albums={props.albums}
        setALbums={props.setALbums}
        page={props.page}
        setPage={props.setPage}
        limit={props.limit}
      />
      <RowOfCards title="Your favorite artists">
        {favoriteArtists?.items &&
          favoriteArtists?.items?.map((e, i) => (i < 8 ? <CardArtist key={e.id} artist={e}></CardArtist> : ''))}
      </RowOfCards>
      <RowOfCards title={`More like ${favoriteArtists?.items[index].name}`}>
        {relatedArtists?.artists &&
          relatedArtists?.artists?.map((e, i) => (i < 8 ? <CardArtist key={e.id} artist={e}></CardArtist> : ''))}
      </RowOfCards>
    </div>
  );
};
