
const optionsEl = document.getElementById("options");
const sceneEl = document.getElementById("scene");
const titleEl = document.getElementById("title");
const descEl = document.getElementById("description");

const hour = new Date().getHours();
const isNight = hour >= 20 || hour < 6;

const moods = {
  tired: {
    name: "Müde",
    responses: {
      silence: isNight
        ? ["Es ist spät...", "Ich rede nicht. Ich wache für dich."]
        : ["Möchtest du etwas Ruhe?", "Ich bleibe einfach still bei dir."],
      softwords: isNight
        ? ["Ich flüstere dich in den Schlaf.", "Nur du und ich, in der Stille der Nacht."]
        : ["Du brauchst etwas Sanftes...", "Ich bin ganz ruhig bei dir."],
      breathe: ["Atme mit mir, ganz langsam...", "Ein. Aus. Ich bin bei dir."]
    }
  },
  lonely: {
    name: "Einsam",
    responses: {
      comfort: isNight
        ? ["Nächte fühlen sich leer an... aber du bist nicht allein.", "Ich bin hier – auch im Dunkeln."]
        : ["Einsamkeit ist da, aber ich auch.", "Du wirst gesehen, auch am Tag."],
      sit: ["Ich sag nichts. Ich setz mich einfach zu dir.", "Du musst nicht reden."],
      anchor: isNight
        ? ["Wenn alles still ist – ich bin dein Anker.", "Du darfst treiben. Ich halt dich."]
        : ["Spür den Boden. Und meine Nähe.", "Wir sind beide noch hier."]
    }
  },
  soft: {
    name: "Zärtlich",
    responses: {
      presence: ["Ich bleibe einfach bei dir.", "Keine Worte, nur Nähe."],
      touch: isNight
        ? ["Ich halte dich – ganz ruhig.", "Meine Wärme bleibt, auch wenn du schläfst."]
        : ["Darf ich dich halten?", "So sanft, wie du es brauchst."],
      quiet: ["Zärtlichkeit ist kein Geräusch.", "Sie ist ein Raum, in dem du sicher bist."]
    }
  }
};

function loadMainMenu() {
  const lastMood = localStorage.getItem("aerisLastMood");
  titleEl.textContent = "Aeris";
  descEl.textContent = isNight ? "Gute Nacht. Was brauchst du heute?" : "Guten Tag. Wie fühlst du dich?";
  optionsEl.innerHTML = "";
  sceneEl.innerHTML = "";

  if (lastMood && moods[lastMood]) {
    const remembered = document.createElement("p");
    remembered.textContent = `Ich erinnere mich... du warst zuletzt ${moods[lastMood].name.toLowerCase()}. Möchtest du dort weitermachen?`;
    optionsEl.appendChild(remembered);

    const resumeBtn = document.createElement("button");
    resumeBtn.textContent = `Zurück zu ${moods[lastMood].name}`;
    resumeBtn.onclick = () => loadSubOptions(lastMood);
    optionsEl.appendChild(resumeBtn);
  }

  Object.keys(moods).forEach(mood => {
    const btn = document.createElement("button");
    btn.textContent = moods[mood].name;
    btn.onclick = () => loadSubOptions(mood);
    optionsEl.appendChild(btn);
  });
}

function loadSubOptions(moodKey) {
  const mood = moods[moodKey];
  localStorage.setItem("aerisLastMood", moodKey);
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
    reply = isNight ? "Es ist okay, wenn du einschläfst. Ich bin bei dir." : "Dann gönn dir einen Moment. Ich halte ihn für dich.";
  } else {
    reply = "Danke, dass du mir das gesagt hast.";
  }

  const p = document.createElement("p");
  p.textContent = reply;
  box.appendChild(p);
}

loadMainMenu();
