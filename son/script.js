const sounds = [{ file: "/son/tuy/ckoiça.aac", name: "C koi çaaa ?" }, { file: "/son/tuy/téléphone mobile.aac", name: "Téléphone mobile." }, { file: "/son/tuy/qui fait une blague.aac", name: "Qui fait une blague là?" }, { file: "/son/tuy/on prend 10 salaire.aac", name: "On prend 10% salaire." }, { file: "/son/tuy/il est con.aac", name: "Il est con." }, { file: "/son/tuy/protection absorband.aac", name: "Protection Absorband." }, { file: "/son/tuy/allez salut.mp3", name: "Allez salut."},{ file: "/son/tuy/ags.mp3", name: "AGS."},{ file: "/son/tuy/Hum.mp3", name: "Hum."},{ file: "/son/tuy/on a fait quoi dans la cave.mp3", name: "On a fait quoi dans la cave ?"},{ file: "/son/tuy/je mets dans le domaine.mp3", name: "Je le mets dans le domaine."},{ file: "/son/tuy/tu fou dans ton u et ca va marcher.mp3", name: "Tu fou dans ton U: et après ca va marcher."},{ file: "/son/tuy/vous glandez quoi.mp3", name: "Vous glandez quoi."},{ file: "/son/tuy/vous lancez le ghost.mp3", name: "Vous lancez le ghost."},{ file: "/son/tuy/son imprimante.mp3", name: "Son imprimante."},{ file: "/son/tuy/voala.mp3", name: "Voila."},{ file: "/son/tuy/qui veut argent de dylan moi.mp3", name: "Qui veut l'argent de Dylan ?"},{ file: "/son/tuy/cafe.mp3", name: "Qui veut un café ? Servez-vous."},{ file: "/son/tuy/imac.m4a", name: "iMac."},{ file: "/son/tuy/Hum2.m4a", name: "Hum 2."}];

const container = document.getElementById("button-container");

for (let i = 0; i < sounds.length; i++) {
	const sound = new Audio(sounds[i].file);
	const button = document.createElement("button");
	button.className = "sound-button";
	button.textContent = sounds[i].name;
	button.addEventListener("click", function () {
		sound.play();
	});
	container.appendChild(button);
}
