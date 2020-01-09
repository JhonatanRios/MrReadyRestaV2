import React from 'react';
import firebase from './Firestore';
import axios from 'axios';
import { Line } from 'rc-progress';
import * as moment from 'moment';
import Modal from 'react-awesome-modal';

import './reset.css';
import './style.css';


const logo = '/assets/logoReady.png';
const user = '/assets/imgAngelina.png';
const lupa = '/assets/Loupe.png';
const uno = '/assets/botoncitos/1.png';
const dos = '/assets/botoncitos/2.png';
const tres = '/assets/botoncitos/3.png';
const cuatro = '/assets/botoncitos/4.png';
const cinco = '/assets/botoncitos/5.png';
const cliente = '/assets/user.png'
const afluUno = '/assets/afluencia/afluUno.png';
const afluDos = '/assets/afluencia/afluDos.png';
const afluTres = '/assets/afluencia/afluTres.png'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enPreparacionArrays: [],
      imagenResta: 'https://firebasestorage.googleapis.com/v0/b/mr-ready.appspot.com/o/LogosRestaurantesReales%2Fel-sabor-de-mi-tierra.jpeg?alt=media&token=d4750fa0-843e-4672-95b0-769c5b834204',
      afluencia: 0,
      visible : false,
      dbResta:'',
      
    }
  }
 
  componentDidMount () {
    const db = firebase.collection('enPreparacion');
    this.state.dbResta = firebase.collection('restaurantes');
    const userCollection = firebase.collection('userGustos');

    this.state.dbResta.doc("4jA0jtIdQeiLHKpDbVoI")
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        this.setState({afluencia: doc.data().afluencia})
    });
    db.where("restaurante", "==", "El Sabor de Mi Tierra").onSnapshot((querySnapshot) => {
      var restaurants = [];
      querySnapshot.forEach(async (doc) => {
        this.state.imagenResta = doc.data().imagenResta;
        console.log(this.state.imagenResta);
        const userInfo = await userCollection.where("uid", "==", doc.data().user).get();
        restaurants.push({...doc.data(), id: doc.id, userInfo: userInfo.docs.length > 0? userInfo.docs[0].data(): null});
        this.setState({enPreparacionArrays: restaurants})
      });
      if (querySnapshot.docs.length === 0) {
        this.setState({enPreparacionArrays: []})
      }
    });
    
  }

  coloresAfluResta(afluencia) {
    if (afluencia === 1) {
      return 'botAfluencia1'
    } else if (afluencia === 2) {
      return 'botAfluencia2'
    } else if (afluencia === 3) {
      return 'botAfluencia3'
    }
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
        return 'Aceptar Pedido';
      case 1:
        return 'Empezar Preparación';
      case 2:
        return 'Terminar Pedido';
      default: 
        return 'Pedido Terminado';
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

  cambiarAfluencia(olita) {
    this.setState({afluencia: olita}, () => {
      this.state.dbResta.doc("4jA0jtIdQeiLHKpDbVoI").set({
        afluencia: this.state.afluencia
      }, { merge: true });
      this.closeModal();
    })
  }

  render() {
    return (
      <div className="container" >
        <div className="menu">
          <div className="contLogoReady">
            <img className="imgLogoReady" src={logo}/>
          </div>
          <div className="contInfoRest">  
            <img src={this.state.imagenResta} alt="" className=""/>
            <div className="contNameRest">
              <h1 className="nameRest">El Sabor de Mi Tierra</h1>
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
            <div className={this.coloresAfluResta(this.state.afluencia)} onClick={() => this.openModal()}>
              <h3>AFLUENCIA</h3>
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
                  <div className="tipo" onClick={() => this.cambiarAfluencia(1)}>
                    <div className="uno"><img src={afluUno} alt="" className="aflu"/></div>
                    <h3>Muchas mesas libres</h3>
                  </div>
                  <div className="tipo" onClick={() => this.cambiarAfluencia(2)}>
                    <div className="dos"><img src={afluDos} alt="" className="aflu"/></div>
                    <h3>Pocas mesas libres</h3>
                  </div>
                  <div className="tipo" onClick={() => this.cambiarAfluencia(3)}>
                    <div className="tres"><img src={afluTres} alt="" className="aflu"/></div>
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
              <div className="contPedidos">
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

                          <div className="contBotSegui">
                            <div className="botSegui" onClick={() => this.nextStep(restaurant.id)}><h3>{this.pasoPedidoLetras(restaurant.seguimiento.pasoActual)}</h3></div>
                          </div>
                        </div>
                          
                      </div>
                    )
                })}
              </div>
            </div>
          </div >
        </div>
      </div>
    )
  }
}