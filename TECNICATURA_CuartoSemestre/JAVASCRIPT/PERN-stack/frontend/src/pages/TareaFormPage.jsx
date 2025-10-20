import { useParams, useNavigate } from "react-router-dom";
import { Card, Input, Textarea, Label } from "../components/ui";

function TareaFormPage() {
  const params = useParams();
  const navigate = useNavigate();
  const isEditing = !!params.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isEditing ? "Tarea actualizada" : "Tarea creada");
    navigate("/tareas");
  };

  const handleCancel = () => {
    navigate("/tareas");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <Card className="bg-zinc-800 p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            {isEditing ? "Editar Tarea" : "Nueva Tarea"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="titulo" className="text-white text-lg mb-2">
                Título
              </Label>
              <Input
                type="text"
                placeholder="Ingrese el título de la tarea"
                className="w-full bg-zinc-700 text-white border-zinc-600 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="descripcion" className="text-white text-lg mb-2">
                Descripción
              </Label>
              <Textarea
                placeholder="Ingrese la descripción de la tarea"
                rows={6}
                className="w-full bg-zinc-700 text-white border-zinc-600 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded transition-colors"
              >
                {isEditing ? "Actualizar Tarea" : "Crear Tarea"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default TareaFormPage;