import { getPlaylist } from './Api';

type Props = {
  token: string;
};

export function MainPage(props: Props) {
  return (
    <button
      onClick={async () => {
        await getPlaylist(props);
      }}
    >
      Test api
    </button>
  );
}
