const defultSwapiURL = "https://swapi.co/api/planets/?page=1";


function createNewRow(planet) {
	const planetsList = document.getElementById("planets-list");

	const row = document.createElement("tr");
	row.id = planet.name;

	createPlanetColumns(planetsList, row, planet);

	createResidentsButton(row, planet);

	createVoteButton(row, planet);

	createResidentsModal(planet);
}


function createPlanetColumns(container, row, planet) {
	row.innerHTML = `
			<td>${planet.name}</td>
			<td>${planet.diameter}</td>
			<td>${planet.climate}</td>
			<td>${planet.terrain}</td>
			<td>${planet.surface_water}</td>
			<td>${planet.population}</td>
		`;

	container.appendChild(row);
}


function getNumberOfResidents(residentsUrls) {
	const promises = residentsUrls.map(function (url) {
		return fetch(url).then(response => response.json())
	});

	return promises.length
}


function createResidentsButton(row, planet) {
	let residentsNumber = getNumberOfResidents(planet.residents);

	if (residentsNumber === 0) {
		row.insertAdjacentHTML("beforeend", `<td>No known residents</td>`);
	} else {
		row.insertAdjacentHTML("beforeend", `
		<td>		
			<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${planet.name.replace(/\s/g,'')}ModalResidents">
				${residentsNumber} resident(s)
			</button>
		</td>
		`)
	}
}


function createResidentsModal(planet) {
	const container = document.getElementById("modals-container");

	container.insertAdjacentHTML("beforeend", `
	<!-- Modal -->
	<div class="modal fade" id="${planet.name.replace(/\s/g,'')}ModalResidents" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
	     aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="exampleModalLabel">Residents of ${planet.name}</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<table class="table table-striped">
						<thead>
							<tr>
								<td scope="col">Name</td>
								<td scope="col">Height</td>
								<td scope="col">Mass</td>
								<td scope="col">Hair color</td>
								<td scope="col">Skin color</td>
								<td scope="col">Eye color</td>
								<td scope="col">Birth year</td>
								<td scope="col">Gender</td>
							</tr>
						</thead>
						<tbody id="${planet.name}-residents">
						<!-- to be filled later with residents-->
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	`);

	showResidentsModal(planet);
}


function createVoteButton(row, planet) {
	row.insertAdjacentHTML("beforeend", `
	<td>		
		<button type="button" 
		class="btn btn-primary" 
		id="${planet.name.replace(/\s/g,'')}-vote"
		data-planet="${planet.name}">
			Vote
		</button>
	</td>
	`);

	document.getElementById(`${planet.name.replace(/\s/g, '')}-vote`)
	.addEventListener('click', function() {
		fetch('/vote', {
			headers: {"Content-Type": "application/json; charset=utf-8"},
			method: 'POST',
			body: JSON.stringify({
				planet: planet.name,
		})
	})
	})

}


function showResidentsModal(planet) {
	const residentsModal = document.getElementById(`${planet.name}-residents`);

	let residentsURLs = planet.residents;

	const promises = residentsURLs.map(function (url) {
		return fetch(url).then(response => response.json())
	});

	Promise.all(promises).then(residents => {
		for (let resident of residents) {
			residentsModal.insertAdjacentHTML("beforeend",
				`
				<tr>
					<td>${resident.name}</td>
					<td>${resident.height}</td>
					<td>${resident.mass}</td>
					<td>${resident.hair_color}</td>
					<td>${resident.skin_color}</td>
					<td>${resident.eye_color}</td>
					<td>${resident.birth_year}</td>
					<td>${resident.gender}</td>
				</tr>
			`);

		}
	})
}


function loadPlanetList (swapiURL) {
	fetch(swapiURL)
	.then(function (response) {
		return response.json()
	})
	.then(function (planets) {
		assignUrlToNavButton(planets);

		for (let planet of planets.results) {
			createNewRow(planet)
		}
	});
}


function assignUrlToNavButton(planets) {
	let nextButton = document.getElementById("next-results");
	let previousButton = document.getElementById("previous-results");

	if (planets.next) {
		nextButton.setAttribute("data-nextPage", planets.next);
		nextButton.disabled = false
	} else {
		nextButton.setAttribute("data-nextPage", "");
		nextButton.disabled = true
	}

	if (planets.previous) {
		previousButton.setAttribute("data-previousPage", planets.previous);
		previousButton.disabled = false
	} else {
		previousButton.setAttribute("data-previousPage", "");
		previousButton.disabled = true
	}
}


window.onload = loadPlanetList(defultSwapiURL);


let addEventListenersToNavButtons = (function() {
	document.getElementById("next-results").addEventListener("click", function() {
		document.getElementById("planets-list").innerHTML = "";
		document.getElementById("modals-container").innerHTML = "";
		loadPlanetList(this.dataset.nextpage)
	});

	document.getElementById("previous-results").addEventListener("click", function() {
		document.getElementById("planets-list").innerHTML = "";
		document.getElementById("modals-container").innerHTML = "";
		loadPlanetList(this.dataset.previouspage)
	})
})();