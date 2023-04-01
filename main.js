// 変数を定義
let time = document.getElementById("time");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let resetButton = document.getElementById("resetButton");
let startTime;//開始時間
let nowTime;//現在の時間
let elapsedTime;//経過時間
let minutes;//分
let seconds;//秒
let hours;//時
let timerId;//setIntervalの格納用;
let holdTime;//ストップウォッチを止めるまでの経過時間を格納


//タイマー機能
function timer(){
  
  //現在の時間を取得
  nowTime = Date.now();
  
  //リスタートさせた場合の処理と0からスタートさせた場合の処理の条件分岐
  if(holdTime > 0){
    //経過時間 = 現在の時間-開始時間 + ストップウォッチを止めるまでの時間
    elapsedTime = nowTime - startTime + holdTime;
  }else{
    //経過時間 = 現在の時間-開始時間
    elapsedTime = nowTime - startTime;    
  }

  //ミリ秒を秒に直し、小数点以下1桁まで表示
  seconds = (elapsedTime / 1000) % 60;
  seconds = seconds.toFixed(1);
  
  //ミリ秒を分に直す
  minutes = Math.floor(elapsedTime / 1000 / 60) % 60;

  //ミリ秒を分に直す
  hours = Math.floor(elapsedTime / 1000 / 60 / 60) % 24;

  //timeテキストを書き換え
  time.textContent = hours + ":" + minutes + ":" + seconds;
};


// スタートボタン押下時の処理
function startTimer(){
  
  //開始時間を取得
  startTime = Date.now();
  
  //タイマー機能で0.1秒ごとに経過時間を書き換え、timerIdに格納
  timerId = setInterval(timer,100);  
  
  //スタートボタンを無効化
  startButton.disabled = true;
  
  //ストップボタンを有効化
  stopButton.disabled = false;
  
  //リセットボタンを有効化
  resetButton.disabled = false;
};


//ストップボタン押下時の処理
function stopTimer(){
  
  //setIntervalを止める
  clearInterval(timerId);
  
  //ストップウォッチの経過時間を格納
  holdTime = elapsedTime;

  //停止した際の経過時間が1秒未満の場合  
  if(elapsedTime < 1000){
    //初期値に戻す
    time.textContent = "0:0:0:0";
    
    //リセットボタンを無効化
    resetButton.disabled = true;
  }
  
  //ストップボタンを無効化
  stopButton.disabled = true;
  
  //スタートボタンを有効化
  startButton.disabled = false;

};


//リセットボタン押下時の処理
function resetTimer(){

  //setIntervalを止める
  clearInterval(timerId);
  
  //各時間を初期化
  nowTime = 0;
  startTime = 0;
  holdTime = 0;
  
  //テキストの表示を初期状態に戻す
  time.textContent = "0:0:0:0";
  
  //リセットボタンを無効化
  resetButton.disabled = true;
  
  //ストップボタンを無効化
  stopButton.disabled = true;
  
  //スタートボタンを有効化
  startButton.disabled = false;
}


$(document).ready(function(){
  // ここにjQueryの処理を書く
  
  //要素の位置を調節
  $("#startButton").click(function(){
    $("#time").css("font-size","30px");
    $("#time").css("margin-top","30px");
    $("#time").css("margin-left","20px");
    $(".buttons").css("margin-top","30px");
  });
});