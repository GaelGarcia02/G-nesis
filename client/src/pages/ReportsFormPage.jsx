import { useForm } from "react-hook-form";
import { handleError, handleSuccess } from "../utils/sweetAlerts";
import { useReports } from "../context/ReportsContext";
import { useHorses } from "../context/HorsesContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function ReportFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
  } = useForm();
  const {
    createReport,
    getReport,
    updateReport,
    errors: reportsErrors,
    reportsAdd,
  } = useReports();

  const { horses, getHorses } = useHorses();
  const navigate = useNavigate();
  const [resetForm, setResetForm] = useState(false);
  const params = useParams();
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [title, setTitle] = useState("Agregar Reporte");

  useEffect(() => {
    async function loadReport() {
      if (params.id) {
        const report = await getReport(params.id);
        console.log(report);
        setValue("name", report.namehorse);
        setValue("medicines", report.medicines);
        setValue("specifications", report.specifications);
        setValue("food", report.food);
        setValue("horseshoes", report.horseshoes);
        setValue("job", report.job);
        setTitle("Actualizar Reporte");

        setSelectedMedicines(
          report.medicines.split(",").map((medicine) => medicine.trim())
        );
      }
    }
    loadReport();
  }, []);

  useEffect(() => {
    getHorses();
  }, []);

  useEffect(() => {
    if (reportsErrors && reportsErrors.length > 0) {
      const errorMessage = reportsErrors[0];
      handleError(`${errorMessage}`);
    }
  }, [reportsErrors]);

  const handleMedicineChange = (e) => {
    const medicine = e.target.value;
    if (e.target.checked) {
      setSelectedMedicines([...selectedMedicines, medicine]);
    } else {
      setSelectedMedicines(selectedMedicines.filter((m) => m !== medicine));
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.job = parseInt(data.job);

      data.medicines = selectedMedicines.join(", ");

      if (params.id) {
        updateReport(params.id, data);
        setResetForm(true);
      } else {
        await createReport(data);
        setResetForm(true);
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (resetForm && reportsAdd) {
      handleSuccess("Registrado con exito");
      const timer = setTimeout(() => {
        setResetForm(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resetForm, reportsAdd]);

  useEffect(() => {
    if (resetForm && reportsAdd) {
      navigate("/reports");
    }
  }, [resetForm, reportsAdd, navigate]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className=" mb-10 p-10 w-full /**/ xl:w-40% lg:w-50% md:w-60%">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>

          <div className="mb-4">
            <label className="font-medium" htmlFor="namehorse">
              Nombre del Caballo:
            </label>
            <select
              id="namehorse"
              name="namehorse"
              autoComplete="namehorse"
              {...register("namehorse", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            >
              <option value=""> -- Selecciona un Caballo -- </option>
              {horses.map((horse) => (
                <option key={horse._id} value={horse.name}>
                  {horse.name}
                </option>
              ))}
            </select>
            {formErrors.namehorse && (
              <p className="text-red-500 mb-2">El nombre es requerido</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium">Medicinas:</label>
            <div className="flex flex-col">
              <label>
                <input
                  type="checkbox"
                  value="Desparacitacion"
                  onChange={handleMedicineChange}
                  checked={selectedMedicines.includes("Desparacitacion")}
                />{" "}
                Desparacitacion
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Vacuna"
                  onChange={handleMedicineChange}
                  checked={selectedMedicines.includes("Vacuna")}
                />{" "}
                Vacuna
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Suero"
                  onChange={handleMedicineChange}
                  checked={selectedMedicines.includes("Suero")}
                />{" "}
                Suero
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Vitaminas"
                  onChange={handleMedicineChange}
                  checked={selectedMedicines.includes("Vitaminas")}
                />{" "}
                Vitaminas
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Complejos"
                  onChange={handleMedicineChange}
                  checked={selectedMedicines.includes("Complejos")}
                />{" "}
                Complejos
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Colicos"
                  onChange={handleMedicineChange}
                  checked={selectedMedicines.includes("Colicos")}
                />{" "}
                Colicos
              </label>
            </div>
            {formErrors.medicines && (
              <p className="text-red-500 mb-2">La medicina es requerida</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium" htmlFor="breed">
              Especificaciones:
            </label>
            <textarea
              rows="3"
              id="specifications"
              name="specifications"
              placeholder="Especificaciones"
              autoComplete="specifications"
              {...register("specifications", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            />
            {formErrors.specifications && (
              <p className="text-red-500 mb-2">
                Las especificaciones son requeridas
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium" htmlFor="diseases">
              Alimento:
            </label>
            <textarea
              rows="2"
              id="food"
              name="food"
              placeholder="Comida"
              autoComplete="food"
              {...register("food", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            ></textarea>
            {formErrors.food && (
              <p className="text-red-500 mb-2">La comida es requerida</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium" htmlFor="diseases">
              Desgaste de Herraje:
            </label>
            <textarea
              rows="2"
              id="horseshoes"
              name="horseshoes"
              placeholder="Herraje"
              autoComplete="horseshoes"
              {...register("horseshoes", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            ></textarea>
            {formErrors.horseshoes && (
              <p className="text-red-500 mb-2">El herraje es requerido</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium" htmlFor="diseases">
              Horas de Trabajo:
            </label>
            <input
              type="number"
              id="job"
              name="job"
              placeholder="Trabajo"
              autoComplete="job"
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .slice(0, 10);
              }}
              {...register("job", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            ></input>
            {formErrors.job && (
              <p className="text-red-500 mb-2">El trabajo es requerido</p>
            )}
          </div>

          <div className="flex justify-center gap-10">
            <Link to="#" onClick={() => window.history.back()}>
              <button className="my-4 w-max bg-gray-400 rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-gray-600 text-white">
                Regresar
              </button>
            </Link>
            <button
              type="submit"
              className="my-4 w-max bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportFormPage;
