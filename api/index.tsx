type Props = {
    token: string;
  };

  export async function getAlbums(props: Props) {
    const res = await fetch('https://api.spotify.com/v1/browse/new-releases', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-Type': 'application/json',
      },
    });
    const response = await res.json();
    const albums = response.albums.items.map((item:any) => {
      return item
    });
    return albums
  }