/*****************************************
  Inject UTM params into CM custom fields
******************************************/

/* Get url parameters helper function
   https://davidwalsh.name/query-string-javascript 
*/
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const subForms = document.querySelectorAll('#subForm');

if (subForms) {
  // console.log('form(s) exists!')
  const utmSource = getUrlParameter('utm_source');
  const utmCampaign = getUrlParameter('utm_campaign');
  const referrer = document.referrer == '' ? 'Direct' : document.referrer;

  subForms.forEach(form => {
    form.querySelector('input[name=cm-f-yhhllyd]').value = utmSource;
    form.querySelector('input[name=cm-f-ykqhyi]').value = utmCampaign;
    form.querySelector('input[name=cm-f-ykfdjl]').value = referrer;
  });
}
