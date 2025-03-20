/**
 * Global variables
 */
let isEditing = false; // Estado de edición
let isAddingHistory = false;

document.addEventListener("DOMContentLoaded", () => {
  // Agregar event listeners a los botones después de cargar el DOM
  document.getElementById("editButton").addEventListener("click", enableEditing);
  document.getElementById("addHistoryButton").addEventListener("click", showForm);
  document.querySelector(".submit-button").addEventListener("click", printPage);
  // Agregar listener para el botón de descargar PDF
  document.getElementById("downloadPDFButton").addEventListener("click", downloadPDF);
});

/**
 * Función para mostrar el contenedor del nuevo formulario (Agregar Historial)
 */
function showForm() {
  document.getElementById("newFormContainer").style.display = "block";
  isAddingHistory = true; // Establece el estado de agregar historial en true
  // Muestra el botón de imprimir cuando se muestra el formulario
  const submitButton = document.getElementById("submitButton");
  if (submitButton) {
    submitButton.style.display = "block";
  }
}

/**
 * Función para alternar la visibilidad de una sección
 * @param {string} sectionId - ID de la sección a alternar
 */
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.style.display =
    section.style.display === "none" || section.style.display === ""
      ? "block"
      : "none";
}

/**
 * Función para habilitar la edición de los detalles del cliente
 */
function enableEditing() {
  const detailFields = [
    "fullName",
    "dni",
    "celular",
    "date",
    "brandAndModel",
    "summary",
  ];

  detailFields.forEach((field) => {
    const fieldElement = document.getElementById(field);
    const value = fieldElement.innerText;
    const input = document.createElement("input");
    input.type = "text";
    input.id = `input_${field}`;
    input.value = value;
    fieldElement.replaceWith(input);
  });

  // Cambia el botón de Editar por uno de Guardar
  const editButton = document.getElementById("editButton");
  editButton.innerText = "Guardar";
  editButton.removeEventListener("click", enableEditing);
  editButton.addEventListener("click", saveEdits);

  isEditing = true; // Establece el estado de edición en true

  // Si no se está agregando historial, oculta el contenedor del formulario
  if (!isAddingHistory) {
    document.getElementById("newFormContainer").style.display = "none";
  }
}

/**
 * Función para guardar las ediciones realizadas
 */
function saveEdits() {
  const detailFields = [
    "fullName",
    "dni",
    "celular",
    "date",
    "brandAndModel",
    "summary",
  ];

  detailFields.forEach((field) => {
    const input = document.getElementById(`input_${field}`);
    const value = input.value;
    const p = document.createElement("p");
    p.id = field;
    p.innerText = value;
    input.replaceWith(p);
  });

  // Cambia el botón de Guardar de vuelta a Editar
  const editButton = document.getElementById("editButton");
  editButton.innerText = "Editar";
  editButton.removeEventListener("click", saveEdits);
  editButton.addEventListener("click", enableEditing);

  isEditing = false; // Estado de edición en false

  // Muestra el botón de imprimir al guardar las ediciones
  const submitButton = document.getElementById("submitButton");
  if (submitButton) {
    submitButton.style.display = "block";
  }

  // Si no se está agregando historial, oculta el contenedor del formulario
  if (!isAddingHistory) {
    document.getElementById("newFormContainer").style.display = "none";
  }
}

/**
 * Función para imprimir la página
 * @param {Event} event - Evento del formulario
 */
function printPage(event) {
  event.preventDefault();

  // Verifica si se está en modo edición
  if (isEditing) {
    alert("Primero debe guardar los datos editados del cliente.");
    return;
  }

  console.log("Imprimiendo página...");
  window.print();
}

/**
 * Función para descargar el contenido actual en formato PDF
 */
function downloadPDF() {
  // Selecciona el contenedor principal que engloba todo el contenido
  const element = document.querySelector(".container-received");

  // Opciones para la conversión a PDF.
  // Se incluye la propiedad pagebreak para evitar cortes abruptos,
  // y se recomienda incluir en el CSS (de impresión) estilos para los input[type="range"]
  // de modo que se muestren las barras gráficas.
  const opt = {
    margin: 0.5,
    filename: "formulario_modificado.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] }
  };

  // Genera y descarga el PDF usando html2pdf
  html2pdf().set(opt).from(element).save();
}

