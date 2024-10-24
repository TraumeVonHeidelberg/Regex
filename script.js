// Funkcja, która aktualizuje tekst wyświetlany w span z flagami
function updateFlagsDisplay() {
	const selectedFlags = Array.from(document.querySelectorAll('.flags-list li.active'))
		.map(li => li.dataset.flag)
		.join('')

	// Aktualizacja widoku flag
	document.querySelector('.flag-marker').textContent = selectedFlags
	return selectedFlags
}

// Funkcja regexu z dynamicznymi flagami
function testRegex() {
	const regexInput = document.getElementById('regex').value
	const testString = document.getElementById('test-string').value
	const highlightedDiv = document.getElementById('highlighted')

	// Pobierz wybrane flagi z updateFlagsDisplay
	const flags = updateFlagsDisplay()

	try {
		const regex = new RegExp(regexInput, flags)

		// Ucieczka znaków specjalnych HTML
		const escapedText = testString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

		// Podświetlenie dopasowań
		const highlightedText = escapedText.replace(regex, match => `<span class="highlight">${match}</span>`)

		// Zamiana znaków nowej linii na <br>
		const finalText = highlightedText.replace(/\r\n|\r|\n/g, '<br>')

		highlightedDiv.innerHTML = finalText
	} catch (error) {
		// Jeśli wyrażenie regularne jest niepoprawne, wyświetl oryginalny tekst
		const escapedText = testString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
		const finalText = escapedText.replace(/\r\n|\r|\n/g, '<br>')
		highlightedDiv.innerHTML = finalText
		console.error(error)
	}
}

// Synchronizacja przewijania
function syncScroll() {
	const textarea = document.getElementById('test-string')
	const highlightedDiv = document.getElementById('highlighted')
	highlightedDiv.scrollTop = textarea.scrollTop
}

// Funkcja do obsługi kliknięcia na liście flag
function toggleFlag(event) {
	const li = event.currentTarget
	li.classList.toggle('active')

	// Zaktualizuj widok flag
	updateFlagsDisplay()

	// Ponownie uruchom regex z nowymi flagami
	testRegex()
}

// Nasłuchiwanie na kliknięcia w liście flag
document.querySelectorAll('.flags-list li').forEach(li => {
	li.addEventListener('click', toggleFlag)
})

// Uruchomienie regex przy zmianie wejść
document.getElementById('regex').addEventListener('input', testRegex)
document.getElementById('test-string').addEventListener('input', () => {
	testRegex()
	syncScroll()
})
document.getElementById('test-string').addEventListener('scroll', syncScroll)

// Inicjalizacja flag i regexu na starcie
updateFlagsDisplay()
testRegex()

const regexFlags = document.querySelector('.regex-flags')
const flagsList = document.querySelector('.flags-list')
const icon = document.querySelector('ion-icon')

regexFlags.addEventListener('click', () => {
	flagsList.style.display = 'flex'
	event.stopPropagation()
})
