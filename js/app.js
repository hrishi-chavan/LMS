var customer_data = [
  { name: 'Ajinkya Agalave', email: 'ajinkya.agalave@gmail.com', phone: '+919136213625' },
  { name: 'Hrishikesh Chavan', email: 'hrishikesh.chavan@yahoo.com', phone: '+918097588760' },
  { name: 'Prashant Khamkar', email: 'prashant.khamkar@hmail.com', phone: '+919892939523' },
];

window.addEventListener("hashchange", () => {
    navigateTo();
}, false,);

function navigateTo(page) {
  const app = document.getElementById('app');
  const urlString = page??window.location.hash.slice(1);
  let hash = urlString.split('?')[0];
  // Clear the content
  app.innerHTML = '';

  // Load page based on the navigation
  switch (hash) {
    case 'home':
      app.innerHTML = '<home-page></home-page>';
      
      break;
    case 'login':
      app.innerHTML = '<login-page></login-page>';
      break;
    case 'callerid':
      app.innerHTML = '<callerid-page></callerid-page>';
      break;
    default:
      app.innerHTML = '<login-page></login-page>';
  }
}

// Initial page load
navigateTo(window.location.hash === "" ? "login" : window.location.hash.slice(1));

function callStateChanged(state){
  let callComponent = document.querySelector('callerid-page');
  if(callComponent){
    callComponent.callStatus = state;
  }
  else{    
    localStorage.setItem("initCallState", state);
  }
}

function incomingCall(mobile){       
    window.location.hash = `callerid?m=${mobile}&d=in`;
    setTimeout(() => {
      callStateChanged("Ringing")  
    }, 1000);
    
}




