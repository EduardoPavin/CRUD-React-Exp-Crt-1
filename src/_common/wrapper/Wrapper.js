import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Wrapper = ({ onCreateClick }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="!bg-red-800">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Eduardo Augusto Camacho d'Oliveira Pavin
          </Typography>
          <Button color="inherit" onClick={onCreateClick}>
            Criar
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Wrapper;
