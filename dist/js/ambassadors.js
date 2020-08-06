/*!
 * donut-website v0.0.1
 * A description for your project.
 * (c) 2020 
 * MIT License
 * http://link-to-your-git-repo.com
 */

const formSubmit = document.querySelector('#ambassador-signup-form button');
const formInput = document.querySelector('#ambassador-signup-form input[name="email"]');
const validationMessage = document.querySelector('.validation-message');


function getSubscriber(email){

  let alreadySubscribed;
	
  const form = new FormData();
  form.append("email", email);
  
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/php/campaignmonitor-createsend-php-v6.0.1/requests/get.php",
    "method": "POST",
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
  }
  
  jQuery.ajax(settings).done((function (response) {
		response = JSON.parse(response);
		if(response.Code == 1) {
      alreadySubscribed = false;
      console.log('User not found');
		} else {
      alreadySubscribed = true;
			console.log('User Found!');
		}
	  console.log(response);
  }));	
  
  return alreadySubscribed;
}


formSubmit.addEventListener('click', (function(e) {
  e.preventDefault();
  const val = formInput.value;

  if( validateEmail(val) ) {
    // console.log('success')
    if ( validationMessage.style.display == "block" ) {
      validationMessage.style.display = "none";
    }

    const alreadySubscribed = getSubscriber(val);

    

    
    // If VL subscriber logged in, log them out
    if(campaign.user) {
      campaign.logout();
    }
    
    // Identify email as either A) A new VL participant OR B) an existing VL participant
    campaign.identify({
      email: val
    }, (function() {

      if(alreadySubscribed === true) {
        window.location.href = 'http://localhost:3000/ambassadors-refer-a-friend.html';
      } else {
        window.location.href = 'http://localhost:3000/welcome.html';
      }

      // Redirect to refer-a-friend page
      // window.location.href = 'http://localhost:3000/ambassadors-refer-a-friend.html';
    }));
    
  } else {
    // Error
    validationMessage.style.display = "block";
  }
}));

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


