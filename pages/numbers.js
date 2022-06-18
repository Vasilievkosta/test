let num = document.querySelector('.num');
let btn = document.querySelector('.btn');
let tbody = document.querySelector('.tbody');

btn.onclick = () => {
    data = num.value;
    let b = userData(data);
}

let arrInputMin = [];

async function userData(data) {

    let res = await fetch('/desing', {
        method: 'POST',
        body: data
    });

    let result = await res.text();
    arrInputMin = result.split(',');
    outTable([arrInputMin]);
};

function outTable(arr) {

    for (let i = 0; i < arr.length; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < arr[i].length; j++) {
            let td = document.createElement('td');
            td.innerHTML = arr[i][j];
            tr.appendChild(td);
        }
        tbody.prepend(tr);
    }
}

(async () => {
    let response = await fetch('/getNumber');
    let user = await response.text();

    outTable(JSON.parse(user));
})();
