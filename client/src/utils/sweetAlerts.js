import Swal from "sweetalert2";

export const handleDelete = (itemId, deleteItem, itemName) => {
  Swal.fire({
    title: `¿Estás seguro de eliminar este ${itemName}?`,
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteItem(itemId);
      Swal.fire(
        "Eliminado",
        `El ${itemName} ha sido eliminado correctamente`,
        "success"
      );
    }
  });
};

export const handleSuccess = (message) => {
  Swal.fire({
    title: "Éxito",
    text: message,
    icon: "success",
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

export const handleError = (errorMessage) => {
  Swal.fire({
    title: "Error",
    text: errorMessage,
    icon: "error",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar",
  });
};

export const confirmLogout = (logout) => {
  Swal.fire({
    title: "¿Estás seguro de cerrar sesión?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      logout();
    }
  });
};
