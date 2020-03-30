const api_url = "http://localhost:1337";
export async function listLogEntries(){
  const response = await fetch(`${api_url}/logs`, {
    method: 'GET'
  });
  // console.log(await response.json())
  return await response.json();
};
export async function createLogEntry(entry){
  const response = await fetch(`${api_url}/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
return await response.json();
}
