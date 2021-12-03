import React from 'react';
import {Container, Row, Form, Col, Button} from 'react-bootstrap'
import { request } from '../../../helper/helper';
import Loading from '../../../loading/loading';
import MessagePrompt from '../../../prompts/message';
import ConfirmationPrompts from '../../../prompts/confirmation';


export default class EmpleadosEditar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            idEmpleado : this.props.getIdEmpleado(),
            rediret: false,
            confirmation:{
                title:'Modificar Thread',
                text:'Desea Modificar Thread?',
                show:false,
            },
            message :{
                text: '',
                show: false,
            },
            loading: false,
            thread:{
                nombre: '',
                descripcion: '',
                url: '',
            }
        };

        
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel= this.onCancel.bind(this);
    this.onConfirm=this.onConfirm.bind(this);

    }

    componentDidMount(){
        this.getThread();
    }

    getThread(){
        this.setState({loading: true});
        request
        .get(`/learnthreads/${this.state.idEmpleado}`)
        .then((response)=>{
        this.setState({
            thread:response.data,
            loading: false,
        });
    })
    .catch((err)=>{
        console.error(err);
        this.setState({loading: false});
    });
    }


    setValue(index, value) {
        this.setState({
            thread: {
                ...this.state.thread,
                [index] : value,
            },
        });
    }

    guardarThread(){
        this.setState({loading:true});

        request
        .put(`/learnthreads/${this.state.idEmpleado}`, this.state.thread)
        .then((response)=>{
            if(response.data.exito){
                /*this.props.changeTab('Buscar');*/
                this.setState({
                    rediret: response.data.exito,
                    message: {
                        text: response.data.msg,
                        show:true,
                    },
                }); 
            }
            this.setState({loading:false});
        })
        .catch((err)=>{
            console.error(err);
            this.setState({loading: true});
        });
    }

    onExitedMessage(){
        if(this.state.rediret) this.props.changeTab('Buscar');
    }

    onCancel(){
        this.setState({
            confirmation:{
                ...this.state.confirmation,
                show:false,
            }
        })
    }

    onConfirm(){
        this.setState(
            {
                confirmation: {
                    ...this.state.confirmation,
                    show: false,
                }
            },
            this.guardarThread()
        );
    }

    
    render() { 
        return ( 
            <Container id ="empleados-crear-container">
                
                <ConfirmationPrompts
                show={this.state.confirmation.show}
                title={this.state.confirmation.title}
                text={this.state.confirmation.text}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                />

                <MessagePrompt 
                text={this.state.message.text}
                show={this.state.message.show}
                duration={2500}
                onExited={this.onExitedMessage}
                />

                <Loading show={this.state.loading}/>

                <Row>
                    <h2> Editar Thread </h2>
                </Row>
                <Row>

                <Form id="empleado-label">
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2"> Titulo </Form.Label>
                                <Col sm="10">
                                <Form.Control  placeholder="Ingrese un titulo para el learn Thread" 
                                    value = { this.state.thread.nombre }
                                    onChange={(e)=> this.setValue('nombre', e.target.value) }
                                />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                Descripción
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control as="textarea" placeholder="Sobre que trata su learn Thread?" style={{ height: '100px' }}
                                    value = { this.state.thread.descripcion }
                                    onChange={(e)=> this.setValue('descripcion', e.target.value) }
                                />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2"> URL: </Form.Label>
                                <Col sm="10">
                                <Form.Control  placeholder="Ingrese la URL del learn Thread" 
                                    value = { this.state.thread.url }
                                    onChange={(e)=> this.setValue('url', e.target.value) }
                                />
                                </Col>
                            </Form.Group>
                    
                    <Button variant="primary" 
                    onClick={() => 
                        this.setState({
                            confirmation: {...this.state.confirmation, show: true},
                        })
                    }
                    >
                        Editar Thread
                    </Button>
                    </Form>

                </Row>

            </Container>
        );
    }
}

