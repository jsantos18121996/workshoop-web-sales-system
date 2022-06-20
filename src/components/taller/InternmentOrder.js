import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const InternmentOrder = () => {

    const ordersInitial = [
        { id: 1, cliente: "Jaime Santos", categoria: "Laptops"},
        { id: 2, cliente: "Tifanny Aquino", categoria: "Mouses"}
    ]

    const [ orders , setOrders ] = useState(ordersInitial);
    const [ modalAdd, setModalAdd ] = useState(false);
    const [ modalEdit, setModalEdit ] = useState(false);
    const [ modalDelete, setModalDelete ] = useState(false);
    const [ orderSelected, setOrderSelected ] = useState({
        id: '',
        cliente: '',
        categoria: ''
    })

    const openModalAdd = () => {
        setOrderSelected(null);
        setModalAdd(true);
    }

    const selectOrder = (order, caseAction) => {
        setOrderSelected(order);
        caseAction === 'Editar' ? setModalEdit(true) : setModalDelete(true);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setOrderSelected((prevState) => (
            {
                ...prevState,
                [name] : value
            }
        ))
    }

    const addOrder = () => {
        let orderToAdd = orderSelected;
        orderToAdd.id = orders[orders.length-1].id + 1;
        let ordersNew = orders;
        ordersNew.push(orderToAdd);
        setOrders(ordersNew);
        setModalAdd(false);
    }

    const editOrder = () => {
       let ordersNew = orders;
       orders.forEach(order => {
        if(order.id === orderSelected.id) {
            order.cliente = orderSelected.cliente;
            order.categoria = orderSelected.categoria;
        }
       })
       setOrders(ordersNew);
       setModalEdit(false);
       
    }

    const deleteOrder = () => {
        setOrders(
            orders.filter(order => {
                return order.id !== orderSelected.id
            })
        )
        setModalDelete(false);
    }

    return (
        <div className='reports text-center ml-auto mr-auto mb-auto'>
            <h2>Órdenes de Internamiento</h2>
            <br />
            <button className='btn btn-success' onClick={() => openModalAdd()}>Agregar orden</button>
            <table style={{fontSize: "1rem"}} className="table table-bordered">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order => {
                            return(
                            <tr>
                                <td>{order.cliente}</td>
                                <td>{order.categoria}</td>
                                <td>
                                    <button className='btn btn-primary' 
                                        onClick={() => selectOrder(order, 'Editar')}>Editar
                                    </button>
                                    <button className='btn btn-danger'
                                        onClick={() => selectOrder(order, 'Eliminar')}>Eliminar
                                    </button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
            <Modal isOpen={modalAdd}>
                <ModalHeader>
                    <div><h3>Agregar orden de internamiento</h3></div>
                </ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>Id</label>
                        <input
                            className='form-control'
                            readOnly
                            type='text'
                            name="id"
                            value={orders[orders.length-1].id + 1}
                        />
                        <br />
                        <label>Cliente</label>
                        <input 
                            className='form-control'
                            type='text'
                            name='cliente'
                            value={orderSelected ? orderSelected.cliente: ''}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Categoría</label>
                        <input 
                            className='form-control'
                            type={'text'}
                            name='categoria'
                            value={orderSelected ? orderSelected.categoria : ''}
                            onChange={handleChange}
                        />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button 
                        className='btn btn-primary'
                        onClick={() => addOrder()}
                        >Aceptar</button>
                    <button 
                        className='btn btn-danger'
                        onClick={() => setModalAdd(false)}
                        >Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEdit}>
                <ModalHeader>
                    <div><h3>Editar orden de internamiento</h3></div>
                </ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>Id</label>
                        <input
                            className='form-control'
                            readOnly
                            type='text'
                            name="id"
                            value={orderSelected && orderSelected.id}
                        />
                        <br />
                        <label>Cliente</label>
                        <input 
                            className='form-control'
                            type='text'
                            name='cliente'
                            value={orderSelected && orderSelected.cliente}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Categoría</label>
                        <input 
                            className='form-control'
                            type={'text'}
                            name='categoria'
                            value={orderSelected && orderSelected.categoria}
                            onChange={handleChange}
                        />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button 
                        className='btn btn-primary'
                        onClick={() => editOrder()}
                        >Aceptar</button>
                    <button 
                        className='btn btn-danger'
                        onClick={() => setModalEdit(false)}
                        >Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalDelete}>
                <ModalBody>
                    ¿Está seguro de eliminar esta orden?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-danger'
                        onClick={() => deleteOrder()}
                    >Sí</button>
                    <button className='btn btn-secondary'
                        onClick={() => setModalDelete(false)}
                    >No</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default InternmentOrder;