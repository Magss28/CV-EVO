import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

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

onSnapshot(
  collection(db, "catalogo"),
  (snapshot) => {

    autosDiv.innerHTML = "";

    snapshot.forEach((doc) => {

      const auto = doc.data();

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
        </div>
      `;
    });
  }
);