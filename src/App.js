import React from 'react';
import firebase from './Firestore';
import axios from 'axios';
import { Line } from 'rc-progress';
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
    }
  }
 
  componentDidMount () {
    const db = firebase.collection('enPreparacion');
    const userCollection = firebase.collection('userGustos');
    db.where("restaurante", "==", "El Retiro").onSnapshot((querySnapshot) => {
      var restaurants = [];
      
      querySnapshot.forEach(async (doc) => {
        console.log(doc.data().user);
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
    return (
      <div className="container" >
        <div className="menu">
          <div className="contLogoReady">
            <img className="imgLogoReady" src={logo}/>
          </div>
          <div className="contInfoRest">  
            <img src={imaResta} alt=""/>
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
            <div className="contTitListPedidos">
              <h3>Lista de Pedidos</h3>
            </div>
            <div className="rayita"></div>
            {this.state.enPreparacionArrays.map((restaurant, index) => {
                return (
                  <div className="contTarjePedido">
                    <div className="boxUno">
                      <img className="imgCliente" src={cliente} alt=""/>
                    </div>
                    <div className="boxDos">
                      <p className="nameCliente">Cliente:  <b>{restaurant.userInfo.nameUser}</b></p>
                      <p className="numOrden">Número de Orden: <b>{Math.floor(Math.random()*1000)}</b></p>
                      <p className="pedido">Orden: <b>{restaurant.pedidoDetails}</b></p>
                    </div>
                    <div className="boxTres">
                     <div>
                        <Line className="progressBar" percent="50" strokeWidth="8" strokeColor="#B1122A"
                        trailColor= "#d9d9d9"
                        trailWidth="8" 
                        strokeLinecap="round"
                        />
                      </div>
                      <p>paso actual {restaurant.seguimiento.pasoActual}</p>
                      <div className="contBotSegui">
                        <div className="botSegui" onClick={() => this.nextStep(restaurant.id)}><h3>siguiente</h3></div>
                      </div>
                    </div>
                      
                  </div>
                )
            })}
          </div>
        </div>
      </div>
    )
  }
}