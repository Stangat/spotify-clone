import { useParams } from 'react-router-dom';
import { AlbumType, ProfileType, ITrackTypes } from '../../../interface/interface';
import { DetailsAlbumContent } from '../../components/DetailsAlbumContent/DetailsAlbumContent';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import style from './albumDetails.module.less';

type DetailsAlbumPageProps = {
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  token: string;
  setToken: (token: string) => void;
  albums: AlbumType[];
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  songName: string;
  artistName: string;
  setSongName: (songName: string) => void;
  setArtistName: (artistName: string) => void;
  setCoverUrl: (coverUrl: string) => void;
  trackDuration: number;
  setTrackDuration: (trackDuration: number) => void;
  trackId: string;
  setTrackId: (trackId: string) => void;
  albumTracks: ITrackTypes[];
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
  likedSong?: boolean;
  setLikedSong: (likedSong: boolean) => void;
};

export const DetailsAlbumPage: React.FC<DetailsAlbumPageProps> = props => {
  const { id } = useParams();
  return (
    <div className={style.wrapper}>
       <div className={style.header}>
        <DropdownProfile
          setToken={props.setToken}
          profile={props.profile}
          setProfile={props.setProfile}
          token={props.token}
        />
      </div>
      <DetailsAlbumContent
        token={props.token}
        id={id || ''}
        albums={props.albums}
        setIsPlaying={props.setIsPlaying}
        isPlaying={props.isPlaying}
        player={props.player}
        setSongName={props.setSongName}
        setArtistName={props.setArtistName}
        setCoverUrl={props.setCoverUrl}
        trackDuration={props.trackDuration}
        setTrackDuration={props.setTrackDuration}
        trackId={props.trackId}
        setTrackId={props.setTrackId}
        albumTracks={props.albumTracks}
        setAlbumTracks={props.setAlbumTracks}
        shuffle={props.shuffle}
        setShuffle={props.setShuffle}
        likedSong={props.likedSong}
        setLikedSong={props.setLikedSong}
      />
    </div>
  );
};
