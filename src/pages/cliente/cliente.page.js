 import React from 'react';
 import clienteService from '../../services/cliente.service';
 import moment from 'moment';
 import './cliente.page.css';
 
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

 class Cliente extends React.Component {
     constructor(props) {
        super(props)
        this.state = {
            cliente: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        // Recuperando os id do cliente na url
        let clienteId = this.props.router.params.id
        // Chamando a função que carrega os dados do client
        this.loadCliente(clienteId)
    }

    // Função que carrega os dados do cliente e salva no state
    async loadCliente(clienteId) {
        try {
            let res = await clienteService.show(clienteId)
            this.setState({ cliente: res.data[0] })
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar cliente.")
        }
    }

    // Função que exclui o cliente, chamada ao clicar no botão "Excluir"
    async deleteCliente(clienteId) {
        
        if (!window.confirm("Deseja realmente excluir este cliente?")) return;

        try {
            await clienteService.delete(clienteId)
            alert("Cliente excluído com sucesso")
            this.props.router.navigate('/clientes')
        } catch (error) {
            console.log(error);
            alert("Não foi excluir o client.")
        }

    }

    render() {
        return (
            <div className="container">

                <div className="page-top">
                    <div className="page-top__title">
                        <h2>Cliente</h2>
                        <p>Dados do cliente</p>
                    </div>
                    <div className="page-top__aside">
                        <button className="btn btn-light" onClick={() => this.props.router.navigate('/clientes')}>
                            Voltar
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="client-info">
                            <h4>ID</h4>
                            <p>{this.state.cliente?.id}</p>
                        </div>
                        <div className="client-info">
                            <div>Nome</div>
                            <div>{this.state.cliente?.nome}</div>
                        </div>
                        <div className="client-info">
                            <div>Tipo de Pessoa</div>
                            <div>{this.state.cliente?.tipo}</div>
                        </div>
                        <div className="client-info">
                            <div>UF</div>
                            <div>{this.state.cliente?.estado}</div>
                        </div>
                        <div className="client-info">
                            <div>Categoria</div>
                            <div>{this.state.cliente?.categorias.nome}</div>
                        </div>
                        <div className="client-info">
                            <div>{this.state.cliente?.tipo === 'Física' ? 'Data Nascimento' : 'Data Fundação'}</div>
                            <div>{moment(this.state.cliente?.Inicio).format('DD/MM/YYYY')}</div>
                        </div>
                        <div className="client-info">
                            <div>Telefones</div>
                            <div>{this.state.cliente?.telefone}</div>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => this.deleteCliente(this.state.cliente.id)}>
                                Excluir
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => this.props.router.navigate('/edit/' + this.state.cliente.id)}>
                                Editar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
 }

 export default withRouter(Cliente);