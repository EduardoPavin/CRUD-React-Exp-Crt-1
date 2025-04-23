import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CarDisplay from './_common/car-display/CarDisplay';
import Wrapper from './_common/wrapper/Wrapper';
import ModalCreate from './_common/modal-create/ModalCreate';

const API_BASE_URL = 'http://localhost:4000';

const App = () => {
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);  // <<< guard

  const fetchCars = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/cars`);
      setCars(data);
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
      toast.error('Erro ao carregar a lista de carros.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchCars();
      hasFetched.current = true;
    }
  }, []);

  const handleSave = async (newCar) => {
    try {
      if (editingIndex !== null) {
        const id = cars[editingIndex].id;
        await axios.put(`${API_BASE_URL}/cars/${id}`, newCar);
        const updated = [...cars];
        updated[editingIndex] = { ...newCar, id };
        setCars(updated);
      } else {
        const { data } = await axios.post(`${API_BASE_URL}/cars`, newCar);
        setCars(prev => [...prev, data]);
      }
      toast.success('Carro salvo com sucesso');
      setOpen(false);
    } catch (error) {
      console.error("Erro ao salvar carro:", error);
      toast.error('Não foi possível salvar o carro.');
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDelete = async (index) => {
    try {
      const { id } = cars[index];
      await axios.delete(`${API_BASE_URL}/cars/${id}`);
      setCars(prev => prev.filter((_, i) => i !== index));
      toast.info('Carro removido.');
    } catch (error) {
      console.error("Erro ao excluir carro:", error);
      toast.error('Não foi possível excluir o carro.');
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Carregando carros...</div>;
  }

  return (
    <div className="p-6">
      <Wrapper onCreateClick={() => { setEditingIndex(null); setOpen(true); }} />

      <ModalCreate
        open={open}
        handleClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editingIndex !== null ? cars[editingIndex] : null}
      />

      <CarDisplay
        cars={cars}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ToastContainer position="top-center" autoClose={3000} limit={1} />
    </div>
  );
};

export default App;
