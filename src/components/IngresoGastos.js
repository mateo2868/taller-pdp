import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import uuid from 'react-uuid';
import ModalMsg from './ModalMsg';
import EditarMovimiento from './EditarMovimiento';
import NumberFormat  from 'react-number-format'
export default class IngresoGastos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saldo: {
                inicial: JSON.parse(localStorage.getItem('saldo')).inicial || 0,
                final: JSON.parse(localStorage.getItem('saldo')).final || 0
            },
            frmIngresos: {
                id: 0,
                tipoMovimiento: '1',
                nombre: '',
                cantidad: 0
            },
            suma: {
                ingresos: 0,
                gastos: 0
            },
            frmEditar: {
                id: 0,
                tipoMovimiento: '1',
                nombre: '',
                cantidad: 0
            },
            showModal: false,
            showModalEditar: false,
            tipo: '',
            msg: '',
            listaMovimientos: JSON.parse(localStorage.getItem('frmIngresos')) || [],
            selectedOption: 'option1'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeSaldoInicial = this.changeSaldoInicial.bind(this);
        this.saldo = this.saldo.bind(this);
        this.eliminarMovimiento = this.eliminarMovimiento.bind(this);
        this.buscarMovimiento = this.buscarMovimiento.bind(this);
        this.buscar = this.buscar.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.hideModalEditar = this.hideModalEditar.bind(this);
        this.editarMovimiento = this.editarMovimiento.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleInputUpdate = this.handleInputUpdate.bind(this);
    }

    async componentDidMount() {
        await this.sumarIngresosGastos();
        this.saldo(this.state.saldo.inicial);
    }

    sumarIngresosGastos() {
        return new Promise((resolve, reject) => {
            let data = localStorage.getItem('frmIngresos');
            if (data !== null && data !== "") {

                const ingresos = JSON.parse(data).filter(e => e.tipoMovimiento === "1").reduce((total, obj) => total + parseInt(obj.cantidad), 0);
                const gastos = JSON.parse(data).filter(e => e.tipoMovimiento === "2").reduce((total, obj) => total + parseInt(obj.cantidad), 0);

                resolve(this.setState({
                    suma: {
                        ingresos,
                        gastos
                    }
                }));
            }
        })

    };

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            frmIngresos: {
                ...this.state.frmIngresos,
                [name]: value
            }
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        this.setState({
            frmIngresos: {
                ...this.state.frmIngresos,
                id: uuid()
            }
        }, async () => {
            if (this.state.frmIngresos.nombre === '') {
                return this.setState({
                    tipo: 'Error',
                    showModal: true,
                    msg: "El campo nombre no puede estar vacio"
                })
            }
            console.log(this.state.frmIngresos.cantidad);
            if (this.state.frmIngresos.cantidad < 0) {
                return this.setState({
                    tipo: 'Error',
                    showModal: true,
                    msg: "El campo cantidad no puede ser menor a 0"
                })
            }

            if (this.state.frmIngresos.tipoMovimiento === "2") {
                if (this.state.saldo.final < 0 || (this.state.saldo.final - this.state.frmIngresos.cantidad) < 0) {
                    return this.setState({
                        tipo: 'Error',
                        showModal: true,
                        msg: "No tiene suficiente saldo"
                    })
                }
            }

            let frmIngresos = [];

            if (localStorage.getItem('frmIngresos') !== "" && localStorage.getItem('frmIngresos') !== null) {
                frmIngresos = JSON.parse(localStorage.getItem('frmIngresos'));
            }

            frmIngresos.push(this.state.frmIngresos);

            this.setState({
                listaMovimientos: frmIngresos
            })

            localStorage.setItem('frmIngresos', JSON.stringify(frmIngresos))

            await this.sumarIngresosGastos();
            this.saldo(this.state.saldo.inicial);
            return this.setState({
                tipo: 'Registro Exitoso',
                showModal: true,
                msg: `El ${this.state.frmIngresos.tipoMovimiento === "2" ? 'gasto' : 'ingreso'} fue agregado con éxito`
            })
            // alert('El ingreso fue agregado con éxito');
        })

    }

    changeSaldoInicial(event) {
       this.saldo(event.target.value)
    }

    saldo(value) {
        this.setState({
            saldo: {
                inicial: value,
                final: parseInt(value) + (this.state.suma.ingresos - this.state.suma.gastos)
            }
        });
        setTimeout(() => {
            localStorage.setItem('saldo', JSON.stringify(this.state.saldo));
        }, 1000);
    }

    async eliminarMovimiento(id) {
        let listaMovimientos = this.state.listaMovimientos.filter(e => e.id !== id);
        this.setState({
            listaMovimientos
        });

        localStorage.setItem('frmIngresos', JSON.stringify(listaMovimientos))
        await this.sumarIngresosGastos();
        this.saldo(this.state.saldo.inicial);
    }

    editarMovimiento(data) {
        this.setState({
            frmEditar: data,
            showModalEditar: true
        })
    }

    buscarMovimiento(evento) {
        this.setState({
            selectedOption: evento.target.value
        })
        let listaMovimientos = JSON.parse(localStorage.getItem("frmIngresos"));
        let nuevoArray = []
        switch (evento.target.value) {
            case "option2":
                nuevoArray = listaMovimientos.filter(e => e.tipoMovimiento === "1");
                break
            case "option3":
                nuevoArray = listaMovimientos.filter(e => e.tipoMovimiento === "2");
                break;
            default:
                nuevoArray = listaMovimientos;
                break;
        }
        this.setState({
            listaMovimientos: nuevoArray
        })
    }

    buscar(evento) {
        let nuevoArray = [];

        if (evento.target.value === "") {
            nuevoArray = JSON.parse(localStorage.getItem('frmIngresos'));
        } else {
            nuevoArray = this.state.listaMovimientos.filter(e => e.nombre.search(evento.target.value) >= 0 || e.cantidad.search(evento.target.value) >= 0)
        }

        this.setState({
            listaMovimientos: nuevoArray
        })
    }

    hideModal() {
        this.setState({ showModal: false });
    };

    hideModalEditar() {
        this.setState({ showModalEditar: false });
    }

    async handleUpdate(evento) {
        evento.preventDefault();

        if (this.state.frmEditar.nombre === '') {
            return this.setState({
                tipo: 'Error',
                showModal: true,
                msg: "El campo nombre no puede estar vacio"
            })
        }

        if (this.state.frmEditar.cantidad < 0) {
            return this.setState({
                tipo: 'Error',
                showModal: true,
                msg: "El campo cantidad no puede ser menor a 0"
            })
        }

        // if (this.state.frmEditar.tipoMovimiento === "2") {
        //     if (this.state.saldo.final < 0 || (this.state.saldo.final - this.state.frmEditar.cantidad) < 0) {
        //         return this.setState({
        //             showModal: true,
        //             msg: "No tiene suficiente saldo"
        //         })
        //     }
        // }

        let nuevoArray = JSON.parse(localStorage.getItem('frmIngresos'));
        for (let i = 0; i < nuevoArray.length; i++) {
            if (nuevoArray[i].id === this.state.frmEditar.id) {
                nuevoArray[i] = this.state.frmEditar
            }
        }

        localStorage.setItem('frmIngresos', JSON.stringify(nuevoArray));
        this.hideModalEditar();

        this.setState({
            listaMovimientos: nuevoArray
        })
        await this.sumarIngresosGastos();
        this.saldo(this.state.saldo.inicial);
    }

    handleInputUpdate(evento) {
        let name = evento.target.name;
        this.setState({
            frmEditar: {
                ...this.state.frmEditar,
                [name]: evento.target.value
            }
        })
    }

    render() {
        const lista = this.state.listaMovimientos.map((todo) =>
            <tr key={todo.id}>
                <td><button type="" className="btn btn-clear" onClick={() => this.eliminarMovimiento(todo.id)}><i className="fas fa-times"></i></button></td>
                <td><button type="" className="btn btn-clear" onClick={() => this.editarMovimiento(todo)}><i className="fas fa-pen"></i></button></td>
                <td>{todo.nombre}</td>
                {todo.tipoMovimiento === "1" ?
                    <NumberFormat value={todo.cantidad} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={
                        value => <td><button type="button" className="btn btn-success">{value}</button></td>
                    } /> :
                    <NumberFormat value={todo.cantidad} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={
                        value => <td><button type="button" className="btn btn-danger">{value}</button></td>
                    } />
                }
            </tr>
        )

        return (
            <div className="container">
                <nav className="navbar navbar-light bg-light dimensiones">
                    {/* <a className="navbar-brand">Navbar</a> */}
                    <p>Title</p>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="number" value={this.state.saldo.inicial} onChange={this.changeSaldoInicial} placeholder="Saldo Inicial" />
                        <input className="form-control mr-sm-2" type="text" value={this.state.saldo.final} placeholder="Saldo Final" aria-label="Search" disabled />
                    </form>
                </nav>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="card bg-light mb-3">
                            <div className="card-header">Registro</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <label>Tipo Movimiento: </label>
                                            <select className="form-control" name="tipoMovimiento" value={this.state.frmIngresos.tipoMovimiento} onChange={this.handleChange}>
                                                <option value="1">Ingreso</option>
                                                <option value="2">Gastos</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-12">
                                            <label>Nombre</label>
                                            <input className="form-control" name="nombre" value={this.state.frmIngresos.nombre} onChange={this.handleChange} />
                                        </div>
                                        <div className="col-lg-12">
                                            <label>Cantidad</label>
                                            <input type="number" className="form-control" name="cantidad" value={this.state.frmIngresos.cantidad} onChange={this.handleChange} />
                                        </div>

                                        <button type="button" className="btn btn-ligth">Cancelar</button>
                                        <button type="submit" className="btn btn-primary">Agregar Movimiento</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card bg-light mb-3">
                            <div className="card-header">Listado Movimientos <span className="badge badge-success float-right">{this.state.listaMovimientos.length}</span></div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="text" className="form-control" placeholder="Buscar" onChange={this.buscar}/>
                                    </div>

                                    <div onChange={this.buscarMovimiento}>
                                        <input type="radio" value="option1" name="gender" checked={this.state.selectedOption === "option1"} /> Todo
                                        <input type="radio" value="option2" name="gender" checked={this.state.selectedOption === "option2"} /> Ingresos
                                        <input type="radio" value="option3" name="gender" checked={this.state.selectedOption === "option3"} /> Gastos
                                    </div>
                                </div>


                                <table className="table">
                                    <tbody>
                                        {lista}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalMsg show={this.state.showModal} handleClose={this.hideModal} msg={this.state.msg} tipo={this.state.tipo} />
                <EditarMovimiento show={this.state.showModalEditar} handleClose={this.hideModalEditar} frmData={this.state.frmEditar} handleUpdate={this.handleUpdate} handleInputUpdate={this.handleInputUpdate}/>
            </div>

        )
    }
}
