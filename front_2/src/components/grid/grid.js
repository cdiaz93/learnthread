import React from 'react';
import ConfirmationPrompts from '../prompts/confirmation';
import {request} from '../helper/helper';
import {Card,CardBody,CardTitle} from 'reactstrap';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import {Col, Button} from 'react-bootstrap';
//import './empleados.css';

import Loading from '../loading/loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import {isUndefined} from 'util';
import MessagePrompt from '../prompts/message';

export default class DataGrid  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idEmpleado:null,
            Loading:false,
            rows: [],
            confirmation:{
                title:'Eliminar Thread',
                text:'Desea Eliminar Thread?',
                show:false,
            },
            message :{
                text: '',
                show: false,
            },
        };

        if(this.props.showEditButton && !this.existsColumn('Editar'))
        this.props.columns.push(this.getEditButton());

        if(this.props.showDeleteButton && !this.existsColumn('Eliminar'))
        this.props.columns.push(this.getDeleteButton());

        this.onCancel= this.onCancel.bind(this);
        this.onConfirm=this.onConfirm.bind(this);
            
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        this.setState({loading: true});
        request
        .get(this.props.url)
        .then((response)=>{
            this.setState({rows: response.data,
            loading: false,})
        })
        .catch((err)=>{
            this.setState({loading: false})
            console.error(err);
        });
    }


    existsColumn(colText){
        let col = this.props.columns.find((column) => column.text === colText);
        return !isUndefined(col);
    }

    getEditButton (){
        return{
            text:'Editar',
            formatter: (cell, row) =>{

                return (
                    <Button onClick ={()=> this.props.onClickEditButton(row)}>
                    <FontAwesomeIcon icon ={faEdit}/>
                    </Button>
                );
            },
        };
    }

    getDeleteButton(){
        return{
            text: 'Eliminar',
            formatter:(cell, row) =>{
                return(
                    <Button onClick={()=> this.props.onClickDeleteButton(row)}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                );
            },
        };
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
        
        const options = {
            custom: true,
            totalSize: this.state.rows.length
        };

        return ( 
            <>
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

            {this.state.rows.map((thread, i) => {
                return (
                  <Col>
                      <Card>
                          <CardBody>
                              <CardTitle tag="h5">{thread.nombre}</CardTitle>
                              <TwitterTweetEmbed
                                tweetId={thread.url}
                              />
                              
                              <Button
                              onClick={() => 
                                this.setState({
                                    idEmpleado: thread._id,
                                    confirmation: {...this.state.confirmation, show: true},
                                })}>
                                Eliminar Thread 
                            </Button>
                            <Button
                              onClick={()=> this.props.onClickEditButton(thread)}>
                                Editar Thread 
                            </Button>
                          </CardBody>
                      </Card>
                  </Col>
                )
            })}
            </>
        );
    }
}


