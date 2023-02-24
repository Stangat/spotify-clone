import { useEffect, useState } from 'react';
import {
  getAlbumTracks,
  getSingleAlbumSpotifyApi,
} from '../../../api/api';
import { AlbumType, ITrackTypes } from '../../../interface/interface';
import styles from './details.module.less';
import { useTranslation } from 'react-i18next';
import { AlbumTrackRow } from '../AlbumTrackRow/AlbumTrackRow';

type DetailsAlbumContentProps = {
  token: string;
  id: string;
  albums: AlbumType[];
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
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

export const DetailsAlbumContent: React.FC<DetailsAlbumContentProps> = props => {
  const { t } = useTranslation();
  const [album, setAlbum] = useState<SpotifyApi.SingleAlbumResponse>();
  const [tracks, setTracks] = useState<ITrackTypes[]>([]);

  const timeSvg = () => {
    return (
      <svg role="img" height="16" width="16" aria-hidden="true" fill="#cecece" viewBox="0 0 16 16">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
        <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
      </svg>
    );
  };

  const FIELDS = ['#', 'TITLE', timeSvg()];

  const getTracksHandler = async () => {
    const response = (await getAlbumTracks({ id: props.id, token: props.token })).items;
    const response2 = await getSingleAlbumSpotifyApi(props.token, props.id);
    setAlbum(response2);
    setTracks(response);
  };

  useEffect(() => {
    getTracksHandler();
  }, []);

  return (
    <div className={styles.detailsContentContainer}>
      <div key={props.id}>
        {/* {props.albums.map(album => { */}
        {/* if (album.id === props.id) {
            // TODO req
            // return ( */}
        {album ? (
          <div
            key={props.id}
            className={styles.blockImage}
            style={{
              borderColor: '#000000',
              backgroundImage: `url(${album.images ? album.images[0].url : ''})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div className={styles.boxBlur}>
              <img
                className={styles.imageAlbum}
                key={album.id}
                alt={album.label}
                src={album.images ? album.images[1].url : ''}
              />
              <div className={styles.descriptionAlbumTracks}>
                <p className={styles.typeAlbum}>{album.type}</p>
                {album.name.length > 17 ? (
                  <p className={styles.albumNameMini}>{album.name}</p>
                ) : (
                  <p className={styles.albumName}>{album.name}</p>
                )}
                <div className={styles.descriptionBottom}>
                  <div className={styles.detailsContainer}>
                    {album.artists.map(artist => {
                      return (
                        <p className={styles.name} key={artist.id}>
                          {`${artist.name}`}
                        </p>
                      );
                    })}
                  </div>
                  <p className={styles.date}>{`• ${album.release_date.slice(0, 4)} •`}</p>
                  <p className={styles.songs}>
                    {album.total_tracks < 10
                      ? `${album.total_tracks} ${t('song')}`
                      : `${album.total_tracks} ${t('songs')}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {/* );
          }
        })} */}
      </div>
      <div className={styles.albumBody}>
        <div className={styles.tracksHeader}>
          {FIELDS.map((e, i) => (
            <div key={i} className={styles['column' + i]}>
              {e}
            </div>
          ))}
        </div>
        <div className={styles.tracksBlock}>
          {tracks &&
            tracks.map((track, index) => (
              <AlbumTrackRow
                key={index}
                token={props.token}
                track={track}
                id={props.id || ''}
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
            ))}
        </div>
      </div>
    </div>
  );
};
