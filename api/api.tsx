import { IResponseAlbumsType, IResponseTracksType } from '../interface/interface';

type Props = {
  token: string;
};
type Playlists = {
  name: string;
  id: string;
};
type getAlbumsPropsType = {
  token: string;
  offset: number;
  limit: number;
};

type getTracksType = {
  token: string;
  id: string;
};
export async function getAlbums(data: getAlbumsPropsType): Promise<IResponseAlbumsType> {
  const res = await fetch(`https://api.spotify.com/v1/browse/new-releases?offset=${data.offset}&limit=${data.limit}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await res.json();
  return response;
}

export async function getAlbumTracks(data: getTracksType): Promise<IResponseTracksType> {
  const res = await fetch(`https://api.spotify.com/v1/albums/${data.id}/tracks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await res.json();
  return response;
}

export async function getPlaylist(props: Props) {
  const res = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${props.token}`,
      'Content-Type': 'application/json',
    },
  });
  const { items } = await res.json();
  const playlists = items.map(({ name, id }: Playlists) => {
    return { name, id };
  });
  return playlists;
}

export async function getCurrentlyPlayingTrack(props: Props) {
  const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${props.token}`,
      'Content-Type': 'application/json',
    },
  });
  const { item } = await res.json();
  return item;
}

export async function getCategories(props: Props) {
  const res = await fetch('https://api.spotify.com/v1/browse/categories', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${props.token}`,
      'Content-Type': 'application/json',
    },
  });
  const { item } = await res.json();
  return item;
}
