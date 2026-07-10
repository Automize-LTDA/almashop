const fs = require('fs');
fetch('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/batman.svg')
  .then(res => res.text())
  .then(text => {
    fs.writeFileSync('batman.svg', text);
    console.log('Done');
  })
  .catch(console.error);
