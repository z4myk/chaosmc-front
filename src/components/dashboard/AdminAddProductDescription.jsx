import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const AdminAddProductDescription = () => {
  const [productId, setProductId] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que todos los campos están llenos
    if (!productId || !description || !imageUrl) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      // Hacer la solicitud POST al backend
      const response = await axios.post(`${URL}/products/update-description`, {
        productId,
        description,
        imageUrl,
      });

      Swal.fire('Éxito', response.data.message, 'success');

      // Limpiar los campos del formulario
      setProductId('');
      setDescription('');
      setImageUrl('');
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al agregar la descripción', 'error');
      console.error('Error actualizando la descripción del producto:', error);
    }
  };

  return (
    <>
      <section className="container text-light mt-5">
        <h3 className="text-center">Agregar descripción de los productos</h3>
        <hr />
        <form className="mb-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <p>ID</p>
            <input
              type="text"
              placeholder="Colocar el ID del producto"
              className="form-control bg-dark text-light"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <p>Descripción</p>
            <input
              type="text"
              placeholder="Colocar descripción"
              className="form-control bg-dark text-light"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <p>URL Imagen</p>
            <input
              type="text"
              placeholder="Colocar URL de la imagen"
              className="form-control bg-dark text-light"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Agregar
          </button>
        </form>
      </section>
    </>
  );
};
