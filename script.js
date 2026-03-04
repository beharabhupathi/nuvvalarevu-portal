const sheetURL = "YOUR_APPS_SCRIPT_WEB_APP_URL"; // Replace with your actual Apps Script URL

document.getElementById("issueForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById("name").value,
    street: document.getElementById("street").value,
    issueType: document.getElementById("issueType").value,
    description: document.getElementById("description").value,
    priority: document.getElementById("priority").value,
    contact: document.getElementById("contact").value
  };
  fetch(sheetURL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(() => alert("Issue submitted successfully!"))
  .catch(() => alert("Error submitting issue."));
});

function checkUrgentIssues() {
  fetch(sheetURL)
    .then(res => res.json())
    .then(data => {
      const urgent = data.find(row => row[6] === "Urgent" && row[5] !== "Completed");
      if (urgent) {
        document.getElementById("alertBanner").style.display = "block";
        document.getElementById("alertBanner").innerText =
          "🚨 Urgent Alert: " + urgent[3] + " issue at " + urgent[2];
      } else {
        document.getElementById("alertBanner").style.display = "none";
      }
    });
}
setInterval(checkUrgentIssues, 30000);
checkUrgentIssues();