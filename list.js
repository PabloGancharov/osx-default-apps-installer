var listContainerElement = document.getElementsByClassName('list')[0];

var listElement = document.createElement('ol');

listContainerElement.appendChild(listElement);

list.forEach(function(element) {
  var li = document.createElement('li');
  var x = document.createElement('INPUT');

  x.setAttribute('type', 'checkbox');
  x.setAttribute('checked', true);
  x.setAttribute('class', 'itemToInstall');
  x.setAttribute('id', element.key);

  li.appendChild(x);
  li.appendChild(document.createTextNode(element.label));

  listElement.appendChild(li);
  console.log('.');

  if (element.requirePass) {
    li.classList.add('password');
    li.title = 'This will require password';
  }

  listElement.appendChild(li);
}, this);
