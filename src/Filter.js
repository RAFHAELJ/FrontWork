import React from 'react';
import MaterialIcon from 'react-google-material-icons';
import './App.css'
 
import {
useLocation,
useNavigate,
useParams
} from "react-router-dom";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
        <Component
            {...props}
            router={{ location, navigate, params }}
        />
        );
    }

    return ComponentWithRouterProp;
}

class Filter extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            filter: null,
            filter_type: null
        }
    }

    render(){
        return (
            
            <div className="container">
                <form className="form-filter" onSubmit={e => e.preventDefault()}>
                    <label htmlFor="filter">Filtrar: </label>
                    <input
                        type="text"
                        className="form-input"
                        id="filter"
                        onChange={e => this.setState({ filter: e.target.value })} />
                    <select 
                        className="form-input" 
                        id="filter_type"
                        onChange={e => this.setState({ filter_type: e.target.value })}
                    >
                        <option value="">Filtrar Por</option>
                        <option value="client">Cliente</option>
                        <option value="state">UF</option>
                        <option value="category">Categoria</option>
                    </select>
                    
                    <button type="button" className="btn btn-primary btn-sm" 
                        onClick={(e) => {
                            if (this.state.filter !== null && this.state.filter_type !== null){
                                this.props.router.navigate('../clients?filter=' + this.state.filter + '&type=' + this.state.filter_type, {replace: false})
                            }
                            else {
                                alert('A string de busca e o seu tipo devem ser informados');
                            }
                        }}>
                        <MaterialIcon icon="search" size={20}/>
                    </button>
                        

                </form>
            </div>
        )
    }
}

export default withRouter(Filter);
