function testRegex() {
	const regexInput = document.getElementById('regex').value
	const testString = document.getElementById('test-string').value
	const highlightedDiv = document.getElementById('highlighted')

	try {
		const regex = new RegExp(regexInput, 'gm')

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

function syncScroll() {
	const textarea = document.getElementById('test-string')
	const highlightedDiv = document.getElementById('highlighted')
	highlightedDiv.scrollTop = textarea.scrollTop
}

document.getElementById('regex').addEventListener('input', testRegex)
document.getElementById('test-string').addEventListener('input', () => {
	testRegex()
	syncScroll()
})
document.getElementById('test-string').addEventListener('scroll', syncScroll)
