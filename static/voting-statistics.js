insertModal();

const votingStatisticsButton = document.getElementById('voting-statistics');
const modal = document.querySelector('.vote-modal');
const closeButton = document.querySelector('.close-button');

function renderModalEvent(button) {
	button.addEventListener('click', function() {
		toggleModal();
		loadVotes(renderVotes)
	});

}

function closeModalOnWindowClick(event) {
	if (event.target === modal) {
		toggleModal()
	}
}

function createModalHtml() {
	return `
	<div class="vote-modal">
		<div class="vote-modal-content">
			<span class="close-button">&times;</span>
			<h1>Voting Statistics</h1>
			<div class="votes-table">
			
			</div>
		</div>
	</div>
	`
}

function toggleModal() {
	modal.classList.toggle('show-modal');

}

function insertModal() {
	let modal = createModalHtml();
	document.body.insertAdjacentHTML("beforeend",modal)
}

function loadVotes(callback) {
	fetch('/vote-statistics')
		.then(response => response.json())
		.then(data => callback(data))
}

function renderVotes(planets) {
	let votesHTML = '';
	for (planet of planets) {
		votesHTML += `
			<tr>
				<td scope="col">${planet['planet_name']}</td>
				<td scope="col">${planet.count}</td>
			</tr>
`
	}

	votesHTML = `
		<table class="text-center table table-striped">
			<tbody>
				${votesHTML}
			</tbody>
		</table>
		`;

	document.querySelector('.votes-table').innerHTML =  votesHTML
}

function main() {
	renderModalEvent(votingStatisticsButton);
	closeButton.addEventListener('click', toggleModal);
	window.addEventListener('click', closeModalOnWindowClick)

}

main();