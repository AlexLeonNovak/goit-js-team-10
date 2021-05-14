
 export function dropdown (element) {
	element.addEventListener('click', function () {
		this.classList.toggle('active');
		

		if (this.classList.contains('active')) {
			document.addEventListener('click', function (e) {
				closeTargetElm(e.target, element);
				
			});
		} else {
			document.removeEventListener('click', function (e) {
				closeTargetElm(e.target, element);
			});
		}
	});
};

function closeTargetElm(target, element) {
	if (target !== element) {
		element.classList.remove('active');
		target.closest('ul')
			.querySelectorAll('li')
			.forEach(el => el.classList.remove('current'));
		target.classList.add('current')
		element.value = target.innerText;
	}
}
