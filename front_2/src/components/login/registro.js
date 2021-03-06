//Atajo tecaldo: imr
import React from 'react';
import { Container, Form, Button, Col, Row, Image } from 'react-bootstrap';
import './login.css';
import axios from 'axios';
import {APIHOST as host} from '../../app.json'

// imagen de portada para login 
import image1 from '../public/imag/loginBanner.png';

//Atajo tecaldo: ccc
export default class registro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            user: '',
            email:'',
            pass:'',
            birthDate:'',

        }
    }

    register(){

        axios.post(`${host}/usuarios`,{
            usuario :           this.state.user,
            pass:               this.state.pass,
            correo:             this.state.email,
            fecha_nacimiento:   this.state.birthDate,
        })
        .then((response) => {
            console.log(response);
            var data = response.data;
            console.log(data.token);
    
            // this.props.history.push('/');
            this.props.changeTab('login');
            // this.setState( {loading:false} );
        })
        .catch((err) =>{
            console.log(err);
            // this.setState( {loading:false} );
        });


        // alert(`
        //     -usuario:${this.state.user} 
        //     - email: ${this.state.pass}
        //     - contraseña: ${this.state.email}
        //     - fecha Nacimiento: ${this.state.birthDate}`
        
        // );
    }


    render() { 
        return (  
            <Container id="login-container">



                <Row>   


                        <Row id="titulo-Login">
                            <Col>
                                <h2> Cree una nueva cuenta </h2>
                                <p> Ingrese los siguientes datos para registrarse </p> 
                            </Col>
                        </Row> 
                        <hr/>
                        <Form>

                            <Form.Group className="mt-2 mb-3">
                                <Form.Label> Nombres  </Form.Label>
                                <Form.Control type="email" placeholder="Ingrese su nombre" rounded  
                                    onChange={(e)=>
                                        this.setState({user: e.target.value})
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mt-4">
                                <Form.Label> Email </Form.Label>
                                <Form.Control type="email" placeholder="ejemplo@dominio.com" rounded  
                                    onChange={(e)=>
                                        this.setState({email: e.target.value})
                                    }
                                />
                            </Form.Group>
                            
                            <Form.Group className="mt-4">
                                <Form.Label>Contraseña </Form.Label>
                                <Form.Control type="password" placeholder="*****"
                                    onChange={(e)=>
                                        this.setState({pass: e.target.value})
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mt-4">
                                <Form.Label> Fecha de nacimiento  </Form.Label>
                                <Form.Control type="date"   
                                    onChange={(e)=>
                                        this.setState({birthDate: e.target.value})
                                    }
                                />
                            </Form.Group>

                            <Button className="mt-5" variant="outline-info" onClick={()=>{ this.register(); }} > 
                                Registrarse
                            </Button>
                        </Form>

                    <Col>
                    </Col>
                </Row>


            </Container>
        );
    }
}