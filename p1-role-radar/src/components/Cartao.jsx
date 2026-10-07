
const Cartao = (props) => {
  return (
    <div className="border-2 border-round-xl  p-3" style={{borderColor:'purple'}}>
        <div className="text-sm" style={{color:'lightgrey'}}>
          {props.cabecalho}
        </div>
        <div className='border-top-1' style={{borderColor:'purple'}}>
          {props.children}
        </div>

    </div>
  )
}

export default Cartao