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

export async function getCurrentlyPlayingTrack({ token }: Token) {
  const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const { item } = await res.json();
  return item;
}

export async function getPlaybackState({ token }: Token) {
  const res = await fetch('https://api.spotify.com/v1/me/player', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  return result;
}

export async function getAvailableDevices({ token }: Token) {
  const res = await fetch('https://api.spotify.com/v1/me/player/devices', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  return result;
}

export async function getTrack({ token }: Token) {
  const res = await fetch('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl?market=ES', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  // const rs = res.arrayBuffer();
  // return rs
  // const reader = rs?.getReader();
  const track = await res.json();
  console.log(track);

  // if (reader) {
  //   return reader.read().then(result => {
  //     return result;
  //   });
  // }
}

export async function startPlayback({ token }: Token, id: string) {
  const body = {
    position_ms: 0,
  };

  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function pausePlayback({ token }: Token, id: string) {
  await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}
