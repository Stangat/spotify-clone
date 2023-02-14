import { IResponseAlbumsType, IResponseTracksType } from '../interface/interface';

type getPlaylistsType = {
  token: string;
};
type getUserTopArtistType = {
  token: string;
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

type getUserTopTracksType = {
  token: string;
};

export const copyToClipboard = () => {
  navigator.clipboard.writeText(window.location.href).then(
    function () {
      console.log('copied successfully!');
    },
    function (err) {
      console.log('Failed to copy');
    }
  );
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

export async function getUserPlaylists(data: getPlaylistsType) {
  const res = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
  const playlist = await res.json();
  return playlist;
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

export async function getProfile(token: string) {
  const res = await fetch(`https://api.spotify.com/v1/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const user = await res.json();
  return user;
}

export async function getUserTopArtist(data: getUserTopArtistType) {
  const res = await fetch(`https://api.spotify.com/v1/me/top/artists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
  const topArtist = await res.json();
  return topArtist;
}

export async function getUserTopTracks(data: getUserTopTracksType) {
  const res = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=4`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
  const topArtist = await res.json();
  return topArtist;
}

export async function getCategories(token: string): Promise<SpotifyApi.PagingObject<SpotifyApi.CategoryObject>>{
  const res = await fetch('https://api.spotify.com/v1/browse/categories?limit=50', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const { categories } = await res.json();
  return categories;
}

export async function getSingleCategory(props: {token: string, id: string | undefined}): Promise<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>>{
  const res = await fetch(`https://api.spotify.com/v1/browse/categories/${props.id}/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${props.token}`,
      'Content-Type': 'application/json',
    },
  });
  const { playlists } = await res.json();
  return playlists;
}

export async function getPlaylistTracksLikeAlbum(data: getTracksType): Promise<{items: {track: IResponseTracksType}[]}> {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks?fields=items(track)&market=ES&limit=50`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await res.json();
  return response;
}
