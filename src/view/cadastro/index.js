import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './cadastro.css';
import Navbar from '../../components/navbar';
import firebase from '../../config/firebase';



function EventoCadastro(props) {
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [valor, setData] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);


    const storage = firebase.storage();
    const db = firebase.firestore();

    useEffect(() => {
        if (props.match.params.id) {
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
                setTitulo(resultado.data().titulo)
                setDetalhes(resultado.data().detalhes)

            })
        }
    }, [carregando])

    function atualizar() {
        setMsgTipo(null);
        setCarregando(1);

       

        db.collection('eventos').doc(props.match.params.id).update({
            titulo: titulo,
           
            detalhes: detalhes,
                     
        }).then(() => {
            setMsgTipo('sucesso');
            setCarregando(0);
        }).catch(erro => {
            setMsgTipo('erro');
            setCarregando(0);
        });
    }

    function cadastrar() {
        setMsgTipo(null);
        setCarregando(1);

        db.collection('eventos').add({
            titulo: titulo,
            detalhes: detalhes,
            usuario: usuarioEmail,
            visualizacoes: 0,
            publico: 1,
            criacao: new Date()
        }).then(() => {
            setMsgTipo('sucesso');
            setCarregando(0);
        }).catch(erro => {
            setMsgTipo('erro');
            setCarregando(0);
        });
    }


    return (
        <>
            <Navbar />
            <div className="col-12 mt-5">
                <div className="row">
                    <h3 className="mx-auto font-weight-bold">{props.match.params.id ? 'Atualizar Evento' : 'Novo Evento'}</h3>
                </div>

                <form>
                    <div className="form-group">
                        <label>Título:</label>
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo && titulo} />
                    </div>

                    {/* <div className="form-group">
                    <label>O que você procura:</label>
                    <select onChange={(e) => setTipo(e.target.value) } className="form-control" value={tipo && tipo}>
                        <option disabled selected value>-- Selecione um tipo --</option>
                        <option>Integrante Para o Time</option>
                        <option>Time</option>
                        <option>Frellancer</option>
                        <option>Especialista</option>
                    </select>                    
                </div> */}

                    <div className="form-group">
                        <label>Descrição do Projeto:</label>
                        <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows="3" value={detalhes && detalhes} />
                    </div>

                  
                  

                  

                    <div className="row">
                        {
                            carregando > 0 ? <div class="spinner-border text-danger mx-auto" role="status"><span class="sr-only">Loading...</span></div>
                                : <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">{props.match.params.id ? 'Atualizar Evento' : 'Publicar Evento'}</button>
                        }
                    </div>

                </form>

                <div className="msg-login text-center mt-2">
                    {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Evento Publicado &#128526; </span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível publicar o evento! &#128546; </span>}
                </div>
            </div>
        </>
    )
}

export default EventoCadastro;