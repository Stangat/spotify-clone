type Props = {
  token: string;
};

type Playlists = {
  name: string;
  id: string;
};

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
