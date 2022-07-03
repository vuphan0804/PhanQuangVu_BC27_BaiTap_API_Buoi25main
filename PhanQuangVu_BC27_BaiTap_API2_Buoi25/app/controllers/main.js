const main = () => {
  apiGetClients().then(function (result) {
    const clients = result.data;
    for (let i = 0; i < clients.length; i++) {
      const client = clients[i];
      clients[i] = new Client(
        client.id,
        client.taiKhoan,
        client.matKhau,
        client.hoTen,
        client.email,
        client.ngonNgu,
        client.loaiND
      );
    }
    display(clients);
  });
};
main();

const display = (clients) => {
  let html = "";
  for (let i = 0; i < clients.length; i++) {
    const client = clients[i];
    html += `
        <tr>
          <td>${i + 1}</td>
          <td>${client.taiKhoan}</td>
          <td>${client.matKhau}</td>
          <td>${client.hoTen}</td>
          <td>${client.email}</td>
          <td>${client.ngonNgu}</td>
          <td>${client.loaiND}</td>
          <td>
            <button
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#myModal"
              data-type="update"
              data-id="${client.id}"
            >
              Cập Nhật
            </button>
            <button
              class="btn btn-danger"
              data-type="delete"
              data-id="${client.id}"
            >
              Xoá
            </button>
          </td>
        </tr>
      `;
  }

  document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
};

