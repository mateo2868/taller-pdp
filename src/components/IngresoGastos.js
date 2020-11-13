import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class IngresoGastos extends Component {
    render() {
        return (
            <div className="container">

                <nav className="navbar navbar-light bg-light dimensiones" styleClass="width: 468px; heigth: 60px;">
                    {/* <a className="navbar-brand">Navbar</a> */}
                    <p>Title</p>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="text" placeholder="Saldo Inicial" aria-label="Search" />
                        <input className="form-control mr-sm-2" type="text" placeholder="Saldo Final" aria-label="Search" />
                    </form>
                </nav>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="card bg-light mb-3">
                            <div className="card-header">Registro</div>
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <label for="tipoMovimiento">Tipo Movimiento: </label>
                                            <select className="form-control" id="tipoMovimiento">
                                                <option value="1">Ingreso</option>
                                                <option value="2">Ingreso</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-12">
                                            <label for="nombre">Nombre</label>
                                            <input className="form-control" id="nombre"/>
                                        </div>
                                        <div className="col-lg-12">
                                            <label for="cantidad">Cantidad</label>
                                            <input type="number" className="form-control" id="cantidad" />
                                        </div>

                                        <button type="button" className="btn btn-ligth">Cancelar</button>
                                        <button type="button" className="btn btn-primary">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card bg-light mb-3">
                            <div className="card-header">Listado Movimientos</div>
                            <div className="card-body">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td><i class="fas fa-times"></i></td>
                                            <td><i class="fas fa-pen"></i></td>
                                            <td>Salario Freelance</td>
                                            <td><button type="button">8.000</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
