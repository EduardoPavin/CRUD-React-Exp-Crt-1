import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarDisplay from './_common/car-display/CarDisplay';
import Wrapper from './_common/wrapper/Wrapper';
import ModalCreate from './_common/modal-create/ModalCreate';

const API_BASE_URL = 'http://localhost:4000';

const App = () => {
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cars`);
      setCars(response.data);
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSave = async (newCar) => {
    try {
      if (editingIndex !== null) {
        const id = cars[editingIndex].id;
        await axios.put(`${API_BASE_URL}/cars/${id}`, newCar);
      } else {
        await axios.post(`${API_BASE_URL}/cars`, newCar);
      }
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar carro:", error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDelete = async (index) => {
    try {
      const carToDelete = cars[index];
      if (!carToDelete) return;
      await axios.delete(`${API_BASE_URL}/cars/${carToDelete.id}`);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir carro:", error);
    }
  };

  return (
    <div className="p-6">
      <Wrapper onCreateClick={() => { setEditingIndex(null); setOpen(true); }} />
      <ModalCreate
        open={open}
        handleClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editingIndex !== null ? cars[editingIndex] : null}
      />
      <CarDisplay cars={cars} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
