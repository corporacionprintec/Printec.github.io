/**
 * Global variables
 */
let isEditing = false; // Editing state
let isAddingHistory = false;

document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners to buttons after the DOM is fully loaded
  document
    .getElementById("editButton")
    .addEventListener("click", enableEditing);
  document
    .getElementById("addHistoryButton")
    .addEventListener("click", showForm);
  document.querySelector(".submit-button").addEventListener("click", printPage);
});

/**
 * Function to show the new form container for adding history
 */
function showForm() {
  document.getElementById("newFormContainer").style.display = "block";
  isAddingHistory = true; // Set adding history state to true
  // Show the submit button when the form is shown
  const submitButton = document.getElementById("submitButton");
  if (submitButton) {
    submitButton.style.display = "block";
  }
}

/**
 * Function to toggle the visibility of a section
 * @param {string} sectionId - The ID of the section to toggle
 */
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.style.display =
    section.style.display === "none" || section.style.display === ""
      ? "block"
      : "none";
}

/**
 * Function to enable editing of client details
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

  // Change the Edit button to a Save button
  const editButton = document.getElementById("editButton");
  editButton.innerText = "Guardar";
  editButton.removeEventListener("click", enableEditing);
  editButton.addEventListener("click", saveEdits);

  isEditing = true; // Set editing state to true

  // Ensure the form container remains visible if adding history
  if (!isAddingHistory) {
    document.getElementById("newFormContainer").style.display = "none";
  }
}

/**
 * Function to save edits made to the client details
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

  // Change the Save button back to an Edit button
  const editButton = document.getElementById("editButton");
  editButton.innerText = "Editar";
  editButton.removeEventListener("click", saveEdits);
  editButton.addEventListener("click", enableEditing);

  isEditing = false; // Set editing state to false

  // Show the submit button when edits are saved
  const submitButton = document.getElementById("submitButton");
  if (submitButton) {
    submitButton.style.display = "block";
  }

  // Ensure the form container remains visible if adding history
  if (!isAddingHistory) {
    document.getElementById("newFormContainer").style.display = "none";
  }
}

/**
 * Function to print the page
 * @param {Event} event - The event triggered by form submission
 */
function printPage(event) {
  event.preventDefault();

  // Check if in editing mode
  if (isEditing) {
    alert("Primero debe guardar los datos editados del cliente.");
    return;
  }

  console.log("Printing page...");
  window.print();
}
