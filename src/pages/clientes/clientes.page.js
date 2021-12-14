import React from 'react';
import { Link } from 'react-router-dom';
import clienteService from '../../services/cliente.service';
import MaterialIcon from 'react-google-material-icons';
import './clientes.page.css';
 
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

class Clientes extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            clientes: []
        }
    }

    componentDidMount() {
        this.loadClientes()
    }

    async loadClientes() {
        try {
            let search = this.props.router.location.search;
            let res = await clienteService.list(search);
            this.setState({clientes: res.data});
        }
        catch (error) {
            console.log(error);
            alert('Não foi possível listar os clientes');
        }
    }
    render() {
        return (
            <div className="container">
                <div className="page-top">
                    <div className="page-top__title">
                        <h1>Listagem dos Clientes</h1>
                    </div>
                    <div className="page-top__aside">
                        <button className="btn btn-primary" onClick={() => this.props.router.navigate('/new')}>
                            Adicionar
                        </button>
                    </div>
                </div>

                {/* Percorrendo o array de clients do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do client específico */}
                {this.state.clientes.map(cliente => (
                    <Link to={"/Cliente/" + cliente.id} key={cliente.id}>
                        <div classNome="client-card">
                            <div classNome="client-card__text">
                                <h4>{cliente.nome}</h4>
                                <p>{cliente.tipo} - {cliente.estado}</p>
                            </div>
                            <div className="client-card__icon">
                                <MaterialIcon icon="edit" size={36}/>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        )
    }
}

export default withRouter(Clientes);