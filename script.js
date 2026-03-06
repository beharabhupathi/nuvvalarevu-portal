const sheetURL = "https://script.google.com/macros/s/AKfycbxU3PXTCS3euWFjncOuE2CLRtSxe2U4j76l4sgfJ7sNA17Yt0mQPLuh6U6K9LZz10O8TA/exec";

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
// Fetch all issues from backend
function loadIssues() {
  fetch(sheetURL + "?action=allIssues")
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById("issuesBody");
      tbody.innerHTML = "";

      data.forEach(issue => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${issue.ID}</td>
          <td>${issue.Name}</td>
          <td>${issue.Street}</td>
          <td>${issue.IssueType}</td>
          <td>${issue.Description}</td>
          <td>${issue.Priority}</td>
          <td>${issue.Contact}</td>
          <td>${issue.Status}</td>
          <td>
            <select onchange="updateStatus(${issue.ID}, this.value)">
              <option value="">--Change--</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </td>
        `;

        tbody.appendChild(row);
      });
    });
}

// Update status via backend
function updateStatus(issueId, newStatus) {
  fetch(sheetURL, {
    method: "POST",
    body: new URLSearchParams({
      action: "updateStatus",
      issueId: issueId,
      newStatus: newStatus,
      updatedBy: "Admin Bhupathi" // or dynamic admin name
    })
  })
  .then(response => response.text())
  .then(msg => {
    alert(msg);
    loadIssues(); // reload table after update
  });
}

// Load issues when dashboard opens
document.addEventListener("DOMContentLoaded", loadIssues);
