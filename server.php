<?php
header('Content-Type: application/json; charset=utf-8');
include('./Markov-chain.php');
//error_reporting(0);

function markov_chain($dataset, $level)
{
    $json = [];
    $mkc = null;
    if (file_exists('./model-' . $level . '.dat')) {
        $mkc = MarkovChain::loadModel('./model-' . $level . '.dat');
    } else {
        $mkc = new MarkovChain($level); // 1-2 low cohesion and high creativity, 3-4 medium cohesion and creativity, 5+ high cohesion and low creativity
        $mkc->train($dataset);
        $mkc->saveModel('./model-' . $level . '.dat');
    }
    
    $json['markov'] = $mkc->generateText(200);
    return json_encode($json);
}

if (!empty($_GET['level'])) {
    if (file_exists('./model-' . $_GET['level'] . '.dat')) {
        echo markov_chain(null, $_GET['level']);
    } else {
        $csv = file_get_contents('./dataset/modified/all.csv');
        $arr = explode(';', $csv);
        echo markov_chain($arr, $_GET['level']);
    }
}
