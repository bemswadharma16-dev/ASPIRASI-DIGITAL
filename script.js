// === ANIMASI HALAMAN UTAMA ===
window.onload = function() {
  console.log("Website Aspirasi Mahasiswa siap digunakan ✨");
  showPage('beranda'); // default tampilan awal
};

// === UTILITAS: SIMPAN & AMBIL ASPIRASI ===
function saveAspirasi(aspirasi) {
  let data = JSON.parse(localStorage.getItem("aspirasiList")) || [];
  aspirasi.waktu = new Date().toISOString(); // simpan waktu
  data.push(aspirasi);
  localStorage.setItem("aspirasiList", JSON.stringify(data));
}

function getAspirasi() {
  return JSON.parse(localStorage.getItem("aspirasiList")) || [];
}

function deleteAspirasi(index) {
  let data = getAspirasi();
  data.splice(index, 1);
  localStorage.setItem("aspirasiList", JSON.stringify(data));
  renderAspirasiList(); // refresh tampilan
}

// === FORM ASPIRASI ===
function openForm() {
  document.getElementById("dynamic-content").innerHTML = `
    <h2 style="text-align:center; color:var(--primary); margin-bottom:20px;">💡 Ajukan Aspirasi Kamu</h2>
    <form id="aspirasiForm">
      <label>Judul Aspirasi</label>
      <input type="text" id="judul" placeholder="Contoh: Perbaikan ruang kelas" required>
      
      <label>Kategori</label>
      <select id="kategori">
        <option value="Akademik">📘 Akademik</option>
        <option value="Fasilitas">🏫 Fasilitas</option>
        <option value="Kegiatan">🎉 Kegiatan</option>
        <option value="Lainnya">✨ Lainnya</option>
      </select>
      
      <label>Deskripsi</label>
      <textarea id="deskripsi" rows="4" placeholder="Tulis aspirasi kamu dengan jelas..." required></textarea>
      
      <label>
        <input type="checkbox" id="anonim"> Kirim sebagai Anonim 🙈
      </label>
      
      <button type="submit">🚀 Kirim Aspirasi</button>
    </form>
  `;

  document.getElementById("aspirasiForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let aspirasi = {
      judul: document.getElementById("judul").value,
      kategori: document.getElementById("kategori").value,
      deskripsi: document.getElementById("deskripsi").value,
      anonim: document.getElementById("anonim").checked ? "Anonim" : "Mahasiswa"
    };

    saveAspirasi(aspirasi);
    alert("✨ Aspirasi kamu sudah tersimpan, terima kasih!");
    document.getElementById("aspirasiForm").reset();
  });
}

// === LIHAT ASPIRASI (dengan password + hapus) ===
function lihatAspirasi() {
  document.getElementById("dynamic-content").innerHTML = `
    <div id="aspirasiPasswordModal" class="password-modal">
      <div id="aspirasiPasswordBox" class="password-box gemes-box">
        <h3>🔐 Masuk ke Aspirasi</h3>
        <p style="font-size:14px; color:#666; margin-bottom:12px;">Yuk masuk dengan kunci rahasia ✨</p>
        <input type="password" id="aspirasiPasswordInput" placeholder="Ketik password di sini..." class="input-gemes"/>
        <div style="margin-top:15px;">
          <button id="aspirasiPasswordEnterBtn" class="btn-gemes">🚀 Masuk</button>
          <button id="aspirasiPasswordCancelBtn" class="btn-cancel">❌ Batal</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("aspirasiPasswordEnterBtn").addEventListener("click", checkAspirasiPassword);
  document.getElementById("aspirasiPasswordCancelBtn").addEventListener("click", () => renderHome());
}

function checkAspirasiPassword() {
  const password = document.getElementById("aspirasiPasswordInput").value.trim();
  const correct = "aspirasi2025"; // password admin

  if (password === correct) {
    document.getElementById("aspirasiPasswordModal").remove();
    renderAspirasiList();
  } else {
    const box = document.getElementById("aspirasiPasswordBox");
    box.classList.add("shake");
    setTimeout(() => {
      box.classList.remove("shake");
      renderHome();
    }, 800);
  }
}

function renderAspirasiList() {
  let aspirasiList = getAspirasi();

  let aspirasiHTML = aspirasiList.map((item, index) => `
    <div class="aspirasi-card">
      <button onclick="deleteAspirasi(${index})" 
        style="float:right; background:none; border:none; font-size:16px; cursor:pointer; color:#d63384;">❌</button>
      <h4>💡 ${item.judul || "Tanpa Judul"}</h4>
      <p><b>Kategori:</b> ${item.kategori || "-"}</p>
      <p>${item.deskripsi || "(tidak ada deskripsi)"}</p>
      <small style="color:#888;">🕒 ${new Date(item.waktu).toLocaleString()}</small>
    </div>
  `).join("");

  if (!aspirasiHTML) {
    aspirasiHTML = `<p style="text-align:center; color:#888;">Belum ada aspirasi masuk 🌸</p>`;
  }

  document.getElementById("dynamic-content").innerHTML = `
    <h2 style="text-align:center; color:#ff66a3;">📋 Aspirasi Mahasiswa</h2>
    <div id="aspirasiList" class="aspirasi-list">
      ${aspirasiHTML}
    </div>
  `;
}

// === STATISTIK (belum diubah) ===
function lihatStatistik() {
  document.getElementById("dynamic-content").innerHTML = `
    <h2>📊 Statistik Aspirasi</h2>
    <p>Data akan muncul di sini 📊</p>
  `;
}

// === HALAMAN UTAMA ===
function renderHome() {
  document.getElementById("dynamic-content").innerHTML = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// === NAVIGASI (Beranda, Tentang, dll) ===
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.style.display = 'block';
  }
}
