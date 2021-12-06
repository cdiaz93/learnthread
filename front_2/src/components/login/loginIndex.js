import React from 'react';
import axios from 'axios'; //conecta el back
import { Container, Form, Button, Row, Col, Nav } from 'react-bootstrap';
import {APIHOST as host } from '../../app.json'
import'./login.css';
import { isNull } from 'util';
import Cookies from 'universal-cookie'
import {calculaEspiracionSesion} from '../helper/helper';
import Fregistro from './registro';
import Lregistro from './login';


//imagen para login
import image1 from '../public/imag/loginBanner.png'

import Loading from '../loading/loading';



const cookies = new Cookies();

export default class login  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            usuario:'',
            pass:'',
            currentTab: 'login'
        };

        this.vistaRegistro = this.vistaRegistro.bind(this);
    }
    iniciarSesion(){

        this.setState({ loading: true}); //llama el cirulo de carga

        axios.post(`${host}/usuarios/login`, {
            usuario: this.state.usuario,
            pass: this.state.pass,
        })
        .then((response) => {
            if(isNull(response.data.token)){
                alert('usuario y/o contraseña invalida');
            } else {
                cookies.set('_s', response.data.token, {
                    path:'/',
                    expires: calculaEspiracionSesion(),
                });

                this.props.history.push('/empleados');
            }
            
            this.setState({ loading: false});
        })
        .catch((err) =>{
            console.log(err);
            this.setState({ loading: false});
        } );

    }

    vistaRegistro(){
        this.setState({ currentTab: 'registro'});
    }

    render() { 
        return ( 


            <Container id="login-container" >

                <Loading show={this.state.loading}/>

                <Row>
                
                    <Col sm={12}  
                        xs={12} 
                        md={{span:4, offset:0}} 
                        lg={{span:6, offset:0}} 
                        xl={{span:6, offset:0}}>
                        <img src={ image1 } fluid />
                    </Col>
                    <Col
                        sm={12}  
                        xs={12} 
                        md={{span:4, offset:2}} 
                        lg={{span:5, offset:1}} 
                        xl={{span:5, offset:1}}
                    >
                
                        <Row className="pb-2">
                            <Nav fill variant="tabs" 
                            defaultActiveKey="Buscar"
                            onSelect={(eventKey) =>
                            this.setState({currentTab: eventKey})}
                            >
                            <Nav.Item>
                                <Nav.Link eventKey="login">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="registro">Nueva cuenta </Nav.Link>
                            </Nav.Item>
                            </Nav>
                        </Row>

                        <div>
                        {
                            this.state.currentTab === 'login' ? (
                                <Lregistro changeTab={this.changeTab}/>
                                
                            ) : this.state.currentTab =='registro' ? (
                                <Fregistro changeTab={this.changeTab}/>
                                
                            ):(
                                <h1>No encontrada</h1>
                            )
                        }
                        </div>
                    </Col>
                </Row>
            </Container>

        );
    }
}






