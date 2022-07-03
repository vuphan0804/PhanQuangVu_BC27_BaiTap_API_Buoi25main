var baseUrl = "https://62a9504d3b3143855431107f.mockapi.io/api/apiTeacher";

// Hàm call API lấy danh sách GV
function apiGetTeachers() {
  return axios({
    url: baseUrl,
    method: "GET",
  });
}
//
