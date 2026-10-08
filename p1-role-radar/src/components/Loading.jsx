import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div className='grid justify-content-center m-auto' style={{fontSize:'2rem'}}>
        <i className='pi pi-spin pi-spinner'></i>
        <div>
            {this.props.mensagem}
        </div>
      
      </div>
    )
  }
}
Loading.defaultProps = {
  mensagem: "Carregando..."
}