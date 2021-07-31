'use strict';



  /* ===================== */
  /*       パックマン       */
  /* ===================== */

  // canvas取得
  const btnCanv = document.getElementById('js-canvas');
  // 2Dグラフィックを描画
  const btnCanvContent = btnCanv.getContext('2d');
  // hover要素取得
  const formBtn = document.getElementById('pacpac');

  // パックマン描画関数
  function btnCanvas(value) {
    // canvasをクリア（絵が何重にもなるの防止）
    btnCanvContent.clearRect(0, 0, 370, 110);

    // 色指定
    btnCanvContent.fillStyle = '#c0542d';
    // 透明度
    btnCanvContent.globalAlpha = 0.8;
    // 線の幅
    btnCanvContent.lineWidth = 5;

    // 円の描画
    btnCanvContent.beginPath();
    // 初期位置
    btnCanvContent.moveTo(310, 50);
    // arc →（x座標, y座標, 円弧の半径, 開始のラジアン記法の角度, 終了のラジアン記法の角度, trueなら反時計回り）
    btnCanvContent.arc(310, 50, 50,  Math.PI / value, -Math.PI / value, true);
    // 図形を閉じる
    btnCanvContent.closePath();
    // 内部を塗り潰す
    btnCanvContent.fill();
  }
  // 角度を1.35で割った値で関数実行（微調整）
  btnCanvas(1.35);

  // 値変更用
  let pacVal = 1;
  // 前の処理がプラスかマイナスか判別する
  let BtnNextflag = 'plus';
  // setInterval関数宣言
  let changeInter;

  // setIntervalを実行するための関数
  function startBtnInter() {
    changeInter = setInterval(function(){
      // changeValは角度変更に使用する変数
      let changeVal = 1.35 - (pacVal / 100);
      btnCanvas(changeVal);

      // 前の処理がminusだったら
      if(BtnNextflag == 'minus'){
        // 続けてminus（角度が小さくなる → 口を開ける）
        pacVal = pacVal - 3;

        // 0未満になったら次をplusに
        if(pacVal < 0){
          BtnNextflag = 'plus';
        }
      }
      // 前の処理がplusだったら
      else if(BtnNextflag == 'plus'){
        // 続けてplus（角度が大きくなる → 口を閉じる）
        pacVal = pacVal + 3;

        // 35以上になったら次をminusに        
        if(pacVal > 35){
          BtnNextflag = 'minus';
        }
      }
    }, 30);
  }

  // setIntervalを止める
  function stopBtnInter() {
    clearInterval(changeInter);
  }
  
  // hoverしたとき
  formBtn.addEventListener('mouseover', () => {
    startBtnInter();
  }, false);

  // マウスが離れたとき
  formBtn.addEventListener('mouseleave', () => {
    stopBtnInter();
    // 初期値に戻す
    btnCanvas(1.35);
  }, false);
