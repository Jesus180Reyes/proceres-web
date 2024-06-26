/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from 'react';

/**
 * useForm es un hook personalizado que gestiona el estado de un formulario.
 *
 * @param {object} initialState - El estado inicial del formulario.
 * @returns {object} Un objeto que contiene el estado actual del formulario, 
 * una función para manejar los cambios en los campos del formulario y una función para resetear el formulario.
 */
export const useForm = (initialState: any) => {
  const [values, setValues] = useState(initialState);

   /**
   * Maneja los cambios en los campos del formulario.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - El evento de cambio del campo del formulario.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  
   /**
   * Resetea el formulario al estado inicial.
   */
  const resetForm = () => {
    setValues(initialState);
  };

  return {
    // * Propiedades
    values,
    // * Metodos
    handleChange,
    resetForm,
  };
};
