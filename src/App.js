import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store, persistor } from '../src/store/';
import { Provider } from 'react-redux';
import { PersistGate} from 'redux-persist/integration/react';

/*PÁGINAS*/
import Login from './view/login/';
import NovoUsuario from './view/novoUsuario/';
import Home from './view/home/';
import UsuarioRecuperarSenha from './view/usuarioRecuperarSenha/';
import Cadastro from './view/cadastro/';
import Detalhes from './view/detalhes/';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route path='/eventos/:parametro' component={Home} />
        <Route exact path='/novousuario' component={NovoUsuario} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/usuariorecuperarsenha' component={UsuarioRecuperarSenha} />
        <Route exact path='/eventocadastro' component={Cadastro} />
        <Route path='/eventodetalhes/:id' component={Detalhes} />
        <Route path='/editarevento/:id' component={Cadastro} />
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
