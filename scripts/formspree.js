//console.log('in here');
if (document.readyState === 'complete' || document.readyState === 'loaded'){
    //console.log('loaded in');
    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("my-form");
    //var button = document.getElementById("my-form-button");
    let status = document.querySelector("#status");
    console.log(status);
    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      status.style.display = "flex";
      status.textContent =  "Thanks for submitting! I'll get back to you as soon as possible!";
    }

    function error() {
        status.style.display = "flex";
        status.textContent =  "Looks like there was a problem on submission :( Make sure the forms are filled, and try reloading the page.";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
        console.log('triggered');
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  };
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }