import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui';

function TareasPage() {
  const navigate = useNavigate();

  // Datos de ejemplo
  const tareas = [
    { id: 1, titulo: "mi titulo", descripcion: "mi primer tarea" },
    { id: 2, titulo: "mi titulo 2", descripcion: "jkshlgas" },
    { id: 3, titulo: "tarea 3", descripcion: "una descripcion" },
    { id: 4, titulo: "tarea 4", descripcion: "asdasd" },
    { id: 5, titulo: "tareaaaa 6", descripcion: "asdasd" },
    { id: 6, titulo: "tareaaa 7", descripcion: "" },
  ];

  const handleEdit = (id) => {
    navigate(`/tareas/editar/${id}`);
  };

  const handleDelete = (id) => {
    alert(`Eliminar tarea con ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Mis Tareas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tareas.map((tarea) => (
            <Card key={tarea.id} className="bg-zinc-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-3">
                {tarea.titulo}
              </h2>

              <p className="text-gray-300 mb-4 min-h-[60px]">
                {tarea.descripcion || "Sin descripción"}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(tarea.id)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(tarea.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TareasPage;