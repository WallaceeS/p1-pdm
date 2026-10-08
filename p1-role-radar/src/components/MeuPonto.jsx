import React, { Component } from 'react'
import { GEOAPIFY_KEY } from '../utils/chaves.js'
import {Button} from '@primereact/ui/button'

export default class MeuPonto extends Component {
    state = {
        agora: Date.now()
    }

    tempo = null

    componentDidMount(){
        this.tempo = setInterval(() => {
            this.setState({
                agora: Date.now()

            })
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.tempo)
        console.log('MeuPonto removido')
    }

    

  render() {
    const segundosPassados = Math.floor((this.state.agora - this.props.horarioLocalizacao) / 1000) 
    const url = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${this.props.longitude},${this.props.latitude}&zoom=16&marker=lonlat:${this.props.longitude},${this.props.latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`
    
    return (
      <div>
        <img
            alt='Mapa da sua localização'
            style={{width: "100%"}}
            src={url}
        >
        </img> 
        <p>
            Latitude: {this.props.latitude.toFixed(4) } | Longitude: {this.props.longitude.toFixed(4)}
        </p>
        <p>{this.props.latitude < 0 ? 'Hemisfério Sul' : 'Hemisfério Norte'}</p>
        <p>
            Localização obtida há {segundosPassados} s
        </p>  
        <Button rounded style={{backgroundColor: 'lightgrey', borderColor:'purple', color:'purple'}} onClick={this.props.onAtualizar}>
            <i className='pi pi-refresh'></i>
            
            Atualizar localização
        </Button>
      </div>
    )
  }
}
