import { getPlaylist, getFeaturedPlaylist } from './Api';

type Props = {
  token: string;
};

export function MainPage(props: Props) {
  return (
    <button
      onClick={async () => {
        await getPlaylist(props);
        await getFeaturedPlaylist(props);
      }}
    >
      Test api
    </button>
  );
}
