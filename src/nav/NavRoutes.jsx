import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { AllSubPages, AllTabs, tabRoutes } from "./AllRoutes";
import Login from "../pages/Login";
import {useEffect, useState} from "react";
import Tab1 from "../pages/Tab1";

import sessionService from '../services/session.service';

//<Route path="/" component={ tabRoutes.filter(t => t.default)[0].component } exact={ true } />
//<Redirect exact from="/" to={ tabRoutes.filter(t => t.default)[0].path.toString() }/>
const NavRoutes = () => {
    const accessToken = sessionService.getToken();

    return (
        <IonReactRouter>
            <IonRouterOutlet id="main">
              <Route exact path="/" render={() => !accessToken ? <Redirect to="/login" /> : <Tab1/>} />
              <Route path="/login"><Login /></Route>
              <Route path="/tabs" render={ () => <AllTabs />} />
              <AllSubPages />

            </IonRouterOutlet>
        </IonReactRouter>
    );
}

export default NavRoutes;
