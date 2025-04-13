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
            <Box
              sx={{
                height: '25vh',
                width: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#ababab',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                Nenhum carro cadastrado.
              </Typography>
            </Box>
          </Box>
        );      
    }

    return (
        <Box className="mt-6 space-y-4">
            {cars.map((car, index) => (
                <Paper key={index} elevation={3} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                        <Typography><strong>Modelo:</strong> {car.modelo}</Typography>
                        <Typography><strong>Marca:</strong> {car.marca}</Typography>
                        <Typography><strong>Ano:</strong> {car.ano}</Typography>
                        <Typography><strong>Cor:</strong> {car.cor}</Typography>
                        <Typography><strong>Placa:</strong> {car.placa}</Typography>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                        <Button size="small" variant="outlined" color="primary" onClick={() => onEdit(index)}>
                            Editar
                        </Button>
                        <Button size="small" variant="outlined" color="error" onClick={() => onDelete(index)}>
                            Excluir
                        </Button>
                    </div>
                </Paper>
            ))}
        </Box>
    );
};

export default CarDisplay;
