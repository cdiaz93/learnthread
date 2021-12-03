import React from "react";
import { Container, Row, Form, Col, Button} from "react-bootstrap";
import Menu from '../../navbar/navbar';
// import './learnThread.css';

import axios from "axios";
import {APIHOST as host} from '../../../app.json'
import {isNull} from 'util';
import Cookies from 'universal-cookie';


import Loading from '../../loading/loading';
import { request } from '../../helper/helper';
import MessagePrompt from '../../prompts/message';

const cookies = new Cookies();
 
export default class LearnThreadCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false,

            rediret:false,

            message:{
                text: "",
                show: false,
            },

            learnThreadNombre:'',
            learnThreadDescripcion:'',
            learnThreadUrl: '',

        };

        this.onExitedMessage =this.onExitedMessage.bind(this);
    }

    setValue(index, value){
        this.setState({
            Empleados:{
                 ...this.state.Empleados,
                 [index]: value,
            },
        });

    }

    guardarHilo(){

        this.setState({loading: true});

        request
        .post('/learnthreads', {
            nombre :                this.state.learnThreadNombre,
            descripcion:            this.state.learnThreadDescripcion,
            url:                    this.state.learnThreadUrl,
            fecha_creacion:         Date().toLocaleString(),
            fecha_actualizacion:    Date().toLocaleString(),
        })
        .then((response) =>{

            if(response.data.exito){
                this.setState({
                    rediret:response.data.exito,
                    message: {
                        text: response.data.msg,
                        show: true,
                    },
                })
            }
            
            this.setState({loading: false});
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err);
            this.setState({loading: true});
        })
    }

    onExitedMessage(){
        if(this.state.rediret) this.props.changeTab('Buscar');
    }

    render() { 
        return ( 
            <>
            <Container id="learn-container">
                
                <MessagePrompt 
                    text={this.state.message.text}
                    show={this.state.message.show}
                    duration={2500}
                    onExited={this.onExitedMessage}
                />

                <Loading show={this.state.loading} />

                <Menu/>

                <Row className="m-5">
                    <h2> Crear un nuevo Learn Thread</h2>
                </Row>


                <Row>

                    <Col>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2"> Titulo </Form.Label>
                                <Col sm="10">
                                <Form.Control  placeholder="Ingrese un titulo para el learn Thread" 
                                    onChange={(e)=> this.setState({learnThreadNombre: e.target.value}) }
                                />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                Descripción
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control as="textarea" placeholder="Sobre que trata su learn Thread?" style={{ height: '100px' }}
                                    onChange={(e)=> this.setState({learnThreadDescripcion: e.target.value}) }
                                />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2"> URL: </Form.Label>
                                <Col sm="10">
                                <Form.Control  placeholder="Ingrese la URL del learn Thread" 
                                    onChange={(e)=> this.setState({learnThreadUrl: e.target.value}) }
                                />
                                </Col>
                            </Form.Group>

                            <Row className="mt-5">
                            {/* <Col  
                                sm={2}  
                                xs={2} 
                                md={{span:2, offset:0}} 
                                lg={{span:2, offset:0}} 
                                xl={{span:2, offset:0}}
                            > 
                                <Button variant="danger" href="/dashboard"> <b> Cancelar </b>  </Button> 
                            </Col> */}
                            <Col  
                                sm={4}  
                                xs={4} 
                                md={{span:4, offset:0}} 
                                lg={{span:4, offset:0}} 
                                xl={{span:4, offset:0}}
                            > 
                                <Button variant="primary" onClick={()=>{ this.guardarHilo(); }}> <b> Guardar </b>  </Button> 
                            </Col>
                            </Row>
                           
                        </Form>
                    </Col>
                  
                </Row>
            </Container>
            </>
         );
    }
}
