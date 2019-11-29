import React from 'react';
import firebase from './Firestore';
import axios from 'axios';
import { Line } from 'rc-progress';
import * as moment from 'moment';
import Modal from 'react-awesome-modal';

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
const cliente = '/assets/user.png'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enPreparacionArrays: [],
      imagenResta: '',
      visible : false,
    }
  }
 
  componentDidMount () {
    const db = firebase.collection('enPreparacion');
    const userCollection = firebase.collection('userGustos');
    db.where("restaurante", "==", "El Retiro").onSnapshot((querySnapshot) => {
      var restaurants = [];
      
      querySnapshot.forEach(async (doc) => {
        this.state.imagenResta = doc.data().imagenResta;
        console.log(this.state.imagenResta);
        const userInfo = await userCollection.where("uid", "==", doc.data().user).get();
        console.log(userInfo.docs[0].data())
        restaurants.push({...doc.data(), id: doc.id, userInfo: userInfo.docs[0].data()});
        this.setState({enPreparacionArrays: restaurants})
      });
      if (querySnapshot.docs.length === 0) {
        this.setState({enPreparacionArrays: []})
      }
    });
  }

  openModal() {
    this.setState({
      visible : true
    });
  }

  closeModal() {
    this.setState({
      visible : false
    });
  }

  pasoPedidoPorcen(pasoActualPorcentaje) {
    switch (pasoActualPorcentaje) {
      case 0:
        return 0;
      case 1:
        return 33;
      case 2:
        return 66;
      default: 
        return 100;
    }
  }

  pasoPedidoLetras(pasoActualPorcentaje) {
    switch (pasoActualPorcentaje) {
      case 0:
        return 'Tomando pedido';
      case 1:
        return 'Order aceptada';
      case 2:
        return 'En preparación';
      default: 
        return 'Ya puede recogerlo';
    }
  }

  nextStep(docId) {
    console.log(docId);
    axios.post('https://us-central1-mr-ready.cloudfunctions.net/sendFCM', {
      docId: docId
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    console.log(moment().format("MMM Do YY"));
    return (
      <div className="container" >
        <div className="menu">
          <div className="contLogoReady">
            <img className="imgLogoReady" src={logo}/>
          </div>
          <div className="contInfoRest">  
            <img src={this.state.imagenResta} alt="" className=""/>
            <div className="contNameRest">
              <h1 className="nameRest">El Retiro</h1>
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
          <div className="contAfluencia contBotCerrar">
            <div className="cerrarRestauranteBot" onClick={() => this.openModal()}>
              <h3>Afluencia</h3>
            </div>
            <Modal 
              visible={this.state.visible}
              width="400"
              height="300"
              effect="fadeInUp"
              onClickAway={() => this.closeModal()}>
              <div className="Afluencia">
                <h1>¿Que tan lleno esta el restaurante?</h1>
                <div className="tiposAfluencia">
                  <div className="tipo" onClick={() => this.closeModal()}>
                    <div className="uno"></div>
                    <h3>No esta tan lleno</h3>
                  </div>
                  <div className="tipo" onClick={() => this.closeModal()}>
                    <div className="dos"></div>
                    <h3>Lo normal</h3>
                  </div>
                  <div className="tipo" onClick={() => this.closeModal()}>
                    <div className="tres"></div>
                    <h3>Esta todo ocupado</h3>
                  </div>
                </div>
              </div>
            </Modal>
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
          <div className="contList">
            <div className="listaPedidos">
              <div className="contTitListPedidos">
                <h3>Lista de Pedidos</h3>
                <p>{moment().format("LL")}</p>
              </div>
              <div className="contRayita">
                <div className="rayita"></div>
              </div>
              {this.state.enPreparacionArrays.map((restaurant, index) => {
                const fecha = restaurant.fecha
                  return (
                    <div className="contTarjePedido">
                      <div className="boxUno">
                        <img className="imgCliente" src={cliente} alt=""/>
                      </div>
                      <div className="boxDos">
                        <p className="nameCliente">Cliente:  <b>{restaurant.userInfo.nameUser}</b></p>
                        <p className="numOrden">Número de Orden: <b>{restaurant.numPedido}</b></p>
                        <p className="pedido">Orden: <b>{restaurant.pedidoDetails}</b></p>
                        <p className="fecha">Fecha y hora del pedido: <b>{moment(fecha.toDate()).format('LLL')}</b></p>
                        
                      </div>
                      <div className="boxTres">
                        <div className="contProgress">
                          <Line className="progressBar" percent={this.pasoPedidoPorcen(restaurant.seguimiento.pasoActual)} strokeWidth="8" strokeColor="#B1122A"
                          trailColor= "#d9d9d9"
                          trailWidth="8" 
                          strokeLinecap="round"
                          />
                        </div>
                        <p>Paso actual:</p>
                        <p>{this.pasoPedidoLetras(restaurant.seguimiento.pasoActual)}</p>
                        <div className="contBotSegui">
                          <div className="botSegui" onClick={() => this.nextStep(restaurant.id)}><h3>siguiente</h3></div>
                        </div>
                      </div>
                        
                    </div>
                  )
              })}
            </div>
          </div >
        </div>
      </div>
    )
  }
}