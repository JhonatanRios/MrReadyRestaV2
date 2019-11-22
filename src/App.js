import React from 'react';
import './reset.css';
import './style.css';

const logo = '../public/assets/logoReady.png';

export class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="menu">
        <div className="contLogoReady">
            <img className="imgLogoReady"/>
          </div>
          <div className="contInfoRest">  
            <img src={'/public/assets/imaRest.png'} alt=""/>
            <div className="contNameRest">
              <h1 className="nameRest">Nombre Restaurante</h1>
            </div>
          </div>
          <div className="contBotones">
            <div className="contBotSel">
                <img src="src/botoncitos/1.png" alt=""/>
                <h2>Ordenes</h2>
            </div>
            <div className="contBotDesSel">
                <img src="src/botoncitos/2.png" alt=""/>
                <h2>Historial</h2>
            </div>
            <div className="contBotDesSel">
                <img src="src/botoncitos/3.png" alt=""/>
                <h2>Restaurante</h2>
            </div>
            <div className="contBotDesSel">
                <img src="src/botoncitos/4.png" alt=""/>
                <h2>Comentarios</h2>
            </div>
            <div className="contBotDesSel">
              <img src="src/botoncitos/5.png" alt=""/>
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
                  <img src="src/Loupe.png" alt=""/>
                  <h2>Buscar número de orden</h2>
                </div>
                <div className="contPerfil">
                  <h2>Angelina Doe</h2>
                  <img src="src/imgAngelina.png" alt=""/>
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