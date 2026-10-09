import '../styles.css'
import Creditos from "./Creditos"
import Cartao from "./Cartao"
import Loading from "./Loading"
import MeuPonto from './MeuPonto'
import React, { Component } from 'react'
import geoapifyClient from '../utils/geoapifyClient'
import Busca from "./Busca"
import ListaLugares from "./ListaLugares"
import MapaRadar from './MapaRadar'

export default class App extends Component {
    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null,
        lugares: null,
        buscando: false,
        erroBusca: null,
        raioBuscado: null
    }

    obterLocalizacao=()=>{
        window.navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                horarioLocalizacao: Date.now(),
                mensagemDeErro: null
                })
            },
        (erro) =>{
            console.log(erro)
            this.setState({
                    mensagemDeErro: 'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.'
                })
            }
        )
    }

    componentDidMount(){
        this.obterLocalizacao()
    }

    onBuscaRealizada=(categoria,raio)=>{
        this.setState({
            buscando: true,
            erroBusca: null,
            raioBuscado: raio
        })
        geoapifyClient.get('/places',{
            params: {
                categories: categoria,
                filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
                bias: `proximity:${this.state.longitude},${this.state.latitude}`,
                limit: 20
            }
        })
        .then((result) => {
            this.setState({
                lugares: result.data.features,
                buscando: false
            })
        })
        .catch((erro) => {
            console.log(erro)
            this.setState({
                buscando: false,
                erroBusca: "Não foi possível consultar os lugares. Tente novamente."
            })


        })
        
    }


  render() {
    const estiloSubtitulo = {margin: 'auto', fontSize: 16, color:'blue', textAlign:'center'}
    const obterAno = () => {
        const data = new Date()
        const anoAtual = data.getFullYear()
        return anoAtual
    }
    return (
      <div >
            <h1 className='titulo'>
                <i className="pi pi-map-marker" style={{ color: 'red'}}></i>
                RolêRadar
            </h1>
            <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
            <Creditos/>

            <div className='grid'>
                <div className='col-12 md:col-6'>
                    {
                (this.state.mensagemDeErro) ? 
                    <p>{this.state.mensagemDeErro}</p> 
                :
                !this.state.latitude ?
                    <Loading mensagem='Aguardando permissão de localização...'/>
                :
                <div>  
                    <Cartao cabecalho='Você está aqui'>
                        <MeuPonto
                            latitude = {this.state.latitude}
                            longitude = {this.state.longitude}
                            horarioLocalizacao = {this.state.horarioLocalizacao}
                            onAtualizar = {this.obterLocalizacao}
                        />
                    </Cartao>
                    <Cartao cabecalho="O que você procura?">
                        <Busca onBuscaRealizada={this.onBuscaRealizada}/>
                    </Cartao>
                </div>           
                }
                </div>
                <div className='col-12 md:col-6'>
                    {
                        this.state.buscando ?
                            <Loading mensagem='Procurando lugares...'/>
                        :
                        this.state.erroBusca ?
                            <p>
                                {this.state.erroBusca}
                            </p>
                        :
                        this.state.lugares === null ?
                            null
                        :
                        this.state.lugares.length === 0 ?
                            <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
                        :
                        <div>
                            <p className="font-bold">
                                {this.state.lugares.length} {this.state.lugares.length === 1 ? "lugar encontrado" : "lugares encontrados"} em até {this.state.raioBuscado} m
                            </p>
                            <Cartao cabecalho='Radar'>
                                <MapaRadar
                                    latitude={this.state.latitude}
                                    longitude={this.state.longitude}
                                    lugares={this.state.lugares}
                                />
                            </Cartao>
                            <ListaLugares lugares={this.state.lugares}/>
                        </div>



                    }

                </div>
                
            </div>
            
            <p>RolêRadar © {obterAno()}</p> 
            
           
        </div>
    )
  }


    
}




