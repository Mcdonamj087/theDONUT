<?php

require_once './csrest_lists.php';

$auth = array('api_key' => 'T7dCQ35hXCBaRuJeD/Ks2yiuNWBH9InMDMk+OR9JJZqlb4e+tXw8550ScvCOxnFcx1CbRm/MVdXfBb30lYWyDn47MTU0PMEQ/bFxRJNyby1BqvrMmwxkWFSgZVJhM11oeXAI86whlSPyAzISt/pj0w==');
$wrap = new CS_REST_Lists('dd4b770b511bedd1b0b437e485674b84', $auth);

//The 6th argument will return the tracking preference of the subscribers - 'ConsentToTrack'
$result = $wrap->get_active_subscribers('2019-4-1', 1, 50, 'email', 'asc', true);

//$result = $wrap->get_active_subscribers(date('Y-m-d', strtotime('-30 days')), 
//  page number, page size, order by, order direction);

//echo "Result of GET /api/v3.1/lists/{ID}/active\n<br />";
if($result->was_successful()) {
    print json_encode($result->response);
} else {
    echo 'Failed with code '.$result->http_status_code."\n<br /><pre>";
    print json_encode($result->response);
}