const fetchJSON = (path: string) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(path); // The path to your JSON file
    if (!response.ok) {
      reject(new Error(`HTTP error! Status: ${response.status}`));
    }
    const data = await response.json();
    resolve(data);
  });
};

export default fetchJSON;
