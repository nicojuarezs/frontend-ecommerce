import "./Modal.css";

export default function Modal({ title, handleClose, isOpen, children }) {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger" onClick={handleClose}>Cerrar</button>
                    <button className="btn">Aceptar</button>
                </div>
            </div>
        </div>
    );
}
