import Cartao from './Cartao'

function formatarDistancia(distancia) {
    if (distancia < 1000){
        return `${Math.round(distancia)} m`
    }
    return `${(distancia / 1000).toFixed(1).replace(".",",")} km`
    
}

const Lugar = ({numero, nome, endereco, distancia}) => {
    const circuloColorido = {
        borderRadius: "50%",
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "purple",
        color: "white",
    }
  return (
    <Cartao cabecalho={formatarDistancia(distancia)}>
        <div style={circuloColorido}>
            {numero}
        </div>
        <div className='font-bold'>
            {nome ? nome: "Sem nome"}
        </div>
        <div>
            {endereco}
        </div>
    </Cartao>
  )
}

export default Lugar