document.addEventListener("DOMContentLoaded", function() {
  fetchData();
});
function fetchData() {
  fetch('https://hello-database-9000.herokuapp.com/api/users')
    .then(res => res.json())
    .then(users => {
      populateTable(users);
    });
}
function populateTable(users) {
  for (let user of users) {
    delete user._id;
    delete user.__v;
    let now = new Date();
    user.age = now.getFullYear() - new Date(user.birthday).getFullYear();
    let birthday = new Date(user.birthday);
    user.birthday = birthday.toLocaleDateString('es-AR');
    let row  = document.createElement('tr');
    for (let key in user) {
      let col = document.createElement('td');
      col.innerHTML = user[key];
      row.append(col);
    }
    document.getElementById('tbody').append(row);
  }
}
function fetchUser() {
  let id = document.getElementById('userID').value;
   if (isNaN(id)) return;
  fetch(`https://hello-database-9000.herokuapp.com/api/user/${id}`)
    .then(res => res.json())
    .then(user => {
      let users = [user]; 
      if (users[0] !== null) {
        let oldTBody = document.getElementById('tbody');
        let newTBody = document.createElement('tbody');
        newTBody.id = 'tbody';
        oldTBody.replaceWith(newTBody);
        populateTable(users);
        document.getElementById('table').hidden = false;
        document.getElementById('nores').innerHTML = '';
      } else {
        document.getElementById('table').hidden = true;
        document.getElementById('nores').innerHTML = 'No hay resultados';
      }
    });
}