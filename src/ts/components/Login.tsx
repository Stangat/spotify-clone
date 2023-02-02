import style from '../../less/login-page.module.less';

export function Login() {
  const getAccess = async () => {
    const client_id = 'aff3867dd68b4c578f21a273db9478ab';
    const redirect_uri = 'http://localhost:8080/';
    const api_uri = 'https://accounts.spotify.com/authorize';
    const scope = [
      'user-read-private',
      'user-read-email',
      'user-modify-playback-state',
      'user-read-playback-state',
      'user-follow-modify',
      'user-follow-read',
      'user-read-playback-position',
      'user-library-modify',
      'user-library-read',
      'playlist-modify-public',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-top-read',
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      ' '
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <div className={style.container}>
      <img
        className="logo"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="spotify-logo"
      />
      <button className={style.loginButton} onClick={getAccess}>
        Connect to Spotify
      </button>
    </div>
  );
}
