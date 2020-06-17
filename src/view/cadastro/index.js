import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './cadastro.css';
import Navbar from '../../components/navbar';
import firebase from '../../config/firebase';



function EventoCadastro(props) {
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [procura, setProcura] = useState();
    // const [preco, setPreco] = useState();
    const [link, setLink] = useState();

    const [detalhes, setDetalhes] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);


    const db = firebase.firestore();

    useEffect(() => {
        if (props.match.params.id) {
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
                setTitulo(resultado.data().titulo)
                setDetalhes(resultado.data().detalhes)
                // setPreco(resultado.data().preco)
                setLink(resultado.data().link)

                                // preco ? setPreco(resultado.data().preco) : null
                setProcura(resultado.data().procura)

            })
        }
    }, [carregando])

    function atualizar() {
        setMsgTipo(null);
        setCarregando(1);

     
        db.collection('eventos').doc(props.match.params.id).update({
            titulo: titulo,
            procura: procura,
            // preco: preco,
            link: link,
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
            procura: procura,
            link:link,
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
                  

                    <div className="form-group row">
                        <div className="col-6">
                            <label>O que você procura:</label>
                            <select onChange={(e) => setProcura(e.target.value)} className="form-control" value={procura && procura}>
                                <option disabled selected value>-- Selecione uma opção --</option>
                                <option>Contribuição</option>
                                <option>Time</option>
                            </select>
                        </div>
                        <div className="col-6">
                        <label> Link do Repositório</label>
                        <input onChange={(e) => setLink(e.target.value)} type="text" className="form-control" value={link && link} />
                    </div>
                         
                        {/* {
                            procura === "Frellancer" ?
                        <div className="col-6">
                            <label>Valor R$</label>
                            <input onChange={(e) => setPreco(e.target.value)} type="text" className="form-control" value={preco && preco} />
                                </div>
                                : null
                        } */}

                    </div>

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
                    {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Publicado &#128526; </span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível publicar! &#128546; </span>}
                </div>
            </div>
        </>
    )
}

export default EventoCadastro;