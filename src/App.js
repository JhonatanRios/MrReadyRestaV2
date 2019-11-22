import React from 'react';
import firebase from './Firestore';
import './reset.css';
import './style.css';

const logo = '/assets/logoReady.png';
const imaResta = '/assets/imgRest.png';
const user = '/assets/imgAngelina.png';
const lupa = '/assets/Loupe.png';
const uno = '/assets/botoncitos/1.png';
const dos = '/assets/botoncitos/2.png';
const tres = '/assets/botoncitos/3.png';
const cuatro = '/assets/botoncitos/4.png';
const cinco = '/assets/botoncitos/5.png';

export class App extends React.Component {
 
  componentDidMount () {
    const db = firebase.firestore().collection('restaurantes');
    console.log(db)
  }

  render() {
    return (
      <div className="container" >
        <div className="menu">
        <div className="contLogoReady">
            <img className="imgLogoReady" src={logo}/>
          </div>
          <div className="contInfoRest">  
            <img src={imaResta} alt=""/>
            <div className="contNameRest">
              <h1 className="nameRest">Nombre Restaurante</h1>
            </div>
          </div>
          <div className="contBotones">
            <div className="contBotSel">
                <img src={uno} alt=""/>
                <h2>Ordenes</h2>
            </div>
            <div className="contBotDesSel">
                <img src={dos} alt=""/>
                <h2>Historial</h2>
            </div>
            <div className="contBotDesSel">
                <img src={tres} alt=""/>
                <h2>Restaurante</h2>
            </div>
            <div className="contBotDesSel">
                <img src={cuatro} alt=""/>
                <h2>Comentarios</h2>
            </div>
            <div className="contBotDesSel">
              <img src={cinco} alt=""/>
              <h2>Configuración</h2>
            </div>
          </div>
          <div className="contBotCerrar">
              <div className="cerrarRestauranteBot">
                <h3>CERRAR RESTAURANTE</h3>
              </div>
            </div>
        </div>
        <div className="contenido">
            <div className="header">
                <div className="contBuscador">
                  <img src={lupa} alt=""/>
                  <h2>Buscar número de orden</h2>
                </div>
                <div className="contPerfil">
                  <h2>Angelina Doe</h2>
                  <img src={user} alt=""/>
                </div>
            </div>
            <div className="listaPedidos">
                <h1>Lista de Pedidos</h1>
            </div>
        </div>
      </div>
    )
  }
}