import { Shuffle } from '@mui/icons-material';
import { useEffect} from 'react';
import { ITrackTypes } from '../../../interface/interface';

type ShuffleProps = {
  albumTracks: ITrackTypes[];
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
};

export const ShuffleComponent: React.FC<ShuffleProps> = ({ albumTracks, shuffle, setShuffle }) => {
  // const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    localStorage.setItem('shuffled', '');
  }, []);

  return (
    <>
      {shuffle === false ? (
        <Shuffle
          sx={{
            fontSize: '18px',
            opacity: '0.7',
            transition: '0.1s',
            '&:hover': {
              opacity: '1',
              cursor: 'pointer',
            },
          }}
          onClick={() => {
            setShuffle(true);
            localStorage.setItem('shuffled', 'false');
          }}
        />
      ) : (
        <Shuffle
          sx={{
            fontSize: '18px',
            color: '#1ad760',
            opacity: '0.7',
            transition: '0.1s',
            '&:hover': {
              opacity: '1',
              cursor: 'pointer',
            },
          }}
          onClick={() => {
            setShuffle(false);
            localStorage.setItem('shuffled', '');
            localStorage.setItem('albumTracks', JSON.stringify(albumTracks));
          }}
        />
      )}
    </>
  );
};
