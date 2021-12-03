import React from 'react';
import {Container, Row} from 'react-bootstrap';
//import './empleados.css';
import DataGrid from '../../../grid/grid';
import { request } from '../../../helper/helper';
import Menu from '../../../navbar/navbar';
import ConfirmationPrompts from '../../../prompts/confirmation';
import Loading from '../../../loading/loading';
import MessagePrompt from '../../../prompts/message';

const columns = [{
    dataField: '_id',
    text: 'ID',
    hidden: true,
}, {
    dataField: 'nombre',
    text: 'Nombre'
}, {
    dataField: 'apellido_p',
    text: 'Primer apellido'
}, {
    dataField: 'apellido_m',
    text: 'Segundo apellido'
}, {
    dataField: 'telefono',
    text: 'Telefono'
}, {
    dataField: 'mail',
    text: 'Corre Electronico'
}, {
    dataField: 'direccion',
    text: 'Direccion'
},

];

export default class EmpleadosBuscar  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        loading:false,
        idEmpleado:null,
        confirmation:{
            title: 'Eliminar el Empleado',
            text: 'Deseas eliminar el empleado',
            show: false,
        },
        message:{
            text:'',
            show: false,
        }

        };

        this.onClickEditButton= this.onClickEditButton.bind(this);
        this.onClickDeleteButton= this.onClickDeleteButton.bind(this);
        this.onCancel= this.onCancel.bind(this);
        this.onConfirm= this.onConfirm.bind(this);
    }

    componentDidMount(){
    }

    onClickEditButton(row){
        this.props.setIdEmpleado(row._id);
        this.props.changeTab('Editar');
    }

    onClickDeleteButton(row){

        this.setState({
            idEmpleado: row._id,
            confirmation:{
                ...this.state.confirmation,
                show: true,
            },
        }) 
    }

    onCancel(){
        
        this.setState({
            confirmation:{
                ...this.state.confirmation,
                show: false,
            },
        });
    }

    onConfirm(){
        this.setState(
            {
                confirmation:{
                    ...this.state.confirmation,
                    show:false,
                },
            },
            this.eliminarThread()
        );
    }

    eliminarThread(){
        this.setState({loading:true});
        request
        .delete(`/learnthreads/${this.state.idEmpleado}`)
        .then((response)=>{
            this.setState({
                loading:false,
                message:{
                    text: response.data.msg,
                    show:true,
                },
            });
            if(response.data.exito) this.reloadPage();
        })
        .catch((err)=>{
            console.error(err);
            this.setState({loading:false});
        });

    }

    reloadPage(){
        setTimeout(()=>{
            window.location.reload();
        },2500);
    }

    render() {         
        return(


            <Container id= "empleados-buscar-container">
            
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
            
            <Menu/>

                

                <Row>
                    <h2>LEARNTHREAD</h2>
                </Row>
                <Row>
                    <DataGrid url="/learnthreads" columns={columns}
                    showEditButton = {true}
                    showDeleteButton= {true}
                    onClickEditButton={this.onClickEditButton} 
                    onClickDeleteButton={this.onClickDeleteButton}
                    />
                </Row>

            </Container>
        );

    }
}

