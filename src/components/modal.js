export function createModal() {
  const dialog = document.createElement('dialog');
  dialog.classList.add('modal');

  const modalBox = document.createElement('div');
  modalBox.classList.add('modal__box');
  dialog.append(modalBox);

  const handleClose = () => {
    document.body.classList.remove('no-scroll');
  };

  dialog.addEventListener('close', handleClose);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  return {
    element: dialog,

    open(content) {
      if (!dialog.isConnected) {
        document.body.append(dialog);
      }

      modalBox.replaceChildren(content);

      document.body.classList.add('no-scroll');

      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    },

    close() {
      if (dialog.open) {
        dialog.close();
      }
    },

    isOpen() {
      return Boolean(dialog.open);
    },
  };
}
