import { Avatar, Card } from 'antd';
import {
  ArtistTopUserType,
  ITrackTypes,
  PlaylistsType,
  ProfileType,
  TopArtistsType,
  UserCurrentPlaylist,
} from '../../../interface/interface';
import styles from './detailsProfilePage.module.less';
import { UserOutlined } from '@ant-design/icons';
import { getTrack, getUserPlaylists, getUserTopArtist, getUserTopTracks } from '../../../api/api';
import { useEffect, useState } from 'react';
import { DropDownProfile } from '../DropDownProfile/DropDownProfile';
import Meta from 'antd/es/card/Meta';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { TopArtistBlock } from '../TopArtistBlock/TopArtistBlock';

type DetailsProfilePageProps = {
  token: string;
  profile: ProfileType | undefined;
  playlists: PlaylistsType | undefined;
  setPlaylists: (playlist: PlaylistsType) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  setSongName: (songName: string) => void;
  setArtistName: (ArtistName: string) => void;
  setCoverUrl: (coverUrl: string) => void;
  trackDuration: number;
  setTrackDuration: (trackDuration: number) => void;
  trackId: string;
  setTrackId: (trackId: string) => void;
  albumTracks: ITrackTypes[];
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
  topArtists: TopArtistsType | undefined;
  setTopArtists: (topArtists: TopArtistsType | undefined) => void;
};

export const DetailsProfilePage: React.FC<DetailsProfilePageProps> = props => {

  const [topTracks, setTopTracks] = useState<TopArtistsType>();

  const getPlaylistHandler = async () => {
    const response = await getUserPlaylists({ token: props.token });
    props.setPlaylists(response);
  };

  const getTopArtistsUserHandler = async () => {
    const response = await getUserTopArtist({ token: props.token });
    props.setTopArtists(response);
  };

  const getTopTracksUserHandler = async () => {
    const response = await getUserTopTracks({ token: props.token });
    setTopTracks(response);
  };

  const playingTrackHandler = (url: string) => {
    if (!props.isPlaying) {
      props.player.src = url;
      props.player.play();
      props.setIsPlaying(true);
    } else {
      if (props.player.src !== url) {
        props.player.src = url;
        props.player.play();
      } else {
        props.player.pause();
        props.setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    getTopTracksUserHandler();
    getTopArtistsUserHandler();
    getPlaylistHandler();
  }, []);
  // console.log(topTracks);
  return (
    <div className={styles.detailsProfileContainer}>
      <div className={styles.blockProfileDescription} key={props.profile?.id}>
        <div style={{ padding: '2%' }}>
          <Avatar size={250} icon={<UserOutlined />} />
        </div>
        <div className={styles.descriptionProfile}>
          <p>PROFILE</p>
          <p className={styles.userNameProfile}>{props.profile?.display_name}</p>
          <p>{props.playlists?.total} Public Playlists</p>
          <p>Followers: {props.profile?.followers.total}</p>
        </div>
      </div>
      <DropDownProfile />
      <TopArtistBlock topArtists={props.topArtists} />

      <div className={styles.topArtistUser}>
        <div className={styles.topTracksDescription}>
          <div>
            <p className={styles.descriptionTopArtist + ' ' + styles.topArtisDescription}>Top tracks this month</p>
            <p className={styles.descriptionTopArtist}>Only visible to you</p>
          </div>
          <p className={styles.descriptionTopArtist} /* onClick={} */> SHOW ALL</p>
        </div>
        <div>
          {topTracks?.items.map((track: ArtistTopUserType, index: number) => {
            //console.log(track);
            return (
              <div className={styles.trackBlock} key={track.id}>
                {props.isPlaying && track.id === props.trackId ? (
                  <PauseCircleFilled
                    className={styles.playPauseButton}
                    key={index}
                    onClick={() => {
                      playingTrackHandler(track.preview_url);
                    }}
                  />
                ) : (
                  <PlayCircleFilled
                    className={styles.playPauseButton}
                    key={index}
                    onClick={async () => {
                      playingTrackHandler(track.preview_url);
                      const currentTrack = await getTrack(props.token, track.id);
                      props.setSongName(track.name);
                      props.setArtistName(track.artists[0].name);
                      const url = await currentTrack.album.images[0].url;
                      props.setCoverUrl(url);
                      props.player.preload = 'metadata';
                      props.player.onloadedmetadata = () => {
                        props.setTrackDuration(props.player.duration);
                      };
                      props.setTrackId(track.id);
                      const response = await getUserTopTracks({ token: props.token });
                      props.setAlbumTracks(response.items);
                    }}
                  />
                )}
                <div>
                  <p>{track.name}</p>
                  <p className={styles.descriptionTopArtist}>
                    {track.artists.map(artist => {
                      return artist.name;
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.topArtistUser}>
        <p className={styles.descriptionTopArtist + ' ' + styles.topArtisDescription + ' ' + styles.desc}>
          Public Playlist
        </p>
        <div className={styles.playlistsUser}>
          {props.playlists?.items.map((playlist: UserCurrentPlaylist) => {
            //console.log(playlist)
            return (
              <Card
                key={playlist.id}
                hoverable
                style={{
                  maxWidth: 205,
                  margin: '1%',
                  background: '#181818',
                  boxShadow: '0px 0px 5px 0px black',
                  border: 'none',
                  padding: '2%',
                }}
                cover={
                  <img
                    alt="example"
                    src="https://w7.pngwing.com/pngs/65/131/png-transparent-musical-note-eighth-notes-angle-monochrome-silhouette.png"
                    style={{ boxShadow: '0px 0px 5px 0px black' }}
                  />
                }
              >
                <Meta title={playlist.name} />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
