import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import './ModalCreate.css';

const ModalCreate = ({ open, handleClose, onSave, initialData }) => {
  const [carData, setCarData] = useState({
    modelo: '',
    marca: '',
    ano: '',
    cor: '',
    placa: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCarData(initialData || {
      modelo: '',
      marca: '',
      ano: '',
      cor: '',
      placa: '',
    });
    setErrors({});
  }, [initialData, open]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!carData.modelo.trim()) newErrors.modelo = 'Campo obrigatório';
    if (!carData.marca.trim()) newErrors.marca = 'Campo obrigatório';
    if (!carData.ano.trim()) newErrors.ano = 'Campo obrigatório';
    else if (!/^\d{4}$/.test(carData.ano)) newErrors.ano = 'Ano deve ter 4 dígitos numéricos';
    if (!carData.cor.trim()) newErrors.cor = 'Campo obrigatório';
    if (!carData.placa.trim()) {
      newErrors.placa = 'Campo obrigatório';
    } else {
      const placa = carData.placa.toUpperCase();
      const formatoAntigo = /^[A-Z]{3}[0-9]{4}$/;
      const formatoMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

      if (!formatoAntigo.test(placa) && !formatoMercosul.test(placa)) {
        newErrors.placa = 'Placa inválida (ex: ABC1234 ou BRA1E23)';
      }
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(carData);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <Typography variant="h6" className="mb-4 text-center">
          Cadastro de Carro
        </Typography>
        <form className="flex flex-col">
          <TextField
            label="Modelo"
            name="modelo"
            value={carData.modelo}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
            error={!!errors.modelo}
            helperText={errors.modelo}
          />
          <TextField
            label="Marca"
            name="marca"
            value={carData.marca}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
            error={!!errors.marca}
            helperText={errors.marca}
          />
          <TextField
            label="Ano"
            name="ano"
            value={carData.ano}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
            error={!!errors.ano}
            helperText={errors.ano}
            type="number"
            inputProps={{
              min: 1000,
              max: 9999,
              inputMode: 'numeric',
            }}
          />

          <TextField
            label="Cor"
            name="cor"
            value={carData.cor}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
            error={!!errors.cor}
            helperText={errors.cor}
          />
          <TextField
            label="Placa"
            name="placa"
            value={carData.placa}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
            error={!!errors.placa}
            helperText={errors.placa}
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
