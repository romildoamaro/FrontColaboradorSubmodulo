import React, { useEffect, useState } from 'react';
import './Colaborador.css';
import axios from 'axios';

function Colaborador() {

    const [colaborador, setColaborador] = useState({ nome: "", cpf: "", item: "", data: "", });
    const [colaboradores, setColaboradores] = useState([]);
    const [atualizar, setAtualizar] = useState();

    useEffect(() => {
        buscarTodos();
    }, [atualizar]);

    function handleChange(event) {
        setColaborador({ ...colaborador, [event.target.name]: event.target.value });
    }

    function buscarTodos() {
        axios.get("http://localhost:8080/api/colaborador/").then(result => {
            setColaboradores(result.data);
        });
    }

    function limpar() {
        setColaborador({ nome: "", cpf: "", item: "", data: "", });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (colaborador.id) {
            axios.post("http://localhost:8080/api/colaborador/", colaborador).then(result => {
                setAtualizar(result);
            });
        } else {
            axios.put("http://localhost:8080/api/colaborador/", colaborador).then(result => {
                setAtualizar(result);
            });
        }
        limpar();
    }

    function excluir(id) {
        axios.delete("http://localhost:8080/api/colaborador/" + id).then(result => {
            setAtualizar(result);
        });
    }

    return (
        <div className="container">
            <h1>Cadastrar</h1>

            <form onSubmit={handleSubmit}>

                <div className="col-6">
                    <div>
                        <label className="form-label">Nome</label>
                        <input onChange={handleChange} value={colaborador.nome} name="nome" type="text" className="form-control" />
                    </div>
                    <div>
                        <label className="form-label">CPF</label>
                        <input onChange={handleChange} value={colaborador.cpf} name="cpf" type="text" className="form-control" />
                    </div>
                    <div>
                        <label className="form-label">Item</label>
                        <input onChange={handleChange} value={colaborador.item} name="item" type="text" className="form-control" />
                    </div>
                    <div>
                        <label className="form-label">Data</label>
                        <input onChange={handleChange} value={colaborador.data} name="data" type="date" className="form-control" />
                    </div>

                    <br />

                    <input type="submit" className='btn btn-success' value="Cadastrar" />

                </div>
                <br />

            </form>

            <hr />

            <button onClick={buscarTodos} type="button" className="btn btn-primary">Listar Todos
            </button>

            <br/>
            <br/>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Item</th>
                        <th scope="col">Data</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>

                    {colaboradores.map(colaborador => {
                        <tr key={colaborador.id}>

                            <td>{colaborador.nome}</td>
                            <td>{colaborador.cpf}</td>
                            <td>{colaborador.item}</td>
                            <td>{colaborador.data}</td>
                            <td>

                                <button onClick={() => setColaborador(colaborador)} className="btn btn-secondary">Alterar</button>&nbsp;
                                <button onClick={() => excluir(colaborador.id)} className="btn btn-danger">Excluir</button>

                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>

    );
}

export default Colaborador;
