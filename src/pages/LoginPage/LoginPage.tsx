import style from './loginPage.module.less';

export function Login() {
  const getAccess = async () => {
    const client_id = 'b1cad15fc143455fb94c40607c7a47ee';
    const redirect_uri = 'http://localhost:8080/'; //TODO изменить чтобы работал на деплое
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
  localStorage.setItem('lang', 'en')
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
