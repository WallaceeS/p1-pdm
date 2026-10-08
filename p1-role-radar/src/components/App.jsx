import '../styles.css'
import Creditos from "./Creditos"
import Loading from "./Loading"
import React, { Component } from 'react'


export default class App extends Component {
    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null
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
  render() {
    const estiloSubtitulo = {margin: 'auto', fontSize: 16, color:'blue', textAlign:'center'}
    const obterAno = () => {
        const data = new Date()
        const anoAtual = data.getFullYear()
        return anoAtual
    }
    return (
      <div>
            <h1 className='titulo'>
                <i className="pi pi-map-marker" style={{ color: 'red'}}></i>
                RolêRadar
            </h1>
            <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
            <Creditos/>
            <div>
                {
                (this.state.mensagemDeErro) ? 
                    <p>{this.state.mensagemDeErro}</p> 
                :
                !this.state.latitude ?
                    <Loading mensagem='Aguardando permissão de localização...'/>
                :
                    <p>Localização obtida: {this.state.latitude}, {this.state.longitude}</p>

                }
            </div>
            <p>RolêRadar © {obterAno()}</p> 
            
           
        </div>
    )
  }


    
}




