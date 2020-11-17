import React from 'react'
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalMsg({ handleClose, show, msg }) {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                        <p>{msg}</p>
                </div>
                <div className="modal-footer">
                    <button type="button"  onClick={handleClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
        {/* <section className="modal-main">
          {children}
          <button onClick={handleClose}>close</button>
        </section> */}
      </div>
    );
}
