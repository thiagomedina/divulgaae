import React, { useState, useEffect } from 'react';
import './detalhes.css';
import {Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar';

function EventoDetalhes(props){

    const [evento, setEvento] = useState({});
    const usuarioLogado = useSelector(state => state.usuarioEmail);
    const [carregando, setCarregando] = useState(1);
    const [excluido, setExcluido] = useState(0);

    function remover(){
        firebase.firestore().collection('eventos').doc(props.match.params.id).delete().then(() => {
            setExcluido(1);
        })
    }

    useEffect(() => {     
        if(carregando){        
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
                setEvento(resultado.data())
                firebase.firestore().collection('eventos').doc(props.match.params.id).update('visualizacoes', resultado.data().visualizacoes + 1)
                setCarregando(0);
              
        });  
    }     
    },[])

    return(
        <>
            <Navbar />

            {excluido ? <Redirect to='/' /> : null}


            <div className="container-fluid">
                {

                carregando ? <div className="row mt-5"> <div class="spinner-border text-danger mx-auto" role="status"><span class="sr-only"></span></div> </div>
                :
                <div>
                <div className="row">

                     <div className="col-12 text-right mt-1 visualiacoes">
                     <i class="fas fa-eye"></i> <span>{evento.visualizacoes + 1}</span>
                     </div>

                     <h3 className="mx-auto mt-5 titulo"><strong>{evento.titulo}</strong></h3>


                </div>

                <div className="row mt-5 d-flex justify-content-around ">
                    <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                        <i className="fas fa-ticket-alt fa-2x"></i>
                        <h5><strong>Procurando</strong></h5>
                        <span className="mt-3">{evento.procura}</span>
                    </div>

                    <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                        <i className="fas fa-link fa-2x"></i>
                        <h5><strong>Link</strong></h5>
                        <a  target="_blank"className="mt-3  text-white"href={evento.link}>{evento.link}</a>
                    </div>
                </div>

                <div className="row box-detalhes mt-5">
                    <div className="col-12 text-center">
                        <h5><strong>Detalhes do Projeto</strong></h5>
                    </div>
                    <div className="col-12 text-center">
                        <p>{evento.detalhes}</p>
                    </div>
                    
                  
                </div>

                {
                    usuarioLogado === evento.usuario ? 
                    <Link to={`/editarevento/${props.match.params.id}`} className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>
                    : ''
                }


                {
                    usuarioLogado === evento.usuario ? <button onClick={remover} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Remover Projeto </button>
                    : null
                }

                </div>

                }
            </div>

        </>
    )
}

export default EventoDetalhes;