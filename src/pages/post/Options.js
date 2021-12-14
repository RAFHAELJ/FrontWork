import React, {Component} from 'react';

export default class Options extends Component{

    handleChange(e){
        e.preventDefault();
        const Valor=e.target.value;
        this.props.func(Valor);
        if(this.props.func2 != null){
            this.props.func2();
        }
    }

    render(){
        if (this.props.data === undefined){
            return (<option value="">Sem dados para apresentar</option>);
        }
        return(
            this.props.data.map(
                row=><option value={row.value}>{row.opt}</option>
            )
            
        );
    }

}