const socket = io();

let url = '';

const form = document.getElementById('form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const fd = new FormData(form);
    url = fd.get('url');
    document.getElementById('url').textContent = url;
  });

socket.on('INCOMING', event => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  });
});
