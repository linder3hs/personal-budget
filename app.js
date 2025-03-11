// 1 -> Ingreso
// 2 -> Egreso
function Movimiento(tipo, monto, descripcion) {
  this.tipo = tipo;
  this.monto = monto;
  this.descripcion = descripcion;
}

// Retorne un boolean (true | false)
Movimiento.prototype.validarMovimiento = function () {
  // validar que el monto sea > 0
  if (this.monto <= 0) {
    return {
      ok: false,
      message: "El monto debe ser mayor a 0",
    };
  }

  // validar que descripcion no este vacio
  // vacio === ""
  // trim() remover espacios "hola como estas"
  if (this.descripcion.trim() === "") {
    return {
      ok: false,
      message: "Debe completar la descripcion",
    };
  }

  // solo aceptamos 1 y 2
  if (!["1", "2"].includes(this.tipo)) {
    return {
      ok: false,
      message: "El valor tipo es erroneo",
    };
  }

  return {
    ok: true,
    message: "Moviento validado correctamente",
  };
};

const transacciones = [];

function registrarIngresoOEgreso() {
  while (true) {
    const descripcion = prompt("Ingrese la nueva transacción");
    const tipoDeTransaccion = prompt(
      "Escoja el tipo de transacción \n1) Ingreso\n2) Egreso\n\n Solo debe poner el número de la opción"
    );
    const monto = prompt("Ingrese el monto de la transacción");
    // antes de insertar el moviento al arreglo debo crear el objeto y ejecutar la validacion
    const moviento = new Movimiento(
      tipoDeTransaccion,
      Number(monto),
      descripcion
    );

    const validacion = moviento.validarMovimiento();

    if (!validacion.ok) {
      alert(validacion.message);
    } else {
      // si es true entonces agregamo el moviento a transacciones
      transacciones.push(moviento);
    }

    // transacciones.push({
    //   transaccion,
    //   tipoDeTransaccion,
    //   monto,
    //   fechaDeCreacion: new Date(),
    // });

    const confirmacion = confirm("Desea agregar otra transacción?");
    // ok => true: continuar con otra transaccion
    // cancel => false: terminar la transaccion
    // en que caso deberiamos detener el while
    if (confirmacion === false) {
      // detener el while
      break;
    }
  }
}

function mapTransactionNames() {
  const names = transacciones.map(function (transaccion) {
    return transaccion.transaccion;
  });
  console.log(names);
}

function filterTransactions() {
  // condiciones egreso y > 100
  const filtroDeDatos = transacciones.filter(
    (transaccion) =>
      transaccion.monto > 100 && transaccion.tipoDeTransaccion === "2"
  );
  console.log(filtroDeDatos);
}

registrarIngresoOEgreso();
