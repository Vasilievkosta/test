
let inAuthor = document.querySelector('.added__author');
let inMessage = document.querySelector('.added__message');

let count = localStorage.length;

function addMessage() {

	const mess = {
		'author': inAuthor.value,
		'message': inMessage.value
	}

	localStorage.setItem(`data${count}`, JSON.stringify(mess));
	// console.log(JSON.parse(localStorage.getItem(`data${count}`)));

	count++;

	let outItem = document.createElement('li');
	let outAuthor = document.createElement('p');
	let outMessage = document.createElement('p');

	outAuthor.textContent = inAuthor.value;
	outMessage.textContent = inMessage.value;

	inAuthor.value = '';
	inMessage.value = '';

	outItem.classList.add('out__item');
	outAuthor.classList.add('out__author');
	outMessage.classList.add('out__message');

	outItem.append(outAuthor);
	outItem.append(outMessage);
	document.querySelector('.out__list').append(outItem);
}

document.querySelector('.added__btn').onclick = addMessage;

for (let i = 0; i < localStorage.length; i++) {
	let key = localStorage.key(i);
	let oneData = JSON.parse(localStorage.getItem(key));
	let element = (`<li class="out__item">
	<p class="out__author">${oneData.author}</p>
	<p class="out__message">${oneData.message}</p>
	</li>`);
	document.writeln(element);
}
