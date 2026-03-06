const sheetURL = "https://script.google.com/macros/s/AKfycbxU3PXTCS3euWFjncOuE2CLRtSxe2U4j76l4sgfJ7sNA17Yt0mQPLuh6U6K9LZz10O8TA/exec";

document.getElementById("issueForm").addEventListener("submit", function(e) {
  e.preventDefault();

  fetch(sheetURL, {
    method: "POST",
    body: new URLSearchParams({
      action: "submitIssue",
      name: document.getElementById("name").value,
      street: document.getElementById("street").value,
      issueType: document.getElementById("issueType").value,
      description: document.getElementById("description").value,
      priority: document.getElementById("priority").value,
      contact: document.getElementById("contact").value
    })
  })
  .then(response => response.text())
  .then(msg => {
    document.getElementById("alertBanner").style.display = "block";
    document.getElementById("alertBanner").style.background = "green";
    document.getElementById("alertBanner").innerText = msg;
  })
  .catch(() => {
    document.getElementById("alertBanner").style.display = "block";
    document.getElementById("alertBanner").style.background = "red";
    document.getElementById("alertBanner").innerText = "Error submitting issue!";
  });
});
