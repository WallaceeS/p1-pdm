import Lugar from './Lugar'

const ListaLugares = ({lugares}) => {

  return (
    <div>
        {lugares.map((lugar, contador)=>
             
            <div key={lugar.properties.place_id}>
            
                <Lugar
                    numero={contador+1}
                    nome={lugar.properties.name}
                    endereco={lugar.properties.address_line2}
                    distancia={lugar.properties.distance}
                />
            </div>

        )}

    </div>
  )
}

export default ListaLugares