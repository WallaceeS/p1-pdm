import '../styles.css'
import Cartao from "./Cartao"
import Creditos from "./Creditos"
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
                <i className="pi pi-map-marker" style={{ color: 'red'}}></i>
                RolêRadar
            </h1>
            <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
            <Creditos/>
            <Cartao cabecalho = 'Teste'>    
                <p>Conteúdo do cartão</p>
            </Cartao>
            <p>RolêRadar © {obterAno()}</p> 
            
           
        </div>
        
    )
}


export default App