function extractProductName() {
  const titleTag = document.querySelector("meta[property='og:title']") ||
                   document.querySelector("title");
  return titleTag ? titleTag.content || titleTag.innerText : "Unknown Product";
}

const productName = extractProductName();

chrome.runtime.sendMessage({ type: "getCarbonFootprint", productName }, (response) => {
  if (response.success) {
    const carbonData = response.data;
    displayCarbonInfo(carbonData);
  } else {
    console.error("Failed to get carbon footprint:", response.error);
  }
});

function displayCarbonInfo(data) {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.backgroundColor = "#fff";
  container.style.padding = "10px";
  container.style.borderRadius = "8px";
  container.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";
  container.style.zIndex = "1000";
  
  const text = document.createElement("div");
  text.innerText = `Carbon Footprint: ${data.footprint} kg CO2`;
  
  const meter = document.createElement("div");
  meter.style.marginTop = "10px";
  meter.style.height = "20px";
  meter.style.width = "100px";
  meter.style.borderRadius = "10px";
  meter.style.overflow = "hidden";
  meter.style.border = "1px solid #ccc";

  const meterFill = document.createElement("div");
  const score = data.score; // 0 (good) to 100 (bad)
  meterFill.style.height = "100%";
  meterFill.style.width = `${score}%`;
  meterFill.style.backgroundColor = score < 40 ? "green" : score < 70 ? "yellow" : "red";
  meter.appendChild(meterFill);

  container.appendChild(text);
  container.appendChild(meter);
  document.body.appendChild(container);
}
