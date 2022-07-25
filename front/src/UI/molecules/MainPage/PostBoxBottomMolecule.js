import { Box } from '@mui/system';
import React from 'react';
import HeartIcon from '../../atoms/MainPage/HeartIcon';

function PostBoxBottomMolecule({ member, memberImage, likes }) {
  return (
    <Box
      sx={{
        borderTop: '1px solid #F1F3F5',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 1.5,
      }}
    >
      <span>
        by <b>{member}</b>
      </span>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <HeartIcon fontSize="small" />
        {likes}
      </Box>
    </Box>
  );
}

export default PostBoxBottomMolecule;
