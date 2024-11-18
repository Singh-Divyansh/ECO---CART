const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Free mock API

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "getCarbonFootprint") {
    try {
      // Simulate API response with mock data
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const mockData = await response.json();

      // Use mock data to simulate carbon footprint
      const footprint = Math.floor(Math.random() * 10) + 1; // Random value between 1-10
      const score = Math.floor((footprint / 10) * 100); // Scale to 0-100
      sendResponse({
        success: true,
        data: {
          footprint: footprint,
          score: score
        }
      });
    } catch (error) {
      console.error("Error fetching carbon footprint:", error);
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Required for async response
});
