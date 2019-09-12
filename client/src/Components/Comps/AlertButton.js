function AlertButton(message) {
  const Modal = document.querySelector(".AlertModal");
  const cancelButton = document.querySelector(".cancelButton");
  const okButton = document.querySelector(".okButton");
  const Message = document.querySelector(".AlertModalMessage");
  Modal.classList.add("AlertModalOpen");
  Message.textContent = message;

  return new Promise((resolve, reject) => {
    okButton.addEventListener("click", function() {
      Modal.classList.remove("AlertModalOpen");
      Message.textContent = "";
      resolve(true);
    });
    cancelButton.addEventListener("click", function() {
      Modal.classList.remove("AlertModalOpen");
      Message.textContent = "";
      reject(false);
    });
  });
}

export default AlertButton;
