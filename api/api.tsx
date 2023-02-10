import { IResponseAlbumsType, IResponseTracksType } from '../interface/interface';
import { AlbumType } from '../interface/interface';

type Token = {
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
  const res = await fetch(`https://api.spotify.com/v1/albums/${data.id}/tracks?market=ES`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await res.json();
  return response;
}

export async function getPlaylist({ token }: Token) {
  const res = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const { items } = await res.json();
  const playlists = items.map(({ name, id }: Playlists) => {
    return { name, id };
  });
  return playlists;
}

export async function getTrack(token: string, id: string) {
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}?market=ES`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const track = await res.json();
  return track;
}
