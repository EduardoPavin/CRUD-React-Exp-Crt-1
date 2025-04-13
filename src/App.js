import React, { useState } from 'react';
import CarDisplay from './_common/car-display/CarDisplay';
import Wrapper from './_common/wrapper/Wrapper'
import ModalCreate from './_common/modal-create/ModalCreate'

const App = () => {
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = (newCar) => {
    if (editingIndex !== null) {
      const updated = [...cars];
      updated[editingIndex] = newCar;
      setCars(updated);
      setEditingIndex(null);
    } else {
      setCars([...cars, newCar]);
    }
    setOpen(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updated = [...cars];
    updated.splice(index, 1);
    setCars(updated);
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
