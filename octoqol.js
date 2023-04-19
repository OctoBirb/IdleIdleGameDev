function ie(id) {return document.getElementById(id)}

function ut(id, text) {ie(id).textContent = text}

function br(num, digit) {return Math.round(num * (10 ** digit)) / (10 ** digit)}