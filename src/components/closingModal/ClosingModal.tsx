function ClosingModal() {
  return (
    <div><div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">¿Seguro(a) que desea cerrar la caja?</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <p>Una vez cerrada, la información de caja no puede ser cambiada.</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Retroceder</button>
          <button type="button" className="btn btn-primary">Realizar Cierre</button>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default ClosingModal