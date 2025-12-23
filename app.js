document.getElementById("contact_button").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("contactPopup").style.display = "flex";
});

document.getElementById("contact-popup-submit").addEventListener("click", function (e) {
  e.preventDefault();

  const submitBtn = e.target;
  const originalBtnText = submitBtn.innerText;
  
  var email = document.getElementById("contact-popup-email").value;
  var message = document.getElementById("contact-popup-message").value;

  if (!email || !message) {
    alert("Please fill in all fields");
    return;
  }

  
  submitBtn.innerText = "Sending...";
  submitBtn.disabled = true;

  
  const scriptURL = 'https://script.google.com/macros/s/AKfycbydVfIVt1EjXqgAqKmPprjRh1vW9hwk14LRw4MhnnnhIqlJCO0iI6HJouZx-bznCWP9pA/exec';

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors', 
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, message: message })
  })
  .then(() => {
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;

    
    document.getElementById("contactPopup").style.display = "none";
    document.getElementById("submissionPopup").style.display = "flex";

    
    document.getElementById("contact-popup-email").value = "";
    document.getElementById("contact-popup-message").value = "";
  })
  .catch(error => {
    console.error('Error!', error.message);
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
    alert("Submission failed. Please check your console for errors.");
  });
});

function closeContactPopup() {
  document.getElementById("contactPopup").style.display = "none";
  document.getElementById("submissionPopup").style.display = "none";
}