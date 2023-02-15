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

type getArtistType = {
  token: string;
  id: string;
};
type getArtistAlbumType = {
  token: string;
  id: string;
};
type getTracksPLaylistType = {
  token: string;
  id: string;
  limit: number;
};
type getUserTopTracksType = {
  token: string;
  limit: number
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
  const res = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${data.limit}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
  const topTrack = await res.json();
  return topTrack;
}

export async function getCategories(props: { token: string }): Promise<SpotifyApi.MultipleCategoriesResponse> {
  const res = await fetch('https://api.spotify.com/v1/browse/categories', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${props.token}`,
      'Content-Type': 'application/json',
    },
  });
  const { categories } = await res.json();
  return categories;
}

export async function getArtist(data: getArtistType) {
  const res = await fetch(`https://api.spotify.com/v1/artists/${data.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
  const artist = await res.json();
  return artist;
}

export async function getArtistAlbum(data: getArtistAlbumType) {
  const res = await fetch(`https://api.spotify.com/v1/artists/${data.id}/albums`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
  const artistAlbums = await res.json();
  return artistAlbums;
}

export async function getTracksPLaylist(token: string, id: string) {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const playlistTrack = await res.json();
  return playlistTrack;
}

