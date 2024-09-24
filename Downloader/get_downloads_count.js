const axios = require("axios");

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

// Example usage
getTopVersionNodeModules("fastify", 10).then((topVersions) => {
  console.log(topVersions);
});
