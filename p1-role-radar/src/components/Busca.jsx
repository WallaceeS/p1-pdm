import React, { Component } from 'react'
import { Button } from '@primereact/ui/button'
import { InputText } from '@primereact/ui/inputtext'

export default class Busca extends Component {
    state = {
        categoria: null,
        raio: '1000',
        erro: null
    }
    onRaioAlterado = (evento) => {
        this.setState({ raio: evento.target.value })
    }

    categorias = [{ rotulo: 'Cafés', chave: 'catering.cafe' },
    { rotulo: 'Restaurantes', chave: 'catering.restaurant' },
    { rotulo: 'Parques', chave: 'leisure.park' },
    { rotulo: 'Farmácias', chave: 'healthcare.pharmacy' },
    { rotulo: 'Supermercados', chave: 'commercial.supermarket' },
    { rotulo: 'Museus', chave: 'entertainment.museum' }
    ]
    onFormSubmit = (evento) => {
        evento.preventDefault()
        const raio = Number(this.state.raio)
        if (!this.state.categoria){
            this.setState({erro: 'Escolha uma categoria.'})
        }

        else if(!Number.isInteger(raio) || raio < 100 || raio > 5000){
            this.setState({erro: "Informe um raio inteiro entre 100 e 5000 metros."})
        }
        else{
            this.setState({
                erro: null
                
            })
            this.props.onBuscaRealizada(this.state.categoria, raio)
        }

    }
    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="flex flex-wrap gap-2">
                    {this.categorias.map((categoria) =>
                        <Button
                            key={categoria.chave}
                            type="button"
                            rounded style={{ backgroundColor: this.state.categoria === categoria.chave ? 'purple' : 'lightgrey', borderColor: 'purple', color: this.state.categoria === categoria.chave ? 'black' : 'purple' }}
                            onClick={() => this.setState({ categoria: categoria.chave })}

                        >
                            {categoria.rotulo}

                        </Button>


                    )}
                    <InputText
                        value={this.state.raio}
                        pt-root-onChange={this.onRaioAlterado}
                        className="w-full"
                        placeholder={this.props.dica}

                    />
                </div>
                <Button type='submit'>
                    <i className='pi pi-search'></i>
                    Buscar
                </Button>
                {this.state.erro ? <p style={{color: "red"}}>{this.state.erro}</p>: null}
            </form>
        )
    }
}

Busca.defaultProps = {
    dica: 'Raio em metros (100 a 5000)'
}