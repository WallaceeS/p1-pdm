import '../styles.css'
import {MapMarker} from '@primeicons/react/map-marker'
const App = () => {
    const estiloSubtitulo = {margin: 'auto', fontSize: 16, color:'blue', textAlign:'center'}
    const obterAno = () => {
        const data = new Date()
        const anoAtual = data.getFullYear()
        return anoAtual
    }


    return (
        <div>
            <h1 className='titulo'>
                <MapMarker style={{color:'red'}}/>
                RolêRadar
            </h1>
            <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
            <p>RolêRadar © {obterAno()}</p>
        </div>
        
    )
}


export default App