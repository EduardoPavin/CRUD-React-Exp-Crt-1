import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import './ModalCreate.css';

const ModalCreate = ({ open, handleClose, onSave, initialData }) => {
  const [carData, setCarData] = useState({
    model: '',
    brand: '',
    year: '',
    color: '',
    plate: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCarData(initialData || {
      model: '',
      brand: '',
      year: '',
      color: '',
      plate: '',
    });
    setErrors({});
  }, [initialData, open]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!carData.model.trim()) newErrors.model = 'Campo obrigatório';
    if (!carData.brand.trim()) newErrors.brand = 'Campo obrigatório';
    if (!String(carData.year).trim()) {
      newErrors.year = 'Campo obrigatório';
    } else if (!/^\d{4}$/.test(String(carData.year).trim())) {
      newErrors.year = 'Ano deve ter 4 dígitos numéricos';
    }
    if (!carData.color.trim()) newErrors.color = 'Campo obrigatório';
    if (!carData.plate.trim()) {
      newErrors.plate = 'Campo obrigatório';
    } else {
      const plate = carData.plate.toUpperCase();
      const formatoAntigo = /^[A-Z]{3}[0-9]{4}$/;
      const formatoMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
      if (!formatoAntigo.test(plate) && !formatoMercosul.test(plate)) {
        newErrors.plate = 'Placa inválida (ex: ABC1234 ou BRA1E23)';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(carData);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <Typography variant="h6" className="mb-4 text-center">
          {initialData ? 'Editar Carro' : 'Cadastro de Carro'}
        </Typography>
        <form className="flex flex-col">
          <TextField
            label="Modelo"
            name="model"
            value={carData.model}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
            error={!!errors.model}
            helperText={errors.model}
          />
          <TextField
            label="Marca"
            name="brand"
            value={carData.brand}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
            error={!!errors.brand}
            helperText={errors.brand}
          />
          <TextField
            label="Ano"
            name="year"
            value={carData.year}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
            error={!!errors.year}
            helperText={errors.year}
            type="number"
            inputProps={{ min: 1000, max: 9999 }}
          />
          <TextField
            label="Cor"
            name="color"
            value={carData.color}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
            error={!!errors.color}
            helperText={errors.color}
          />
          <TextField
            label="Placa"
            name="plate"
            value={carData.plate}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
            error={!!errors.plate}
            helperText={errors.plate}
            inputProps={{
              maxLength: 7,
              style: { textTransform: 'uppercase' },
            }}
          />
          <Button
            variant="contained"
            fullWidth
            className="!mt-3 !bg-red-800"
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalCreate;