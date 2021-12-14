import axios from 'axios';

// Armazenando o endereço da API
const apiUrl = "http://localhost:8000/api"

const clienteService = {

    //  lista os clientes 
    async list(search = ''){
        const enpoint = apiUrl + "/clientes" + search
        return axios.get(enpoint)
    },

    //  recuperar dados de um cliente específico
    async show(clienteId){
       // die(clienteId);
        const enpoint = apiUrl + "/clientes/" + clienteId
        return axios.get(enpoint)
    },

    // cria um novo cliente
    async create(data){
        const enpoint = apiUrl + "/clientes"
        return axios.post(enpoint, data)
    },

    // edita um cliente específico
    async edit(data, clienteId){
        const enpoint = apiUrl + "/clientes/" + clienteId
        return axios.put(enpoint, data)
    },

    // Função para exluir um cliente específico
    async delete(clienteId){
        const enpoint = apiUrl + "/clientes/" + clienteId
        return axios.delete(enpoint)
    },

    // Função para listar os estados 
    async listEstados(){
        const enpoint = apiUrl + "/estados"
        return axios.get(enpoint)
    },

    // Função para listar a categoria 
    async listCategoria(){
        const enpoint = apiUrl + "/categorias"
        return axios.get(enpoint)
    },


}

export default clienteService;