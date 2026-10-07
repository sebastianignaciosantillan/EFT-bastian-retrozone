/**
 * CartDropdown
 * La tabla con el contenido del carrito. Navbar.jsx decide CUÁNDO se
 * muestra (con su propio useState); este componente solo se encarga
 * de CÓMO se ve el contenido.
 *
 * Props:
 *  - items: arreglo de juegos agregados al carrito.
 *  - onEliminar: función para sacar un juego del carrito por id.
 */
function CartDropdown({ items, onEliminar }) {
  const total = items.reduce((acumulado, item) => acumulado + item.precio, 0);

  return (
    <div className="carrito-dropdown card shadow">
      <div className="card-body">
        {/* Renderizado condicional: carrito vacío vs. con contenido */}
        {items.length === 0 ? (
          <p className="text-muted mb-0">Todavía no agregaste ningún juego.</p>
        ) : (
          <>
            <table className="table table-sm align-middle mb-2">
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td className="text-end">
                      ${item.precio.toLocaleString('es-CL')}
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onEliminar(item.id)}
                        aria-label={`Quitar ${item.nombre} del carrito`}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="fw-bold text-end mb-0">
              Total: ${total.toLocaleString('es-CL')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDropdown;
