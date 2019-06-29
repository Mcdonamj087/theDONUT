/*!
 * donut-website v0.0.1
 * A description for your project.
 * (c) 2019 
 * MIT License
 * http://link-to-your-git-repo.com
 */

window.cfields = [];
window._show_thank_you = function(id, message, trackcmp_url) {
	var form = document.getElementById('_form_' + id + '_'), thank_you = document.querySelector('._form-thank-you');
	const formInputs = form.querySelectorAll('input');
	formInputs.forEach(input => input.value = '');
	console.log(id);
	/* thank_you.innerHTML = message; */
	thank_you.classList.add('active');
	if (typeof(trackcmp_url) != 'undefined' && trackcmp_url) {
		// Site tracking URL to use after inline form submission.
		_load_script(trackcmp_url);
	}
	if (typeof window._form_callback !== 'undefined') window._form_callback(id);
};
window._show_error = function(id, message, html) {
	var form = document.getElementById('_form_' + id + '_'), err = document.createElement('div'), button = form.querySelector('button'), old_error = form.querySelector('._form_error');
	if (old_error) old_error.parentNode.removeChild(old_error);
	err.innerHTML = message;
	err.className = '_error-inner _form_error _no_arrow';
	var wrapper = document.createElement('div');
	wrapper.className = '_form-inner';
	wrapper.appendChild(err);
	button.parentNode.insertBefore(wrapper, button);
	document.querySelector('[id^="_form"][id$="_submit"]').disabled = false;
	if (html) {
		var div = document.createElement('div');
		div.className = '_error-html';
		div.innerHTML = html;
		err.appendChild(div);
	}
};
window._load_script = function(url, callback) {
	var head = document.querySelector('head'), script = document.createElement('script'), r = false;
	script.type = 'text/javascript';
	script.charset = 'utf-8';
	script.src = url;
	if (callback) {
		script.onload = script.onreadystatechange = function() {
		if (!r && (!this.readyState || this.readyState == 'complete')) {
			r = true;
			callback();
			}
		};
	}
	head.appendChild(script);
};

