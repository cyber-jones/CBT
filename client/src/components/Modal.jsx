const Modal = ({ action, type, handleAction }) => {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className={`btn btn-${type}`}
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        {action}
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">CBT Says!</h3>
          <p className="py-4">
            Are you sure you want to continue with this action?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-success" onClick={handleAction}>Confirm</button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
