import React from 'react';
import {Link} from 'react-router-dom';
 import './card.css';

function EventoCard({id, titulo, procura,  detalhes, visualizacoes}){

    return(
        <div className="col-md-3 col-sm-12">

            <div className="card-body">
                <h5>{titulo}</h5>
                <p> Procurando: {procura}</p>
                <hr />
                <p className="card-text text-justify">
                    {detalhes}
                </p>

                <div className="row rodape-card d-flex align-items-center">
                    <div className="col-6">
                        <Link to={'/eventodetalhes/' + id} className="btn btn-sm btn-detalhes">+ detalhes</Link>                    
                    </div>

                    <div className="col-6 text-right">
                        <i class="fas fa-eye"></i> <span>{visualizacoes}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EventoCard;