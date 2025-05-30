import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

const CarDisplay = ({ cars, onEdit, onDelete }) => {
  if (cars.length === 0) {
    return (
      <Box
        sx={{
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          sx={{
            p: 4,
            backgroundColor: '#ababab',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
            Nenhum carro cadastrado.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        gap: 2,
        mb: 4,
      }}
    >
      {cars.map((car) => (
        <Paper
          key={car.id}
          elevation={3}
          sx={{
            p: 2,
            width: '90%',
            maxWidth: 600,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1"><strong>Modelo:</strong> {car.model}</Typography>
            <Typography variant="subtitle1"><strong>Marca:</strong> {car.brand}</Typography>
            <Typography variant="subtitle1"><strong>Ano:</strong> {car.year}</Typography>
            <Typography variant="subtitle1"><strong>Cor:</strong> {car.color}</Typography>
            <Typography variant="subtitle1"><strong>Placa:</strong> {car.plate}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => onEdit(cars.indexOf(car))}
            >
              Editar
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => onDelete(cars.indexOf(car))}
            >
              Excluir
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default CarDisplay;
