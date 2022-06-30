baseURL = "https://62a9504d3b3143855431107f.mockapi.io/api/apiTeacher";

function apiGetClients(search) {
  return axios({
    url: baseURL,
    method: "GET",
    params: {
      name: search,
    },
  });
}

// Add client
function apiAddClient(client) {
  return axios({
    url: baseURL,
    method: "POST",
    data: client,
  });
}

// Delete client
function apiDeleteClient(clientId) {
  return axios({
    url: `${baseURL}/${clientId}`,
    method: "DELETE",
  });
}

// Get detail client
function apiGetClientDetail(clientId) {
  return axios({
    url: `${baseURL}/${clientId}`,
    method: "GET",
  });
}

// Update client
function apiUpdateClient(client) {
  return axios({
    url: `${baseURL}/${client.id}`,
    method: "PUT",
    data: client,
  });
}
