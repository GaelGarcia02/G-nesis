import Vet from "../models/vet.model.js";

//* Registrar Veterinario
export const vetRegister = async (req, res) => {
  //Especificas los campos que son requeridos para esta función
  const { firstName, lastName, age, email, phone } = req.body;

  try {
    //Crea el nuevo veterinario y lo almacena en una variable
    const newVet = new Vet({
      firstName,
      lastName,
      age,
      email,
      phone,
    });

    //Método para guardar el nuevo veterinario en la base de datos
    await newVet.save();

    //Respuesta del servidor cuando todo sale bien
    res.json({
      newVet,
    });
  } catch (error) {
    //Si algo sale mal, nos manda el error
    res.status(500).json({ message: error.message });
  }
};

//* Mostrar Veterinarios
export const showVets = async (req, res) => {
  try {
    //Busca a los veterinarios existentes
    const vets = await Vet.find();
    //Muestra a los veterinarios
    res.status(200).json(vets);
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

//* Mostrar un Veterinario
export const showVet = async (req, res) => {
  try {
    //Busca al Veterinario con el _id que le mandamos en la url
    const vet = await Vet.findById(req.params.id);

    //Si no lo encuentra, manda mensaje de error
    if (!vet)
      return res.status(404).json({ message: "Veterinario no encontrado" });

    //Si lo encuentra, manda sus datos
    res.json(vet);
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

//* Actualizar Veterinario
export const updateVet = async (req, res) => {
  try {
    //Busca al veterinario por su _id
    const updatedVet = await Vet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    //Error si no lo encuentra
    if (!updatedVet) {
      return res.status(404).json({ message: "Veterinario no encontrado" });
    }

    //Manda los datos actualizados si todo sale bien
    res.status(200).json(updatedVet);
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};

//* Eliminar Veterinario
export const deleteVet = async (req, res) => {
  try {
    //Busca al veterinario por su _id y lo elimina
    const existingVet = await Vet.findByIdAndDelete(req.params.id);

    //Si el _id proporcionado no existe, manda el error
    if (!existingVet) {
      return res.status(404).json({ message: "Veterinario no encontrado" });
    }

    //Manda mensaje de éxito
    res.status(200).json({ message: "Veterinario eliminado con éxito" });
  } catch (error) {
    //Error si algo sale mal
    res.status(500).json({ message: error.message });
  }
};
