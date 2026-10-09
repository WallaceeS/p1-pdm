import '../styles.css'
import Creditos from "./Creditos"
import Cartao from "./Cartao"
import Loading from "./Loading"
import MeuPonto from './MeuPonto'
import React, { Component } from 'react'
import geoapifyClient from '../utils/geoapifyClient'
import Busca from "./Busca"
import ListaLugares from "./ListaLugares"

export default class App extends Component {
    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null,
        lugares: null
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
                lugares: result.data.features
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
                <>  
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
                </>           
                }
                </div>
                <div className='col-12 md:col-6'>
                    {
                        this.state.lugares === null ?
                            null
                        :
                        this.state.lugares.length === 0 ?
                            <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
                        :
                            <ListaLugares lugares={this.state.lugares}/>



                    }

                </div>
                
            </div>
            
            <p>RolêRadar © {obterAno()}</p> 
            
           
        </div>
    )
  }


    
}




