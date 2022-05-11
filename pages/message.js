let inAuthor = document.querySelector('.added__author');
let inMessage = document.querySelector('.added__message');

// const arr = [];
let count = 0;

function addMessage() {

	const mess = {
		'author': inAuthor.value,
		'message': inMessage.value
	}
	// arr.push(mess);
	localStorage.setItem(`data${count}`, JSON.stringify(mess));
	console.log(JSON.parse(localStorage.getItem(`data${count}`)));

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