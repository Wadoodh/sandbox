async function getData() {
  const res = await fetch("https://dev--movies.api-for-webflow.autocode.gg/");
  const data = await res.json();
  console.log(data);
  return data;
}

getData();
