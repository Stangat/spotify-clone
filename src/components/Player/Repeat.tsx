import { Repeat, RepeatOne } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export const RepeatComponent = () => {
  const [repeat, setRepeat] = useState('no');

  let content;
  if (repeat === 'no') {
    content = (
      <Repeat
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
          setRepeat('all');
          localStorage.setItem('repeat', 'all');
        }}
      />
    );
  }
  if (repeat === 'all') {
    content = (
      <Repeat
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
          setRepeat('one');
          localStorage.setItem('repeat', 'one');
        }}
      />
    );
  }
  if (repeat === 'one') {
    content = (
      <RepeatOne
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
          setRepeat('no');
          localStorage.setItem('repeat', 'no');
        }}
      />
    );
  }

  useEffect(() => {
    localStorage.setItem('repeat', 'no');
  }, []);

  return <>{content}</>;
};
