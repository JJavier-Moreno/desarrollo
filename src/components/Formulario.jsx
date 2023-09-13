import React from 'react'
import { useState, useEffect } from 'react'
import Error from './Error';

function Formulario({ setPacientes, setPaciente, pacientes, paciente}) {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect (()=>{
      if(Object.keys(paciente).length > 0){
        setNombre(paciente.nombre);
        setPropietario(paciente.propietario);
        setEmail(paciente.email);
        setFecha(paciente.fecha);
        setSintomas(paciente.sintomas);
      }
  },[paciente])


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    //Validación de formulario

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true);
      return; //Aqui cerramos ya el IF. Podriamos tambien continuar en un else.
    }

    setError(false);

    //Objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
      
    }

    if(paciente.id){
      //Editando registro
      objetoPaciente.id = paciente.id;
      console.log(paciente);
      console.log(objetoPaciente);

      const pacientesActualizados = pacientes.map(pacienteState =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      )
      
      setPacientes(pacientesActualizados);
      setPaciente({});

    }else{
      //Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    

    //Reiniciar Formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  }


  return (

    <div className='md:w-1/2 lg:w-2/5'>
      <h2 className='font-black text-3xl text-center '>Seguimiento Pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10'>
        Añade Pacientes y {""}
        <span className='font-bold text-indigo-600'>
          Administralos
        </span>
      </p>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
        {error && <Error
          mensaje='Todos los campos son obligatorios'
        />

        }
        <div className='mb-5'>
          <label htmlFor="mascota" className='block text-gray-700 uppercase font-bold'>Nombre mascota</label>
          <input
            id="mascota"
            className='border-2 mt-2 p-2 w-full placeholder-gray-400 rounded-md'
            type="text"
            placeholder='Nombre de la Mascota'
            value={nombre}
            onChange={
              (e) => setNombre(e.target.value)
            }
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="propietario" className='block text-gray-700 uppercase font-bold'>Nombre Propietario</label>
          <input
            id="propietario"
            className='border-2 mt-2 p-2 w-full placeholder-gray-400 rounded-md'
            type="text"
            placeholder='Nombre del propieatario'
            value={propietario}
            onChange={
              (e) => setPropietario(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="email" className='block text-gray-700 uppercase font-bold'>Email</label>
          <input
            id="email"
            className='border-2 mt-2 p-2 w-full placeholder-gray-400 rounded-md'
            type="email"
            placeholder='Email contacto propietario'
            value={email}
            onChange={
              (e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>Alta</label>
          <input
            id="alta"
            className='border-2 mt-2 p-2 w-full placeholder-gray-400 rounded-md'
            type="date"
            value={fecha}
            onChange={
              (e) => setFecha(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>Sintomas</label>
          <textarea
            id="sintomas"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Describe los sintomas'
            value={sintomas}
            onChange={
              (e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700
        cursor-pointer transition-all'
          value={ paciente.id ? 'Editar paciente' : 'Agregar paciente'}
        />

      </form>
    </div>
  )
}

export default Formulario