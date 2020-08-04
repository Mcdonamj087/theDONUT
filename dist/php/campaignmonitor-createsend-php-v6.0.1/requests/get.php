<?php

require_once '../csrest_subscribers.php';

unset($email); // clear server cache
$email = $_POST['email'];

if($email == ''){
	print '[{"success":false}]';
}else {
	$auth = array('api_key' => 'T7dCQ35hXCBaRuJeD/Ks2yiuNWBH9InMDMk+OR9JJZqlb4e+tXw8550ScvCOxnFcx1CbRm/MVdXfBb30lYWyDn47MTU0PMEQ/bFxRJNyby1BqvrMmwxkWFSgZVJhM11oeXAI86whlSPyAzISt/pj0w==');
	$wrap = new CS_REST_Subscribers('dd4b770b511bedd1b0b437e485674b84', $auth);
	
	//The 2nd argument will return the tracking preference of the subscriber - 'ConsentToTrack'
	$result = $wrap->get($email, true);
	
	//echo "Result of GET /api/v3.1/subscribers/{list id}.{format}?email={email}\n<br />";
	if($result->was_successful()) {
	//     echo "Got subscriber <pre>";
	    print json_encode($result->response);
	} else {
// 	    echo 'Failed with code '.$result->http_status_code."\n<br /><pre>";
	    print json_encode($result->response);
	}
}
