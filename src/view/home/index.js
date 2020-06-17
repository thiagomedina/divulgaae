import React, { useState, useEffect } from 'react';
import './home.css';
import img from '../../assets/banner.png'

import Navbar from '../../components/navbar/';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import EventoCard from '../../components/card'

function Home({ match }) {

    const [evento, setEvento] = useState([]);
    let listaProjetos = [];
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    useEffect(() => {

        if (match.params.parametro) {
            firebase.firestore().collection('eventos').where('usuario', '==', usuarioEmail).get()
                .then(async (resultado) => {
                    await resultado.docs.map(doc => {
                        return listaProjetos.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    })

                    setEvento(listaProjetos);
                });

        } else {
            firebase.firestore().collection('eventos').get()
                .then(async (resultado) => {
                    await resultado.docs.map(doc => {

                      return  listaProjetos.push({
                            id: doc.id,
                            ...doc.data()
                        })

                    })

                    setEvento(listaProjetos);
                });
        }


    });


    return (
        <>
            <Navbar />

            <div>
                
             <img alt="banner"  className="size "src={img}></img>
            </div>

            <div className="row p-3 ">
                <h2 className="mx-auto p-5">PROJETOS PUBLICADOS</h2>
                {/* <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar evento pelo título..." /> */}
            </div>


            <div className="row p-3">
                {evento.map(item => <EventoCard key={item.id} id={item.id} procura={item.procura} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />)}

            </div>
        </>
    )
}

export default Home;