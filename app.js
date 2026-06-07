import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/*ocultar importaciones
import { motos } from "./datos/motos.js";
import { clasicos } from "./datos/clasicos.js";
import { deportivos } from "./datos/deportivos.js";
import { superdeportivos } from "./datos/superdeportivos.js";
import { suv } from "./datos/suv.js"; */

const firebaseConfig = {
  apiKey: "AIzaSyAAuz4yARRxt4V3vugwoFaOZRZlSoY7I5g",
  authDomain: "compra-y-venta-7ad1e.firebaseapp.com",
  projectId: "compra-y-venta-7ad1e",
  storageBucket: "compra-y-venta-7ad1e.firebasestorage.app",
  messagingSenderId: "132331919872",
  appId: "1:132331919872:web:6898c5f7b2e312497856e5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const autosDiv = document.getElementById("autos");
const activosDiv = document.getElementById("activos");

const catalogoSection =
document.getElementById("catalogoSection");

const activosSection =
document.getElementById("activosSection");

const selectVehiculo =
document.getElementById("selectVehiculo");

const calculos =
document.getElementById("calculos");

const fullTunning =
document.getElementById("fullTunning");

const motor =
document.getElementById("motor");

const frenos =
document.getElementById("frenos");

const transmision =
document.getElementById("transmision");

const suspension =
document.getElementById("suspension");

const blindaje =
document.getElementById("blindaje");

const matricula =
document.getElementById("matricula");

const guardarVehiculo =
document.getElementById("guardarVehiculo");

const vendidosDiv =
document.getElementById("vendidos");

const vendidosSection =
document.getElementById("vendidosSection");

const transferenciasSection =
document.getElementById("transferenciasSection");

const transferenciasDiv =
document.getElementById("transferencias");

const buscador =
document.getElementById("buscador");

const btnAgregarCatalogo =
document.getElementById("btnAgregarCatalogo");

const formularioCatalogo =
document.getElementById("formularioCatalogo");

const guardarCatalogo =
document.getElementById("guardarCatalogo");

const marcaCatalogo =
document.getElementById("marcaCatalogo");

const modeloCatalogo =
document.getElementById("modeloCatalogo");

const precioCatalogo =
document.getElementById("precioCatalogo");

const categoriaCatalogo =
document.getElementById("categoriaCatalogo");

/* ocultar botones de importacion 
const importarMotos = 
document.getElementById("importarMotos");

const importarClasicos =
document.getElementById("importarClasicos");

const importarDeportivos =
document.getElementById("importarDeportivos");

const importarSuperdeportivos =
document.getElementById("importarSuperdeportivos");

const importarSUV =
document.getElementById("importarSUV"); */  

const limpiarVendidos =
document.getElementById("limpiarVendidos");

buscador.addEventListener(
  "input",
  () => {

    const texto =
    buscador.value.toLowerCase();

    const tarjetas =
    document.querySelectorAll(".card");

    tarjetas.forEach((card) => {

      const contenido =
      card.innerText.toLowerCase();

      if(
        contenido.includes(texto)
      ){
        card.style.display = "block";
      }else{
        card.style.display = "none";
      }

    });

  }
);

let catalogoAutos = {};

document
.getElementById("btnCatalogo")
.addEventListener("click", () => {

catalogoSection.style.display = "block";
activosSection.style.display = "none";
vendidosSection.style.display = "none";

});

document
.getElementById("btnActivos")
.addEventListener("click", () => {

catalogoSection.style.display = "none";
activosSection.style.display = "block";
vendidosSection.style.display = "none";

});

document
.getElementById("btnVendidos")
.addEventListener("click", () => {

  catalogoSection.style.display = "none";
  activosSection.style.display = "none";
  vendidosSection.style.display = "block";

});

document
.getElementById("btnTransferencias")
.addEventListener("click", () => {

  catalogoSection.style.display = "none";
  activosSection.style.display = "none";
  vendidosSection.style.display = "none";
  transferenciasSection.style.display = "block";

});

btnAgregarCatalogo.addEventListener(
  "click",
  () => {

    if(
      formularioCatalogo.style.display === "none"
    ){

      formularioCatalogo.style.display =
      "block";

    }else{

      formularioCatalogo.style.display =
      "none";

    }

  }
);

// ======================
// CATALOGO
// ======================

onSnapshot(
  collection(db, "catalogo"),
  (snapshot) => {

    autosDiv.innerHTML = "";

    if(selectVehiculo){

      selectVehiculo.innerHTML = `
      <option value="">
        Seleccionar...
      </option>
      `;

    }

    snapshot.forEach((doc) => {

      const auto = doc.data();

      catalogoAutos[doc.id] = auto;

      if(selectVehiculo){

        selectVehiculo.innerHTML += `
        <option value="${doc.id}">
          ${auto.marca} ${auto.modelo}
        </option>
        `;

      }

      const precioMaxCompra =
      auto.precioConce * 0.5;

      autosDiv.innerHTML += `
      <div class="card">

        <h2>${auto.marca} ${auto.modelo}</h2>

        <p>
          Precio Conce:
          <span class="precio">
            $${auto.precioConce.toLocaleString()}
          </span>
        </p>

        <p>
          Precio Máx Compra:
          <span class="precio">
            $${precioMaxCompra.toLocaleString()}
          </span>
        </p>

        <p>⚙️ Full Tunning: $55.000</p>

        <p>🏁 Rendimiento: $5.000</p>

        <p>📂 ${auto.categoria}</p>

        <p>
          ${
            auto.activo === false
            ? "🔴 No Disponible"
            : "🟢 Disponible"
          }
        </p>

        <button
          onclick="cambiarDisponibilidadCatalogo('${doc.id}', ${auto.activo === false})"
        >
          ${
            auto.activo === false
            ? "🟢 Habilitar"
            : "🔴 Deshabilitar"
          }
        </button>

        <button
          onclick="editarPrecioCatalogo('${doc.id}', ${auto.precioConce})"
        >
          ✏️ Editar Precio
        </button>

              </div>
              `;
            });

  }
);

// ======================
// TRANSFERENCIAS
// ======================

onSnapshot(
  collection(db, "catalogo"),
  (snapshot) => {

    transferenciasDiv.innerHTML = "";

    snapshot.forEach((doc) => {

      const auto = doc.data();

      const compraTransferencia =
      auto.precioConce * 0.10;

      const ventaTransferencia =
      auto.precioConce * 0.30;

      transferenciasDiv.innerHTML += `
      <div class="card">

        <h2>
          ${auto.marca}
          ${auto.modelo}
        </h2>

        <p>
          📂 ${auto.categoria}
        </p>

        <p>
          💰 Precio Conce:
          <span class="precio">
            $${auto.precioConce.toLocaleString()}
          </span>
        </p>

        <p>
          📄 Compra Transferencia:
          <span class="precio">
            $${compraTransferencia.toLocaleString()}
          </span>
        </p>

        <p>
          📄 Venta Transferencia:
          <span class="precio">
            $${ventaTransferencia.toLocaleString()}
          </span>
        </p>

      </div>
      `;
    });

  }
);

// ======================
// ACTIVOS
// ======================

onSnapshot(
  collection(db, "activos"),
  (snapshot) => {

    activosDiv.innerHTML = "";

    snapshot.forEach((doc) => {

      const auto = doc.data();

      activosDiv.innerHTML += `
      <div class="card">

        <h2>${auto.marca} ${auto.modelo}</h2>

        <p>📄 Matrícula: ${auto.matricula}</p>

        <p>
          💰 Compra:
          <span class="precio">
            $${auto.precioCompra.toLocaleString()}
          </span>
        </p>

        <p>
          💵 Venta:
          <span class="precio">
            $${auto.precioVenta.toLocaleString()}
          </span>
        </p>

        <p>
          ${auto.fullTunning
            ? "✅ Full Tunning"
            : "❌ Sin Full Tunning"}
        </p>

        <p>
          ${auto.motor ? "⚙️ Motor" : ""}
          ${auto.frenos ? " ⚙️ Frenos" : ""}
          ${auto.transmision ? " ⚙️ Transmisión" : ""}
          ${auto.suspension ? " ⚙️ Suspensión" : ""}
        </p>

        <p>
          ${auto.blindaje
            ? "🛡️ Blindaje"
            : "❌ Sin Blindaje"}
        </p>

      <p>
        ${auto.estado === "Reservado"
          ? "🟡 Reservado"
          : "🟢 Disponible"}
      </p>

      <div style="margin-top:15px;">

        <button
          onclick="cambiarEstado('${doc.id}','${auto.estado}')"
        >
          ${
            auto.estado === "Reservado"
            ? "🟢 Liberar"
            : "🟡 Reservar"
          }
        </button>

        <button
          onclick="venderVehiculo('${doc.id}')"
        >
          ✅ Vender
        </button>
        
        
        <button
          onclick="eliminarVehiculo('${doc.id}')"
        >
          🗑️ Eliminar
        </button>

      </div>

      </div>
      `;
    });
  }
);

// ======================
// VENDIDOS
// ======================

onSnapshot(
  collection(db, "vendidos"),
  (snapshot) => {

    vendidosDiv.innerHTML = "";

    snapshot.forEach((doc) => {

      const auto = doc.data();

      vendidosDiv.innerHTML += `
      <div class="card">

        <h2>${auto.marca} ${auto.modelo}</h2>

        <p>📄 Matrícula: ${auto.matricula}</p>

        <p>
          💰 Venta:
          <span class="precio">
            $${auto.precioVenta.toLocaleString()}
          </span>
        </p>

        <p>
        📅 ${auto.fechaVenta}
      </p>

      <button
        onclick="eliminarVenta('${doc.id}')"
      >
        🗑️ Eliminar Venta
      </button>

      </div>
      `;
    });

  }
);

// ======================
// FORMULARIO
// ======================

const formularioActivo =
document.getElementById("formularioActivo");

document
.getElementById("btnAgregar")
.addEventListener("click", () => {

  if(formularioActivo.style.display === "none"){

    formularioActivo.style.display = "block";

  }else{

    formularioActivo.style.display = "none";

  }

});

// ======================
// CALCULOS
// ======================

function actualizarCosto() {

  const idVehiculo =
  selectVehiculo.value;

  if(!idVehiculo){

    calculos.innerHTML =
    "Costo Total: $0";

    return;
  }

  const auto =
  catalogoAutos[idVehiculo];

  let total =
  auto.precioConce * 0.5;

  let html = `
    Compra Base:
    $${(auto.precioConce * 0.5).toLocaleString()}
  `;

  if(fullTunning.checked){

    total += 55000;

    html += "<br>Full Tunning: $55.000";

  }

  if(motor.checked){

    total += 5000;

  }

  if(frenos.checked){

    total += 5000;

  }

  if(transmision.checked){

    total += 5000;

  }

  if(suspension.checked){

    total += 5000;

  }

  if(blindaje.checked){

    total += 5000;

  }

  html += `
    <hr>
    <strong>
    Costo Total:
    $${total.toLocaleString()}
    </strong>
  `;

  calculos.innerHTML = html;

}

selectVehiculo.addEventListener(
  "change",
  actualizarCosto
);

fullTunning.addEventListener(
  "change",
  actualizarCosto
);

motor.addEventListener(
  "change",
  actualizarCosto
);

frenos.addEventListener(
  "change",
  actualizarCosto
);

transmision.addEventListener(
  "change",
  actualizarCosto
);

suspension.addEventListener(
  "change",
  actualizarCosto
);

blindaje.addEventListener(
  "change",
  actualizarCosto
);

// ======================
// GUARDAR VEHICULO
// ======================

guardarVehiculo.addEventListener(
  "click",
  async () => {

    const idVehiculo =
    selectVehiculo.value;

    if(!idVehiculo){

      alert("Seleccioná un vehículo");

      return;
    }

    if(!matricula.value){

      alert("Ingresá una matrícula");

      return;
    }

    const auto =
    catalogoAutos[idVehiculo];

    let precioCompra =
    auto.precioConce * 0.5;

    if(fullTunning.checked)
      precioCompra += 55000;

    if(motor.checked)
      precioCompra += 5000;

    if(frenos.checked)
      precioCompra += 5000;

    if(transmision.checked)
      precioCompra += 5000;

    if(suspension.checked)
      precioCompra += 5000;

    if(blindaje.checked)
      precioCompra += 5000;

    await addDoc(
      collection(db, "activos"),
      {
        marca: auto.marca,
        modelo: auto.modelo,

        matricula:
        matricula.value.toUpperCase(),

        precioCompra:
        precioCompra,

        precioVenta:
        precioCompra,

        fullTunning:
        fullTunning.checked,

        motor:
        motor.checked,

        frenos:
        frenos.checked,

        transmision:
        transmision.checked,

        suspension:
        suspension.checked,

        blindaje:
        blindaje.checked,

        estado:
        "Disponible"
      }
    );

    alert(
      "Vehículo agregado correctamente"
    );

    matricula.value = "";

    fullTunning.checked = false;
    motor.checked = false;
    frenos.checked = false;
    transmision.checked = false;
    suspension.checked = false;
    blindaje.checked = false;

    actualizarCosto();

  }
);

window.cambiarEstado = async (
  id,
  estadoActual
) => {

  const nuevoEstado =
  estadoActual === "Reservado"
    ? "Disponible"
    : "Reservado";

  await updateDoc(
    doc(db, "activos", id),
    {
      estado: nuevoEstado
    }
  );

};

window.eliminarVehiculo = async (
  id
) => {

  const confirmar =
  confirm(
    "¿Eliminar vehículo?"
  );

  if(!confirmar)
    return;

  await deleteDoc(
    doc(db, "activos", id)
  );

};

window.venderVehiculo = async (
  id
) => {

  const confirmar =
  confirm(
    "¿Marcar vehículo como vendido?"
  );

  if(!confirmar)
    return;

  const referencia =
  doc(db, "activos", id);

  const documento =
  await getDoc(referencia);

  if(!documento.exists())
    return;

  const auto =
  documento.data();

  await addDoc(
    collection(db, "vendidos"),
    {
      ...auto,
      fechaVenta:
      new Date().toLocaleString()
    }
  );

  await deleteDoc(
    referencia
  );

};

window.cambiarDisponibilidadCatalogo =
async (
  id,
  estabaDeshabilitado
) => {

  await updateDoc(
    doc(db, "catalogo", id),
    {
      activo:
      estabaDeshabilitado
    }
  );

};

window.editarPrecioCatalogo =
async (
  id,
  precioActual
) => {

  const nuevoPrecio =
  prompt(
    "Nuevo precio:",
    precioActual
  );

  if(
    !nuevoPrecio ||
    isNaN(nuevoPrecio)
  ){
    return;
  }

  await updateDoc(
    doc(db, "catalogo", id),
    {
      precioConce:
      Number(nuevoPrecio)
    }
  );

};

guardarCatalogo.addEventListener(
  "click",
  async () => {

    if(
      !marcaCatalogo.value ||
      !modeloCatalogo.value ||
      !precioCatalogo.value
    ){
      alert(
        "Completá todos los campos"
      );
      return;
    }

    await addDoc(
      collection(db, "catalogo"),
      {
        marca:
        marcaCatalogo.value,

        modelo:
        modeloCatalogo.value,

        precioConce:
        Number(
          precioCatalogo.value
        ),

        categoria:
        categoriaCatalogo.value || "Sin categoría",

        activo:
        true
      }
    );

    marcaCatalogo.value = "";
    modeloCatalogo.value = "";
    precioCatalogo.value = "";
    categoriaCatalogo.value = "";

    formularioCatalogo.style.display =
    "none";

    alert(
      "Vehículo agregado correctamente"
    );

  }
);
 
/* ocultar importaciones 
importarMotos.addEventListener(
  "click",
  async () => {

    for(const moto of motos){

      const idVehiculo =
      `${moto.marca}-${moto.modelo}`
      .toLowerCase()
      .replaceAll(" ", "-");

      await setDoc(
        doc(
          db,
          "catalogo",
          idVehiculo
        ),
        moto
      );

    }

    alert(
      "Motos importadas correctamente"
    );

  }
);

importarClasicos.addEventListener(
  "click",
  async () => {

    for(const auto of clasicos){

      const idVehiculo =
      `${auto.marca}-${auto.modelo}`
      .toLowerCase()
      .replaceAll(" ", "-");

      await setDoc(
        doc(
          db,
          "catalogo",
          idVehiculo
        ),
        auto
      );

    }

    alert(
      "Clásicos importados correctamente"
    );

  }
);

importarDeportivos.addEventListener(
  "click",
  async () => {

    for(const auto of deportivos){

      const idVehiculo =
      `${auto.marca}-${auto.modelo}`
      .toLowerCase()
      .replaceAll(" ", "-");

      await setDoc(
        doc(
          db,
          "catalogo",
          idVehiculo
        ),
        auto
      );

    }

    alert(
      "Deportivos importados correctamente"
    );

  }
);

importarSuperdeportivos.addEventListener(
  "click",
  async () => {

    for(const auto of superdeportivos){

      const idVehiculo =
      `${auto.marca}-${auto.modelo}`
      .toLowerCase()
      .replaceAll(" ", "-");

      await setDoc(
        doc(
          db,
          "catalogo",
          idVehiculo
        ),
        auto
      );

    }

    alert(
      "Superdeportivos importados correctamente"
    );

  }
);

importarSUV.addEventListener(
  "click",
  async () => {

    for(const auto of suv){

      const idVehiculo =
      `${auto.marca}-${auto.modelo}`
      .toLowerCase()
      .replaceAll(" ", "-");

      await setDoc(
        doc(
          db,
          "catalogo",
          idVehiculo
        ),
        auto
      );

    }

    alert(
      "SUV importadas correctamente"
    );

  }
);*/

window.eliminarVenta = async (
  id
) => {

  const confirmar =
  confirm(
    "¿Eliminar esta venta?"
  );

  if(!confirmar)
    return;

  await deleteDoc(
    doc(db, "vendidos", id)
  );

};

limpiarVendidos.addEventListener(
  "click",
  async () => {

    const confirmar =
    confirm(
      "¿Eliminar TODO el historial?"
    );

    if(!confirmar)
      return;

    const snapshot =
    await getDocs(
      collection(db, "vendidos")
    );

    for(const documento of snapshot.docs){

      await deleteDoc(
        doc(
          db,
          "vendidos",
          documento.id
        )
      );

    }

    alert(
      "Historial eliminado"
    );

  }
);