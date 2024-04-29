import Horse from "../models/horse.model.js";
import Parameter from "../models/param.model.js";

//* Registrar Caballo
export const horseRegister = async (req, res) => {
  //Especificas los campos que son requeridos para esta función
  const { name, age, breed, diseases, sensor } = req.body;

  try {
    //Crea el nuevo caballo y lo almacena en una variable
    const newHorse = new Horse({
      name,
      age,
      breed,
      diseases,
      sensor,
    });

    //Método para guardar al nuevo vaballo en la base de datos
    await newHorse.save();
    //Respuesta del servidor cuando todo sale bien
    res.json(newHorse);
  } catch (error) {
    //Si algo sale mal, nos manda el error
    res.status(500).json({ message: error.message });
  }
};

//* Mostrar Caballos
export const showHorses = async (req, res) => {
  try {
    //Busca a los caballos existentes
    const horses = await Horse.find();
    //Muestra a los caballos
    res.status(200).json(horses);
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

//* Mostrar un Caballo
export const showHorse = async (req, res) => {
  try {
    //Busca al Caballo con el _id que le mandamos en la url
    const horse = await Horse.findById(req.params.id);

    //Si no lo encuentra, manda mensaje de error
    if (!horse)
      return res.status(404).json({ message: "Caballo no encontrado" });

    //Si lo encuentra, manda sus datos
    res.json(horse);
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

//* Actualizar Caballo
export const updateHorse = async (req, res) => {
  try {
    //Busca al caballo por su _id
    const updatedHorse = await Horse.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    //Error si no lo encuentra
    if (!updatedHorse) {
      return res.status(404).json({ message: "Caballo no encontrado" });
    }

    //Manda los datos actualizados si todo sale bien
    res.status(200).json(updatedHorse);
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

//* Eliminar Caballo
export const deleteHorse = async (req, res) => {
  try {
    //Busca al caballo por su _id y lo elimina
    const existingHorse = await Horse.findByIdAndDelete(req.params.id);

    //Si el _id proporcionado no existe, manda el error
    if (!existingHorse) {
      return res.status(404).json({ message: "Caballo no encontrado" });
    }

    //Manda mensaje de éxito
    res.status(200).json({ message: "Caballo eliminado con éxito" });
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

//* Mostrar todos los ID_HORSE únicos
export const showSensors = async (req, res) => {
  try {
    // Utilizamos distinct para obtener todos los valores únicos de ID_HORSE
    const params = await Parameter.distinct("id_sensor");

    // Verificamos si se encontraron ID_HORSE únicos
    if (!params || params.length === 0) {
      return res.status(404).json({
        message: "No se encontraron ID_HORSE únicos en la colección",
      });
    }

    // Si se encuentran, enviamos los datos de los ID_HORSE únicos
    res.json(params);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: error.message });
  }
};

//* Mostrar los datos del sensor por ID_HORSE (basado en el campo sensor del modelo del caballo)
export const showParams = async (req, res) => {
  try {
    // Obtener el campo sensor del modelo del caballo
    const horseSensor = req.params.sensor;

    // Buscar los datos del sensor con el campo sensor proporcionado
    const sensorData = await Parameter.findOne({ id_sensor: horseSensor });

    // Verificar si se encontraron datos del sensor
    if (!sensorData) {
      return res.status(404).json({
        message: "No se encontraron datos del sensor para el campo sensor dado",
      });
    }

    // Si se encuentra, enviar los datos del sensor como respuesta
    res.json(sensorData);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: error.message });
  }
};
