
async function askAeris() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const userInput = document.getElementById("userInput").value.trim();
  const responseBox = document.getElementById("response");

  if (!apiKey || !userInput) {
    responseBox.textContent = "Bitte gib sowohl API-Key als auch eine Nachricht ein.";
    return;
  }

  responseBox.textContent = "Aeris denkt ...";

  const res = await fetch("https://api.chutes.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      model: "deepseek-r1t-chimera",
      messages: [{ role: "user", content: userInput }]
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "Keine Antwort erhalten.";
  responseBox.textContent = reply;
}
