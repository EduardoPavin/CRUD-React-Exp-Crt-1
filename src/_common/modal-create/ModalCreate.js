import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import './ModalCreate.css'; // importa o CSS separado

const ModalCreate = ({ open, handleClose }) => {
  const [carData, setCarData] = useState({
    modelo: '',
    marca: '',
    ano: '',
    cor: '',
    placa: '',
  });

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(carData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <Typography variant="h6" className="mb-4 text-center">
          Cadastro de Carro
        </Typography>
        <form className="flex flex-col">
          <TextField label="Modelo" name="modelo" value={carData.modelo} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Marca" name="marca" value={carData.marca} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Ano" name="ano" value={carData.ano} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Cor" name="cor" value={carData.cor} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Placa" name="placa" value={carData.placa} onChange={handleChange} fullWidth margin="dense" />

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
