document.getElementById("monBouton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;

    chrome.storage.local.get(["favoris"], function (result) {
      let favoris = result.favoris || [];

      if (!favoris.includes(url)) {
        favoris.push(url);

        chrome.storage.local.set({ favoris }, function () {
          console.log("URL ajoutée aux favoris !");
          afficherFavoris(); // on met à jour l'affichage
        });
      } else {
        console.log("URL déjà enregistrée !");
      }
    });
  });
});

function afficherFavoris() {
  chrome.storage.local.get(["favoris"], function (result) {
    const liste = document.getElementById("listeFavoris");
    liste.innerHTML = "";

    const favoris = result.favoris || [];

    favoris.forEach(function (url) {
      const li = document.createElement("li");
      const lien = document.createElement("a");
      lien.href = url;
      lien.textContent = url;
      lien.target = "_blank";
      lien.style.color = "#ecf0f1";
      lien.style.textDecoration = "none";
      li.appendChild(lien);
      liste.appendChild(li);
    });
  });
}

afficherFavoris();
