import React from 'react';
import axios from 'axios'; //conecta el back
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {APIHOST as host } from '../../app.json'
import'./login.css';
import { isNull } from 'util';
import Cookies from 'universal-cookie'
import {calculaEspiracionSesion} from '../helper/helper';

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
        };
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

                    <Row id="titulo-Login">
                        <Col>
                        <h2> Iniciar Sesion </h2>
                        <p> Ingrese sus datos de cuenta para continuar. </p> 
                        </Col>

                    </Row>
                    {/*<Row>
                        <Col
                        sm="12"
                        xs="12"
                        md={{span:4, offset:4}}
                        lg={{span:4, offset: 4}}
                        xl={{span:4, offset: 4}}
                    >*/}

                
                <hr/>
                
                <Form>    
                    <Form.Group className="mt-5 mb-3">
                        <Form.Label >Ingrese su usuario</Form.Label>
                        <Form.Control 
                        onChange={(e)=>
                            this.setState({usuario: e.target.value})
                        }
                        />

                    </Form.Group>

                    <Form.Group className="mt-4 mb-5">
                        <Form.Label >Ingrese su contraseña</Form.Label>
                        <Form.Control type="password" placeholder="*****"
                        onChange={(e)=>
                            this.setState({pass: e.target.value})
                        } 
                        />
                        
                    </Form.Group>
            
                    <Button 
                    variant="outline-info" 
                        onClick={()=>{
                            this.iniciarSesion();
                        }}
                        >
                    Iniciar Sesion
                    </Button> 
                </Form> 

                <Row id="login-options"> 
                            <span> No tiene una cuenta?  - <a href="/registro"> Registrese  </a></span>
                        </Row>

                </Col>
                </Row>
                {/*</Col>
                //</Row>*/}
            </Container>
        );
    }
}






