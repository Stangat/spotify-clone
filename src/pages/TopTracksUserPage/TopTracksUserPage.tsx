import { PauseCircleFilled, PlayCircleFilled } from '@mui/icons-material';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { getTrack, getUserTopTracks } from '../../../api/api';
import {
  ArtistTopUserType,
  ITrackTypes,
  PlaylistsType,
  ProfileType,
  TopArtistsType,
} from '../../../interface/interface';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import styles from '../../components/DetailsProfilePage/detailsProfilePage.module.less';
import { style } from '@mui/system';
type TopTracksUserPageProps = {
  token: string;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  setToken: (token: string) => void;
  setTopTracks: (topTracks: TopArtistsType | undefined) => void;
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
  topTracks: TopArtistsType | undefined;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
};
export const TopTracksUserPage: React.FC<TopTracksUserPageProps> = props => {
  const getTopTracksUserHandler = async () => {
    const response = await getUserTopTracks({ token: props.token, limit: 50 });
    // console.log(response);
    props.setTopTracks(response);
    localStorage.setItem('albumTracks', JSON.stringify(response.items));
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
  }, []);
  return (
    <div style={{ background: '#1e1e1e', width: '100%' }}>
      <Layout hasSider style={{ background: 'rgb(30, 30, 30)', marginBottom: '10%' }}>
        <Layout style={{ background: '#1e1e1e', display: 'flex' }}>
          <DropdownProfile
            setToken={props.setToken}
            profile={props.profile}
            setProfile={props.setProfile}
            token={props.token}
          />
          <div className={styles.topTracksUserPageContainer}>
            {props.topTracks?.items.map((track: ArtistTopUserType, index: number) => {
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
                        const response = await getUserTopTracks({ token: props.token, limit: 50 });
                        props.setAlbumTracks(response.items);
                        const shuffled = localStorage.getItem('shuffled');
                        if (shuffled !== 'true') {
                          localStorage.setItem('albumTracks', JSON.stringify(response.items));
                        } else {
                          localStorage.setItem('shuffled', '');
                          props.setShuffle(false);
                          localStorage.setItem('albumTracks', JSON.stringify(response.items));
                        }
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
        </Layout>
      </Layout>
    </div>
  );
};
