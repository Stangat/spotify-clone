import { Layout } from 'antd';
import { AlbumType, ITrackTypes, PlaylistsType, ProfileType, TopArtistsType } from '../../../interface/interface';
import { DetailsProfilePage } from '../../components/DetailsProfilePage/DetailsProfilePage';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import { SideBar } from '../../components/SideBar/SideBar';

type ProfilePageProps = {
  token: string;
  setToken: (token: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  songName: string;
  artistName: string;
  setSongName: (songName: string) => void;
  setArtistName: (ArtistName: string) => void;
  coverUrl: string;
  setCoverUrl: (coverUrl: string) => void;
  trackDuration: number;
  setTrackDuration: (trackDuration: number) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  playlists: PlaylistsType | undefined;
  setPlaylists: (playlist: PlaylistsType) => void;
  albums: AlbumType[];
  albumTracks: ITrackTypes[];
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
  trackId: string;
  setTrackId: (trackId: string) => void;
  topArtists: TopArtistsType | undefined;
  setTopArtists: (topArtists: TopArtistsType | undefined) => void;
  topTracks: TopArtistsType | undefined;
  setTopTracks: (topTracks: TopArtistsType | undefined) => void;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
};

export const ProfilePage: React.FC<ProfilePageProps> = props => {
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
          <DetailsProfilePage
            topTracks={props.topTracks}
            setTopTracks={props.setTopTracks}
            topArtists={props.topArtists}
            setTopArtists={props.setTopArtists}
            profile={props.profile}
            playlists={props.playlists}
            setPlaylists={props.setPlaylists}
            token={props.token}
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
          />
        </Layout>
      </Layout>
    </div>
  );
};
