const api_url = window.location.hostname ==="localhost"? "http://localhost:1337":"https://map-app-server.now.sh";
export async function listLogEntries() {
  const response = await fetch(`${api_url}/logs`, {
    method: "GET"
  });
  // console.log(await response.json())
  return await response.json();
}
export async function createLogEntry(entry) {
  const accessKey = entry.accessKey;
  delete entry.accessKey;
  const response = await fetch(`${api_url}/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": accessKey,
    },
    body: JSON.stringify(entry)
  });
  const json = await response.json();
  if(response.ok){
    return json;
  }
  const error = new Error(json.message);
  error.response =json; 
  throw error;
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
