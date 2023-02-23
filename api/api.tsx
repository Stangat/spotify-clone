import { IResponseAlbumsType, IResponseTracksType, ITrackSaveData } from '../interface/interface';

type getPlaylistsType = {
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
type getUserTopTracksType = {
  token: string;
  limit: number;
};
type getUserAlbumsType = {
  token: string;
};

const baseUrl = 'https://api.spotify.com/v1';

export type typesOfSearchQuery = 'track' | 'playlist' | 'album' | 'artist';

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
  const res = await fetch(`${baseUrl}/browse/new-releases?offset=${data.offset}&limit=${data.limit}`, {
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
  const res = await fetch(`${baseUrl}/albums/${data.id}/tracks?market=US`, {
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
  const res = await fetch(`${baseUrl}/me/playlists`, {
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
  const res = await fetch(`${baseUrl}/tracks/${id}?market=ES`, {
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
  const res = await fetch(`${baseUrl}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const user = await res.json();
  return user;
}

export async function getUserTopTracks(data: getUserTopTracksType) {
  const res = await fetch(`${baseUrl}/me/top/tracks?limit=${data.limit}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
  const topTrack = await res.json();
  return topTrack;
}

export async function getUserAlbums(data: getUserAlbumsType) {
  const res = await fetch(`${baseUrl}/me/albums`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
  const topAlbums = await res.json();
  return topAlbums;
}

export async function getCategories(token: string): Promise<SpotifyApi.PagingObject<SpotifyApi.CategoryObject>> {
  const res = await fetch(`${baseUrl}/browse/categories?limit=50`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const { categories } = await res.json();
  return categories;
}

export async function getSingleCategory(props: {
  token: string;
  id: string | undefined;
}): Promise<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>> {
  const res = await fetch(`${baseUrl}/browse/categories/${props.id}/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${props.token}`,
      'Content-Type': 'application/json',
    },
  });
  const { playlists } = await res.json();
  return playlists;
}

export async function getArtist(data: getArtistType) {
  const res = await fetch(`${baseUrl}/artists/${data.id}`, {
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
  const res = await fetch(`${baseUrl}/artists/${data.id}/albums`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
  const artistAlbums = await res.json();
  return artistAlbums;
}
export async function getPlaylistTracksLikeAlbum(
  data: getTracksType
): Promise<{ items: { track: IResponseTracksType }[] }> {
  const res = await fetch(`${baseUrl}/playlists/${data.id}/tracks?fields=items(track)&market=ES&limit=50`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
  const artistAlbums = await res.json();
  return artistAlbums;
}

export async function getPlaylist(data: getTracksType): Promise<SpotifyApi.SinglePlaylistResponse> {
  const res = await fetch(`${baseUrl}/playlists/${data.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
  const response = await res.json();
  return response;
}

export async function getTracksPLaylist(token: string, id: string) {
  const res = await fetch(`${baseUrl}/playlists/${id}/tracks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const playlistTrack = await res.json();
  return playlistTrack;
}

export async function getSearchResults(
  token: string,
  types: typesOfSearchQuery[],
  q: string
): Promise<SpotifyApi.SearchResponse> {
  const res = await fetch(`${baseUrl}/search?type=${types.join(',')}&q=${q}&limit=32`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const searchResult = await res.json();
  return searchResult;
}

export async function getUserSavedTracks(token: string) {
  const res = await fetch(`${baseUrl}/me/tracks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const savedTracks = await res.json();
  return savedTracks;
}

export async function getUserPlaylistsSpotifyApi(
  token: string
): Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse> {
  const res = await fetch(`${baseUrl}/me/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const userPlaylists = await res.json();
  return userPlaylists;
}

export async function getUserLikedTracksSpotifyApi(token: string): Promise<SpotifyApi.UsersSavedTracksResponse> {
  const res = await fetch(`${baseUrl}/me/tracks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const userPlaylists = await res.json();
  return userPlaylists;
}

export async function getUserTopArtistsSpotifyApi(token: string): Promise<SpotifyApi.UsersTopArtistsResponse> {
  const res = await fetch(`${baseUrl}/me/top/artists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const topArtists = await res.json();
  return topArtists;
}

export async function getUserAlbumsSpotifyApi(token: string): Promise<SpotifyApi.UsersSavedAlbumsResponse> {
  const res = await fetch(`${baseUrl}/me/albums`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const userAlbums = await res.json();
  return userAlbums;
}

export async function getFollowedArtists(token: string): Promise<SpotifyApi.UsersFollowedArtistsResponse> {
  const res = await fetch(`${baseUrl}/me/following?type=artist`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const followedArtists = await res.json();
  return followedArtists;
}

export async function getUserTopTracksSpotifyApi(
  token: string,
  limit?: number
): Promise<SpotifyApi.UsersTopTracksResponse> {
  const res = await fetch(`${baseUrl}/me/top/tracks` + (limit ? `?limit=${limit}` : ''), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const topTracks = await res.json();
  return topTracks;
}

export async function getSingleAlbumSpotifyApi(token: string, id: string): Promise<SpotifyApi.SingleAlbumResponse> {
  const res = await fetch(`${baseUrl}/albums/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const album = await res.json();
  return album;
}

export async function getFeaturedPlaylistsSpotifyApi(token: string): Promise<SpotifyApi.SingleAlbumResponse> {
  const res = await fetch(`${baseUrl}/browse/featured-playlists?market=US`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const featuredPlaylists = await res.json();
  return featuredPlaylists;
}

export async function removeUserSavedTracksSpotifyApi(token: string, id: string): Promise<void> {
  await fetch(`${baseUrl}/me/tracks?ids=${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function saveTrackForCurrentUserSpotifyApi(
  token: string,
  id: string,
  body: ITrackSaveData
): Promise<SpotifyApi.SaveTracksForUserResponse> {
  const res = await fetch(`${baseUrl}/me/tracks?ids=${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res;
}

export async function checkUserSavedTracksSpotifyApi(
  token: string,
  id: string
): Promise<SpotifyApi.CheckUsersSavedTracksResponse> {
  const res = await fetch(`${baseUrl}/me/tracks/contains?ids=${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  return result;
}
