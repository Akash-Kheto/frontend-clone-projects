// Wait until the HTML document has loaded before selecting elements.
document.addEventListener("DOMContentLoaded", () => {
  const emailForm = document.querySelector(".hero-buttons");
  const emailInput = document.querySelector("#email");
  const signInButton = document.querySelector(".btn-red-sm");
  const faqItems = document.querySelectorAll(".faqbox");

  // Create a message area for accessible form and button feedback.
  const statusMessage = document.createElement("p");
  statusMessage.className = "form-status";
  statusMessage.setAttribute("aria-live", "polite");
  statusMessage.setAttribute("role", "status");

  // Place the message area after the email form.
  if (emailForm) {
    emailForm.insertAdjacentElement("afterend", statusMessage);
  }

  // Display a message to the user.
  function showMessage(message) {
    statusMessage.textContent = message;
  }

  // Handle the email form submission.
  if (emailForm && emailInput) {
    emailForm.addEventListener("submit", (event) => {
      // Keep this demo on the same page; it has no real backend.
      event.preventDefault();

      // Use the browser's built-in email validation.
      if (!emailForm.reportValidity()) {
        return;
      }

      // Show a demo confirmation without sending the email anywhere.
      showMessage(
        `Thanks! ${emailInput.value} was entered. This is a front-end demo, so no account was created.`,
      );
    });
  }

  // Show a clear demo notice when the Sign In button is clicked.
  if (signInButton) {
    signInButton.addEventListener("click", () => {
      showMessage(
        "Sign In is a visual demo and is not connected to an account.",
      );
    });
  }

  // Keep only one FAQ answer open at a time.
  faqItems.forEach((currentItem) => {
    currentItem.addEventListener("toggle", () => {
      // Continue only when this FAQ item has just been opened.
      if (!currentItem.open) {
        return;
      }

      // Close every other FAQ item.
      faqItems.forEach((otherItem) => {
        if (otherItem !== currentItem) {
          otherItem.open = false;
        }
      });
    });
  });
});
