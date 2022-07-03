main();

function main() {
  // B1: Gọi API lấy danh sách sản phẩm
  apiGetTeachers().then(function (result) {
    // Tạo biến products nhận kết quả trả về từ API
    let teachers = result.data.filter((onlyTeacher) => {
      return onlyTeacher.loaiND === "GV";
    });
    // Sau khi đã lấy được data từ API thành công
    // Duyệt mảng data và khởi tạo các đối tượng Product
    for (let i = 0; i < teachers.length; i++) {
      const teacher = teachers[i];
      teachers[i] = new Teacher(
        teacher.id,
        teacher.taiKhoan,
        teacher.hoTen,
        teacher.matKhau,
        teacher.email,
        teacher.loaiND,
        teacher.ngonNgu,
        teacher.moTa,
        teacher.hinhAnh
      );
    }
    // Gọi hàm display để hiển thị danh sách sản phẩm ra giao diện
    display(teachers);
    console.log(teachers);
  });
}

function display(teachers) {
  let html = "";
  for (let i = 0; i < teachers.length; i++) {
    const teacher = teachers[i];
    html += `
    <div class="col-lg-3 col-sm-6">
    <div class="card">
        <div class="card-img-cover">
            <img class="card-img-top" src="${teacher.hinhAnh}">
        </div>
        <div class="card-body">
            <h4 class="card-title">
                <span class="text-country">${teacher.ngonNgu}</span>
                <span class="text-name">${teacher.hoTen}</span>
            </h4>
            <span class="card-text">${teacher.moTa}</span>
        </div>
    </div>
  </div>`;
  }
  // DOM
  document.getElementById("teacherList").innerHTML = html;
}