// Call API add client
const addClient = () => {
  const taiKhoan = document.getElementById("TaiKhoan").value;
  const hoTen = document.getElementById("HoTen").value;
  const matKhau = document.getElementById("MatKhau").value;
  const email = document.getElementById("Email").value;
  const hinhAnh = document.getElementById("HinhAnh").value;
  const ngonNgu = document.getElementById("loaiNgonNgu").value;
  const loaiND = document.getElementById("loaiNguoiDung").value;
  const moTa = document.getElementById("MoTa").value;

  const client = new Client(
    null,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    ngonNgu,
    loaiND,
    moTa
  );
  validationAdd();
  apiAddClient(client)
    .then((result) => {
      main();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Call API delete client
const deleteClient = (clientId) => {
  apiDeleteClient(clientId)
    .then(function () {
      main();
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Call API update client
const updateClient = () => {
  const id = document.getElementById("MaNguoiDung").value; // hidden input
  const taiKhoan = document.getElementById("TaiKhoan").value;
  const hoTen = document.getElementById("HoTen").value;
  const matKhau = document.getElementById("MatKhau").value;
  const email = document.getElementById("Email").value;
  const hinhAnh = document.getElementById("HinhAnh").value;
  const loaiND = document.getElementById("loaiNguoiDung").value;
  const ngonNgu = document.getElementById("loaiNgonNgu").value;
  const moTa = document.getElementById("MoTa").value;

  const client = new Client(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    ngonNgu,
    loaiND,
    moTa
  );
  apiUpdateClient(client)
    .then(function (result) {
      main();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Handle reset form and close modal
const resetForm = () => {
  document.getElementById("TaiKhoan").value = "";
  document.getElementById("HoTen").value = "";
  document.getElementById("MatKhau").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("HinhAnh").value = "";
  document.getElementById("loaiNguoiDung").value = "";
  document.getElementById("loaiNgonNgu").value = "";
  document.getElementById("MoTa").value = "";
  $("#myModal").modal("hide");
};

// ==== DOM ====
// Show add modal
document
  .getElementById("btnThemNguoiDung")
  .addEventListener("click", showAddModal);
function showAddModal() {
  document.querySelector(".modal-title").innerHTML = "Thêm người dùng";
  document.querySelector(".modal-footer").innerHTML = `
    <button
      class="btn btn-primary"
      data-type="add"
    >
      Thêm
    </button>
    <button
      class="btn btn-secondary"
      data-toggle="modal"
      data-target="#myModal"
    >
      Huỷ
    </button>
  `;
}

document.querySelector(".modal-footer").addEventListener("click", handleSubmit);
function handleSubmit(event) {
  const type = event.target.getAttribute("data-type");

  switch (type) {
    case "add":
      addClient();
      break;
    case "update":
      updateClient();
      break;
    default:
      break;
  }
}

document
  .getElementById("tblDanhSachNguoiDung")
  .addEventListener("click", handleClientAction);

function handleClientAction(event) {
  // Loại button (delete || update)
  const type = event.target.getAttribute("data-type");
  // Id của sản phẩm
  const id = event.target.getAttribute("data-id");

  switch (type) {
    case "delete":
      deleteClient(id);
      break;
    case "update": {
      showUpdateModal(id);
      break;
    }

    default:
      break;
  }
}

function showUpdateModal(clientId) {
  // Thay đổi text của modal heading/ modal footer
  document.querySelector(".modal-title").innerHTML = "Cập nhật sản phẩm";
  document.querySelector(".modal-footer").innerHTML = `
    <button
      class="btn btn-primary"
      data-type="update"
    >
      Cập nhật
    </button>
    <button
      class="btn btn-secondary"
      data-dismiss="modal"
    >
      Huỷ
    </button>
  `;

  // Call API get detail client
  apiGetClientDetail(clientId)
    .then(function (result) {
      const client = result.data;
      document.getElementById("MaNguoiDung").value = client.id;
      document.getElementById("TaiKhoan").value = client.taiKhoan;
      document.getElementById("HoTen").value = client.hoTen;
      document.getElementById("MatKhau").value = client.matKhau;
      document.getElementById("Email").value = client.email;
      document.getElementById("HinhAnh").value = client.hinhAnh;
      document.getElementById("loaiNgonNgu").value = client.ngonNgu;
      document.getElementById("loaiNguoiDung").value = client.loaiND;
      document.getElementById("MoTa").value = client.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// DOM input search
document.getElementById("txtSearch").addEventListener("keypress", handleSearch);
function handleSearch(e) {
  console.log(e);

  if (e.key !== "Enter") return;

  let value = e.target.value;
  apiGetClients(value).then(function (result) {
    const clients = result.data;

    for (let i = 0; i < clients.length; i++) {
      const client = clients[i];
      clients[i] = new Client(
        client.id,
        client.taiKhoan,
        client.matKhau,
        client.hoTen,
        client.email,
        client.ngonNgu,
        client.loaiND
      );
    }

    display(clients);
  });
}

// Validation

function validationAdd() {
  const taiKhoan = document.getElementById("TaiKhoan").value;
  const hoTen = document.getElementById("HoTen").value;
  const matKhau = document.getElementById("MatKhau").value;
  const email = document.getElementById("Email").value;
  const hinhAnh = document.getElementById("HinhAnh").value;
  const loaiND = +document.getElementById("loaiNguoiDung").value;
  const ngonNgu = document.getElementById("loaiNgonNgu").value;
  let isValid = true;

  //Kiểm tra tài khoản nhập vào có hợp lệ hay không
  const taiKhoanPattern = new RegExp("^[1-9]+$");
  const taiKhoanNotiEl = document.getElementById("taiKhoanNoti");
  if (!isRequired(taiKhoan)) {
    isValid = false;
    taiKhoanNotiEl.innerHTML = "Tài khoản không được để trống";
    taiKhoanNotiEl.style = "display:block";
  } else if (!minLength(taiKhoan, 4)) {
    isValid = false;
    taiKhoanNotiEl.innerHTML = "Tài khoản phải có ít nhất 4 ký số";
    taiKhoanNotiEl.style = "display:block";
  } else if (!maxLength(taiKhoan, 6)) {
    isValid = false;
    taiKhoanNotiEl.innerHTML = "Tài khoản có tối đa 6 ký số";
    taiKhoanNotiEl.style = "display:block";
  } else if (!taiKhoanPattern.test(taiKhoan)) {
    isValid = false;
    taiKhoanNotiEl.innerHTML = "Tài khoản chỉ bao gồm số";
    taiKhoanNotiEl.style = "display:block";
  } else if (!duplicateTest(taiKhoan)) {
    isValid = false;
    taiKhoanNotiEl.innerHTML = "Tài khoản đã tồn tại";
    taiKhoanNotiEl.style = "display:block";
  } else {
    taiKhoanNotiEl.innerHTML = "";
    taiKhoanNotiEl.style = "display:none";
  }
  //hoTen Validation
  const hoTenPattern = new RegExp(
    "^[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$"
  );
  const hoTenNotiEl = document.getElementById("hoTenNoti");
  if (!isRequired(hoTen)) {
    isValid = false;
    hoTenNotiEl.innerHTML = "Tên nhân viên không được để trống";
    hoTenNotiEl.style = "display:block";
  } else if (!hoTenPattern.test(hoTen)) {
    isValid = false;
    hoTenNotiEl.innerHTML = "Tên nhân viên chứa kí tự không hợp lệ";
    hoTenNotiEl.style = "display:block";
  } else {
    hoTenNotiEl.innerHTML = "";
    hoTenNotiEl.style = "display:none";
  }

  //Email Validation
  const emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  const emailNotiEl = document.getElementById("emailNoti");
  if (!isRequired(email)) {
    isValid = false;
    emailNotiEl.innerHTML = "Email không được để trống";
    emailNotiEl.style = "display:block";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    emailNotiEl.innerHTML = "Email không đúng định dạng";
    emailNotiEl.style = "display:block";
  } else {
    emailNotiEl.innerHTML = "";
    emailNotiEl.style = "display:none";
  }
  //Password Validation
  const matKhauPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
  const matKhauNotiEl = document.getElementById("matKhaudNoti");
  if (!isRequired(matKhau)) {
    isValid = false;
    matKhauNotiEl.innerHTML = "Password không được để trống";
    matKhauNotiEl.style = "display:block";
  } else if (!minLength(matKhau, 6)) {
    isValid = false;
    matKhauNotiEl.innerHTML = "Password phải có ít nhất 6 ký tự";
    matKhauNotiEl.style = "display:block";
  } else if (!maxLength(matKhau, 10)) {
    isValid = false;
    matKhauNotiEl.innerHTML = "Password có tối đa 10 ký tự";
    matKhauNotiEl.style = "display:block";
  } else if (!matKhauPattern.test(matKhau)) {
    isValid = false;
    matKhauNotiEl.innerHTML =
      "Password phải chứa ít nhất 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt";
    matKhauNotiEl.style = "display:block";
  } else {
    matKhauNotiEl.innerHTML = "";
    matKhauNotiEl.style = "display:none";
  }

  // Image Validation
  const hinhAnhNotiEl = document.getElementById("hinhAnhNoti");
  if (!isRequired(hinhAnh)) {
    isValid = false;
    hinhAnhNotiEl.innerHTML = "Hình ảnh không được để trống";
    hinhAnhNotiEl.style = "display:block";
  } else {
    hinhAnhNotiEl.innerHTML = "";
    hinhAnhNotiEl.style = "display:none";
  }

  // Type Client
  const loaiNguoiDungNotiEl = document.getElementById("loaiNguoiDungNoti");
  if (!isRequired(hinhAnh)) {
    isValid = false;
    loaiNguoiDungNotiEl.innerHTML = "Vui lòng chọn loại người dùng";
    loaiNguoiDungNotiEl.style = "display:block";
  } else {
    loaiNguoiDungNotiEl.innerHTML = "";
    loaiNguoiDungNotiEl.style = "display:none";
  }

  // Language
  const loaiNgonNguNotiEl = document.getElementById("loaiNgonNguNoti");
  if (!isRequired(hinhAnh)) {
    isValid = false;
    loaiNgonNguNotiEl.innerHTML = "Vui lòng chọn loại ngôn ngữ";
    loaiNgonNguNotiEl.style = "display:block";
  } else {
    loaiNgonNguNotiEl.innerHTML = "";
    loaiNgonNguNotiEl.style = "display:none";
  }
  // Finally
  return isValid;
}

function isRequired(value) {
  if (!value) {
    return false;
  }

  return true;
}

function minLength(value, limit) {
  if (value.length < limit) {
    return false;
  }

  return true;
}

function maxLength(value, limit) {
  if (value.length > limit) {
    return false;
  }

  return true;
}

function duplicateTest(value) {
  for (i = 0; i < clients.length; i++) {
    if (value === clients[i].taiKhoan) {
      return false;
    }
  }

  return true;
}
