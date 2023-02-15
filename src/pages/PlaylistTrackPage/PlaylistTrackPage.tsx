import { PauseCircleFilled, PlayCircleFilled } from '@mui/icons-material';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrack, getTracksPLaylist, getUserTopTracks } from '../../../api/api';
import {
  ArtistTopUserType,
  ITrackTypes,
  PlaylistsType,
  PLaylistTracksType,
  ProfileType,
  TopArtistsType,
  TrackPlaylist,
} from '../../../interface/interface';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import styles from './playlistTrackPage.module.less';
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

export const PlaylistTrackPage: React.FC<TopTracksUserPageProps> = props => {
  const [tracks, setTracks] = useState<PLaylistTracksType>();
  let params: any = useParams();
  const getTopTracksUserHandler = async () => {
    const response = await getTracksPLaylist(props.token, params.id);
    setTracks(response);
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
            {tracks?.items.map((track: TrackPlaylist, index: number) => {
              return (
                <div className={styles.trackBlock} key={track.track.id}>
                  {props.isPlaying && track.track.id === props.trackId ? (
                    <PauseCircleFilled
                      className={styles.playPauseButton}
                      key={index}
                      onClick={() => {
                        playingTrackHandler(track.track.preview_url);
                      }}
                    />
                  ) : (
                    <PlayCircleFilled
                      className={styles.playPauseButton}
                      key={index}
                      onClick={async () => {
                        playingTrackHandler(track.track.preview_url);
                        const currentTrack = await getTrack(props.token, track.track.id);
                        props.setSongName(track.track.name);
                        props.setArtistName(track.track.artists[0].name);
                        const url = await currentTrack.album.images[0].url;
                        props.setCoverUrl(url);
                        props.player.preload = 'metadata';
                        props.player.onloadedmetadata = () => {
                          props.setTrackDuration(props.player.duration);
                        };
                        props.setTrackId(track.track.id);
                        const response = await getTracksPLaylist(props.token, params.id);
                        const tracks = response.items.map((item: TrackPlaylist) => item.track);
                        props.setAlbumTracks(tracks);
                        const shuffled = localStorage.getItem('shuffled');
                        if (shuffled !== 'true') {
                          localStorage.setItem('albumTracks', JSON.stringify(tracks));
                        } else {
                          localStorage.setItem('shuffled', '');
                          props.setShuffle(false);
                          localStorage.setItem('albumTracks', JSON.stringify(tracks));
                        }
                      }}
                    />
                  )}
                  <div>
                    <p>{track.track.name}</p>
                    <p className={styles.descriptionTopArtist}>
                      {track.track.artists.map(artist => {
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
