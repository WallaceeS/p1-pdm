import {GEOAPIFY_KEY} from '../utils/chaves.js'

const MapaRadar = ({latitude, longitude, lugares}) => {
    const usuario = `lonlat:${longitude},${latitude};color:%23d32f2f;size:48`
    const lugar = lugares.map((lugar, contador) => `lonlat:${lugar.properties.lon},${lugar.properties.lat};type:circle;color:%231565c0;size:42;contentsize:28;text:${contador + 1}`)
    const juntarUsuarioLugar = usuario + "|" + lugar.join("|")
    const url = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&marker=${juntarUsuarioLugar}&apiKey=${GEOAPIFY_KEY}`
  return (

    <div>
        <img
            src={url}
            alt="Radar com os lugares encontrados"
            style={{width: "100%"}}
        />
           
        
    </div>
  )
}

export default MapaRadar