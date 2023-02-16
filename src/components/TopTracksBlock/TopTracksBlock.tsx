import { PauseCircleFilled, PlayCircleFilled } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getTrack, getUserTopTracks } from '../../../api/api';
import {
  ArtistTopUserType,
  ITrackTypes,
  PlaylistsType,
  ProfileType,
  TopArtistsType,
} from '../../../interface/interface';
import styles from '../DetailsProfilePage/detailsProfilePage.module.less';

type TopTracksBlockProps = {
  topTracks: TopArtistsType | undefined;
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
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
};

export const TopTracksBlock: React.FC<TopTracksBlockProps> = props => {
  const navigate = useNavigate();
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

  return (
    <div className={styles.topArtistUser}>
      <div className={styles.topTracksDescription}>
        <div>
          <p className={styles.descriptionTopArtist + ' ' + styles.topArtisDescription}>Top tracks this month</p>
          <p className={styles.descriptionTopArtist}>Only visible to you</p>
        </div>
        <p
          className={styles.descriptionTopArtist}
          onClick={() => {
            navigate(`/top_tracks`);
          }}
        >
          SHOW ALL
        </p>
      </div>
      <div>
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
                    const response = await getUserTopTracks({ token: props.token, limit: 4 });
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
    </div>
  );
};
