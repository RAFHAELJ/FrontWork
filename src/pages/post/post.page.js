import React from 'react';
import clienteService from '../../services/cliente.service';
import './post.page.css'
import Options from './Options';
 
import {
useLocation,
useNavigate,
useParams,
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

class Post extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: null,
            nome: '',
            tipo: '',
            estado: null,
            categoria_id: null,
            Inicio: '',
            telefone: '',
            categorias: [],
            estados: []
        }
        this.loadCategorias();
        this.loadEstados();
        // Recuperando os id do cliente na url
        let clienteId = this.props.router.params.id
        if (clienteId){
            this.loadCliente(clienteId);
        }
    }
    
    // Função que recupera os dados do client caso seja uma edição
    loadCliente(clienteId){
        
        try {
                clienteService.show(clienteId)
                .then((res) => {
                    let cliente = res.data[0]
                    this.setState({
                        id: cliente.id,
                        nome: cliente.nome,
                        tipo: cliente.tipo,
                        estado: cliente.estado,
                        categoria_id: cliente.categoria_id,
                        Inicio: cliente.Inicio,
                        telefone: cliente.telefone,
                    });
                }
            )
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar os dados do cliente..")
        }
    }

    loadCategorias(){
        clienteService.listCategoria()
        .then((res) => {
            this.setState({categorias: res.data});
        });
    }

    loadEstados(){
        clienteService.listEstados()
        .then((res) => {
            this.setState({estados: res.data});
        });
    }

    // Função responsável por salvar o client
    sendPost(){
        
        // Reunindo dados
        let data = {
            nome : this.state.nome,
            tipo : this.state.tipo,
            estado : this.state.estado,
            categoria_id: this.state.categoria_id,
            Inicio: this.state.Inicio,
            telefone: this.state.telefone
        }

        // Realizando verificações
        if(!data.nome || data.nome === ''){
            alert("O nome é obrigatório!")
            return;
        }
        if(!data.estado || data.estado === ''){
            alert("Favor informar a UF")
            return;
        }
        
        // Caso seja uma edição, chamar o "edit" do serviço
        if(this.state.id){
            clienteService.edit(data, this.state.id)
            .then((data) => {
                alert("Cliente editado com sucesso!")
            })
            .catch((error) => {
                var errors = '';
                for(let i in error.response.data){
                    for(let ii in error.response.data[i]){
                        errors += error.response.data[i][ii];
                    }
                }
                alert("Erro ao editar cliente.\n" + errors)
            })
        }
        // Caso seja uma adição, chamar o "create" do serviço
        else{
            clienteService.create(data)
            .then((data) => {
                alert("Cliente criado com sucesso!")
            })
            .catch((error) => {
                var errors = '';
                for(let i in error.response.data){
                    for(let ii in error.response.data[i]){
                        errors += error.response.data[i][ii];
                    }
                }
                alert("Erro ao criar cliente.\n" + errors)
            })
        }
        this.props.router.navigate('/clientes')
    }

    changeVisibility()
    {
        this.setState({
            visibilidade:'block'
        })
    }
    
    render() {
        let title = this.state.id ? 'Alterar Cadastro' : 'Cadastrar';
        let desc = this.state.id ? 'Editar informações' : 'Formulário de criação de clientes';
        
        return (
            <div className="container">
                <div className="page-top">
                    <div className="page-top__title">
                        <h2>{title}</h2>
                        <p>{desc}</p>
                    </div>
                    <div className="page-top__aside">
                        <button className="btn btn-light" onClick={() => this.props.router.navigate('/clientes')}>
                            Cancelar
                        </button>
                        <button className="btn btn-primary" onClick={() => this.sendPost()}>
                            Salvar
                        </button>
                    </div>
                </div>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            value={this.state.nome}
                            onChange={e => this.setState({ nome: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="tipo">Tipo de Pessoa</label>
                        <select 
                            className="form-control" 
                            id="tipo"
                            value={this.state.tipo}
                            onChange={e => this.setState({ tipo: e.target.value })}
                        >
                            <option value="">Selecione</option>
                            <option value="Física">Física</option>
                            <option value="Jurídica">Jurídica</option>
                        </select>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">UF</label>
                        <select 
                            className="form-control" 
                            id="estado"
                            value={this.state.estado}
                            onChange={e => this.setState({ estado: e.target.value })}
                        >
                        <option value="">Selecione</option>
                        <Options 
                            func={this.loadEstados.bind(this)} 
                            data={this.state.estados} 
                        />
                        </select>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoria_id">Categoria</label>
                        <select 
                            className="form-control" 
                            id="category_id"
                            value={this.state.categoria_id}
                            onChange={e => this.setState({ categoria_id: e.target.value })}
                        >
                            <option value="">Selecione</option>
                        <Options 
                            func={this.loadCategorias.bind(this)} 
                            data={this.state.categorias} 
                        />
                        </select>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="tipo">{this.state.tipo === 'Física' ? 'Data de Nascimento' : 'Data de Fundação'}</label>
                        <input
                            type="date" 
                            className="form-control" 
                            id="Inicio"
                            value={this.state.Inicio}
                            onChange={e => this.setState({ Inicio: e.target.value })}
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefone">Telefones (Separar por ponto-e-vírgula)</label>
                        <input
                            type="text" 
                            className="form-control" 
                            id="telefone"
                            value={this.state.telefone}
                            onChange={e => this.setState({ telefone: e.target.value })}
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(Post);