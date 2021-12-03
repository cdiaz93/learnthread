import React from 'react';
import {Spinner}  from 'react-bootstrap';
import './loading.css';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading:false,
            show: props.show
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.show !== this.state.show)
        this.setState({show: nextProps.show}); //funcion para que aparezca el circulo
    }

    render() { 
        return (
            <>
            {this.state.show ? (
            <div id="loading-backdrop">
                <Spinner animation="border" variant="primary" />
            </div>
            ) :null}
            </>

        );
    }
}
 
