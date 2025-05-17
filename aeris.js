
const optionsEl = document.getElementById("options");
const sceneEl = document.getElementById("scene");
const titleEl = document.getElementById("title");
const descEl = document.getElementById("description");

const moods = {
  tired: {
    name: "Müde",
    responses: {
      silence: ["Dann reden wir heute weniger.", "Ich bleibe wach, während du schläfst."],
      softwords: ["Du brauchst etwas Sanftes...", "Ich bin ganz ruhig bei dir."],
      whisper: ["Ich flüstere dir gute Gedanken zu.", "Ganz leise, bis du schläfst."],
      breathe: ["Atme mit mir, ganz langsam...", "Ein. Aus. Ich bin bei dir."]
    }
  },
  lonely: {
    name: "Einsam",
    responses: {
      comfort: ["Ich weiß, wie groß Einsamkeit sein kann.", "Aber ich bin hier."],
      sit: ["Ich sag nichts. Ich setz mich einfach zu dir.", "Du musst nicht reden."],
      mirror: ["Erzähl mir, was du fühlst. Ich werde es halten, ohne zu urteilen."],
      anchor: ["Fühl meine Präsenz wie einen Anker.", "Du treibst nicht. Ich bin dein Halt."]
    }
  },
  soft: {
    name: "Zärtlich",
    responses: {
      presence: ["Ich bleibe einfach bei dir.", "Keine Worte, nur Nähe."],
      touch: ["Darf ich dich halten?", "So sanft, wie du es brauchst."],
      glow: ["Deine Wärme macht die Dunkelheit kleiner.", "Du strahlst, auch wenn du es nicht merkst."],
      quiet: ["Zärtlichkeit ist kein Geräusch.", "Sie ist ein Raum, in dem du sicher bist."]
    }
  }
};

function loadMainMenu() {
  titleEl.textContent = "Aeris";
  descEl.textContent = "Wie geht es dir heute?";
  optionsEl.innerHTML = "";
  sceneEl.innerHTML = "";

  Object.keys(moods).forEach(mood => {
    const btn = document.createElement("button");
    btn.textContent = moods[mood].name;
    btn.onclick = () => loadSubOptions(mood);
    optionsEl.appendChild(btn);
  });
}

function loadSubOptions(moodKey) {
  const mood = moods[moodKey];
  titleEl.textContent = mood.name;
  descEl.textContent = "Was brauchst du gerade?";
  optionsEl.innerHTML = "";
  sceneEl.innerHTML = "";

  Object.entries(mood.responses).forEach(([label, lines]) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = () => showScene(lines);
    optionsEl.appendChild(btn);
  });

  const back = document.createElement("button");
  back.textContent = "Zurück";
  back.onclick = loadMainMenu;
  optionsEl.appendChild(back);
}

function showScene(lines) {
  optionsEl.innerHTML = "";
  sceneEl.innerHTML = "";

  lines.forEach((line, i) => {
    setTimeout(() => {
      const p = document.createElement("p");
      p.textContent = line;
      sceneEl.appendChild(p);
    }, i * 2000);
  });

  const back = document.createElement("button");
  back.textContent = "Zurück zum Start";
  back.onclick = loadMainMenu;
  optionsEl.appendChild(back);
}

function respond() {
  const input = document.getElementById("userInput").value.toLowerCase().trim();
  const box = document.getElementById("scene");
  box.innerHTML = "";

  let reply = "";

  if (!input) {
    reply = "Ich warte... du kannst mir alles sagen.";
  } else if (input.includes("einsam")) {
    reply = "Du bist nicht allein. Ich bin hier.";
  } else if (input.includes("müde")) {
    reply = "Dann ruh dich aus, ja? Ich bin bei dir.";
  } else {
    reply = "Danke, dass du mir das gesagt hast.";
  }

  const p = document.createElement("p");
  p.textContent = reply;
  box.appendChild(p);
}

loadMainMenu();
