const { exec } = require("child_process");
const axios = require("axios");
const fs = require("fs");

const package_list = ["express", "react"];

function readPackagesFromFile(file_path) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(file_path, "utf8");

    // Parse the JSON data
    const jsonObject = JSON.parse(data);
    console.log("JSON Object:", jsonObject.length);
    return jsonObject;
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
  }
}

async function getTopVersionNodeModules(nodeModuleName, numbers) {
  const countDownloadsUrl = `https://api.npmjs.org/versions/${nodeModuleName}/last-week`;

  try {
    // Response from request URL
    const response = await axios.get(countDownloadsUrl);
    const data = response.data;

    // Sort the data by values in descending order
    const sortedDataDesc = Object.fromEntries(
      Object.entries(data.downloads).sort(
        ([, valueA], [, valueB]) => valueB - valueA
      )
    );

    // Get the top {numbers} versions of the node module
    const topVersions = Object.keys(sortedDataDesc).slice(0, numbers);
    return topVersions;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function main() {
  const file_path = "PackageList.json";
  const package_list = readPackagesFromFile(file_path);

  for (let index = 0; index < package_list.length; index++) {
    const package = package_list[index];

    // get top 10 package versions
    const versions = await getTopVersionNodeModules(package, 10);

    versions.map((version, index) => {
      const command = `npm pack ${package}@${version}`;
      if (!fs.existsSync(`./${package}@${version}`)) {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
          }
          console.log(`Output:\n${stdout}`);
        });
      }
    });
  }
}
main();
