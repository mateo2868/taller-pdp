import React from 'react'

export default function EditarMovimiento({ handleClose, show, frmData, handleUpdate, handleInputUpdate }) {
    console.log(frmData);
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Title</h5>
                        <button type="button" className="close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleUpdate}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <label>Tipo Movimiento: </label>
                                    <select className="form-control" name="tipoMovimiento" value={frmData.tipoMovimiento} onChange={handleInputUpdate}>
                                        <option value="1">Ingreso</option>
                                        <option value="2">Gastos</option>
                                    </select>
                                </div>
                                <div className="col-lg-12">
                                    <label>Nombre</label>
                                    <input className="form-control" name="nombre" value={frmData.nombre} onChange={handleInputUpdate} />
                                </div>
                                <div className="col-lg-12">
                                    <label>Cantidad</label>
                                    <input type="number" className="form-control" name="cantidad" value={frmData.cantidad} onChange={handleInputUpdate} />
                                </div>

                                <button type="submit" className="btn btn-primary">Editar Movimiento</button>
                            </div>
                        </form>
                        {/* <p>{frmData}</p> */}
                    </div>
                    <div className="modal-footer">
                        <button type="button"  onClick={handleClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
