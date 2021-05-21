import 'firebaseui/dist/firebaseui.css';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { refs } from './refs';
//import { dropdown } from './dropdown';

const firebaseConfig = {
  apiKey: "AIzaSyB5ZbPgfierAYYds-3qTlc74zzln60Ycos",
  authDomain: "simple-sign-in-8e6e1.firebaseapp.com",
  projectId: "simple-sign-in-8e6e1",
  storageBucket: "simple-sign-in-8e6e1.appspot.com",
  messagingSenderId: "42374572557",
  appId: "1:42374572557:web:6c64b6c4471281c237c344",
  measurementId: "G-DZ8XTFPZXF"
};

firebase.initializeApp(firebaseConfig);

 const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig = {

  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
   firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  
  signInFlow: 'popup',
};

ui.start('#firebaseui-auth-container', uiConfig);


function dropdownAuth(element) {
  element.addEventListener('click', function () {
    element.classList.toggle('active');

    if (element.classList.contains('active')) {
      refs.signInBtn.addEventListener('click', function (e) {
        closeTargetElm(e.target, element);
      });
    } else {
      refs.signInBtn.removeEventListener('click', function (e) {
        closeTargetElm(e.target, element);
      });
    }
  });
}

function closeTargetElm(target, element) {
  if (target !== element) {
    element.classList.remove('active');
  }
}


dropdownAuth(refs.signInBtn);


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        refs.signInBtn.innerText = "Sign out";
        refs.signInBtn.addEventListener('click', signOutUser)
        refs.authContainer.style.display = 'none';
       //newClient();
    }
});

function signOutUser() {
  console.log('sign out');
  firebase
    .auth()
    .signOut()
    .then(() => {
      refs.signInBtn.style.display = 'flex';
      refs.authContainer.style.display = 'block';
      refs.signInBtn.addEventListener('click', dropdownAuth);
      location.reload();
    })
      .catch(error =>
          toastr.error(error.message));
}

// const docRef = firebase.database().ref('clients').push(user);
// console.log(docRef);

// async function  newClient(user) {
//            try {
//                const addClient = await firebase.database().ref('clients').push(newClinet)
//                console.log(addClient)
//            } catch (error) {
//                console.log(error.message)
//                throw error
//            }
//        }

