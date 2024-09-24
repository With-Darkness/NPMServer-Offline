const axios = require("axios");
const fs = require("fs");

const names = require("all-the-package-names");

async function getDownloads(packageName) {
  const url = `https://api.npmjs.org/downloads/point/last-week/${packageName}`;

  try {
    const response = await axios.get(url);
    const downloadsData = response.data.downloads;
    return downloadsData;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

async function sortDictionaryByValue(dict) {
  // Convert the object into an array of [key, value] pairs
  const sortedArray = Object.entries(dict).sort(
    ([, valueA], [, valueB]) => valueA - valueB
  );

  sortedArray.slice(0, 10000);

  // Convert the sorted array back to an object
  const sortedDict = Object.fromEntries(sortedArray);

  // Return the top 10, 000 elements
  return sortedDict;
}

async function processListPerDownloads(names) {
  const package_json = {};

  for (let index = 0; index < names.length; index++) {
    const name = names[index];
    console.log(index, name);
    const downloads = await getDownloads(name);
    package_json[name] = downloads;

    await sortDictionaryByValue(package_json);
  }
  await writeDataToFile(package_json);

  return package_json;
}

async function writeDataToFile(data) {
  fs.writeFile("packages_info.json", JSON.stringify(data), (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Successfully wrote to packages_info.json");
    }
  });
}

package_json = processListPerDownloads(names);
