// Detect if running inside GitHub Codespaces
const apiBase = window.location.hostname.includes("github.dev")
  ? "https://" + window.location.hostname.replace("github.dev", "app.github.dev").replace("-3000", "-8000")
  : "http://127.0.0.1:8000";

document.getElementById("loanForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    income: parseFloat(document.getElementById("income").value),
    loan_amount: parseFloat(document.getElementById("loan_amount").value),
    credit_score: parseFloat(document.getElementById("credit_score").value),
  };

  try {
    const response = await fetch(`${apiBase}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    document.getElementById("result").innerText = result.eligible
      ? "✅ Loan Approved!"
      : "❌ Loan Denied.";
  } catch (err) {
    document.getElementById("result").innerText = "⚠️ Error connecting to API.";
    console.error(err);
  }
});
