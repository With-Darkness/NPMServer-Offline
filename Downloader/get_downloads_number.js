const axios = require("axios");

async function getDownloads(packageName, startDate, endDate) {
  const url = `https://api.npmjs.org/downloads/point/last-week/${packageName}`;

  try {
    const response = await axios.get(url);
    const downloadsData = response.data.downloads;
    return downloadsData;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

// Example usage
const packageName = "express"; // Replace with your package
const startDate = "2022-01-01"; // Start date
const endDate = "2022-12-31"; // End date

getDownloads(packageName, startDate, endDate);
