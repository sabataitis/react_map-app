const api_url = "http://localhost:1337";
export async function listLogEntries() {
  const response = await fetch(`${api_url}/logs`, {
    method: "GET"
  });
  // console.log(await response.json())
  return await response.json();
}
export async function createLogEntry(entry) {
  const response = await fetch(`${api_url}/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(entry)
  });
  return await response.json();
}
export async function deleteLogEntry(id) {
  const response = await fetch(`${api_url}/logs/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    }
  });
  await console.log(response.json());
}
export async function editLogEntry(id, data) {
  const response = await fetch(`${api_url}/logs/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  });
  await console.log(response.json());
}
