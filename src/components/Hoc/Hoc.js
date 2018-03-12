import React, {Component} from "react";
import T from 'prop-types'

function HocMaker(dataAsObject, dataAsFunction) {


    return function Hoc(Wrapped) {
        class Injector extends Component {
            state = {
            };
            render() {
                console.log(this.state);
                console.log(dataAsObject);
                console.log(dataAsFunction);
                return <Wrapped {...this.props} myStore={this.context.myStore}/>
            }
        }

        Injector.contextTypes = {
            myStore: T.object.isRequired,
        }
        return Injector
    };
}


export const myConnect = HocMaker;