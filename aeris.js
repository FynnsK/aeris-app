
async function askAeris() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const userInput = document.getElementById("userInput").value.trim();
  const responseBox = document.getElementById("response");

  if (!apiKey || !userInput) {
    responseBox.textContent = "Bitte gib sowohl API-Key als auch eine Nachricht ein.";
    return;
  }

  responseBox.textContent = "Aeris denkt ...";

  try {
    const res = await fetch("https://api.chutes.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "tngtech/DeepSeek-R1T-Chimera",
        messages: [{ role: "user", content: userInput }]
      })
    });

    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error("Fehler " + res.status + ": " + errorText);
    }

    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error("Antwort ist kein JSON: " + text.slice(0, 100));
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Antwort war leer.";
    responseBox.textContent = reply;
  } catch (err) {
    responseBox.textContent = "Fehler bei der Anfrage: " + err.message;
  }
}
