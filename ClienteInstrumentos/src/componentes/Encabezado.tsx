function Encabezado() {

    return (
        <div className="detalle-header">
            <ul className="nav tabs detalle-header-tabs">
              <li className="nav-item">
                <a className="nav-link" aria-current="true" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dondeestamos">Donde Estamos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/productos">Productos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/grilla">Grilla</a>
              </li>
            </ul>
          </div>
    )
}

export default Encabezado