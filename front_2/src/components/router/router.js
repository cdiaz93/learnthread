import React from "react";
import {BrowserRouter as Router, 
    Route,
    Switch,
} from "react-router-dom";

import Login from "../login/login"
import Registro from "../login/registro"
import PrivateRoute from '../auth/privateroute';
import Empleados from "../empleados/croud";


export default function AppRouter () {
    return(
        <Router>
            <Switch>
                <Route exact path={['/','/login']} component={Login}/>
                <PrivateRoute exact path={[ '/empleados' ]} component ={ Empleados }/>
                <Route exact path= {['/registro', '/login']} component={Registro}/>
                
                <Route
                path={"*"}
                component={() =>(
                    <h1 style ={{marginTop: 500}}>
                        404
                        <br />
                        PAGINA NO ENCONTRADA
                    </h1>
                )}/>

            </Switch>
        </Router>
    )
}
