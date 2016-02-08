$(function () {
    
    //alert(jQuery);//ok
    $github_checkbox = $("#githubon");
    $local_checkbox = $("#localon");


    $ltime = $("#localtime");
    $gtime = $("#githubtime");
    $inputhash = $(".flexbox");
    $inputhash.click(function (e) {
        e.preventDefault();
        //一応完成。やったね！
        //okクリックされると<input>が増える。
        //tureはeventもコピーするか

        //flexboxのjqueryobjを全部取ってくる。その中から一番でかい数字を取ってくる。その後一番でかい数字に1を足す。
        //複数のflexbox
        
        //一番でかい数字を保管
        var num=0;
        $("div[class^='flexbox']").each(function (i) {
            let crr=$(this).attr("class").substr(-1,1);
           crr=crr-0;//str to int
           if(crr > num){
               num=crr;
           }
        });
        //せっかくがんばってif書いたのに使わずに行けたorz
        num++;
       let newElem= $(this).clone(true);
       newElem.insertAfter(this);
       newElem.attr("class","flexbox"+num);
    });
    $repo = $("#repo");
    $pass = $("#pass");
    $username = $("#username");

    $local_checkbox.click(background);
    $github_checkbox.click(background);
    function background(e) {
        //onにすると設定ができるようになる。
    }
    $(".save").click(checkmain);

    function checkmain(e) {
       console.log("checkmain");
       saveStrage(true);
       // check_inputdata();
        //sendgithub();
    }
    
    //データがちゃんと入力されているかどうか。
    function check_inputdata(){
        $ltime = $("#localtime");
        $gtime = $("#githubtime");
        $url = $("#url");
        $repo = $("#repo");
        $pass = $("#pass");
        $username = $("#username");
        let inputarray = [$ltime, $gtime, $url,$repo,$pass,$username];
        
        for(let i of inputarray){            
            if(i.val()===""){
                inputerror(i);
            }
        }
        
        
        
    }

    function sendgithub() {
        var user = $("#username").val();//.text();
        //inputにはval()を使う
        var xhr = new XMLHttpRequest();

        console.log($("#username"));
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var res = JSON.parse(this.responseText);
                saveStrage(dataparse(res))
            }
        });

        xhr.open("GET", "https://api.github.com/users/" + user + "/repos");
        xhr.send(null);

    }


    function dataparse(res) {
        let flag = false;
    
        //xhrで帰ってきたオブジェクトを整形して確認する。
        console.log(res);
        //配列にonjが入っている。
        //console.log(res.name);
        for (let data of res) {
            alert(data.name + "   " + $("#repo").val())
            if (data.name === $("#repo").val()) {
                alert("ありますねぇ！");
                flag = true;
            }
            return flag;
        }
    }


        function saveStrage(bool) {
            if (bool) {
                //あったらlocalstrageに保存
                
               var $ltime = $("#local_time");
               var $gtime = $("#github_time");
              
              
               var $url = $("#url");
               var $repo = $("#repo");
               var $pass = $("#pass");
               var $username = $("#username");
               
               var $flexbox = $("div[class^='flexbox']");
               var obj={};
               $flexbox.each(i){
                    var crr = $(this).attr("class").substr(-1, 1);
                    crr = crr - 0;//str to int
                    if(typeof crr==="number"&& !(isNaN(crr) ){
                        //子孫要素を取る
                        let xpath=$(this).find(".xpath").val();
                        let regexp=$(this).find(".regexp").val();
                        obj[regexp]=xpath;
                    }

               };

               
                let inputarray = [ $ltime,$gtime,$url, $repo, $pass, $username];
                
                
                //もしかしたらbackgroundscriptに投げることが必要かも
                for (var i of inputarray) {
                    // localStorage.setItem(i.attr("id"), i.val())
                    obj[i.attr("id")] = i.val()
                }
                chrome.storage.local.set(obj, function () { });
                chrome.storage.local.set(getRegEx_Xpath_object(), function () { });
                console.log(obj);
            } else {
        
                //なければダイアログを出す。
                //エラーが出てる部分の上に赤い文字でエラーを出したり、inputを赤くする。
            }

        }


        function inputerror(jq){
             //エラーが出てる部分の上に赤い文字でエラーを出したり、inputを赤くする。
            // jq.after("未入力です。")
             jq.css("border-color","#fb4721");
             jq.css("box-shadow","inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(233, 102, 102, 0.6)");
        }
        
    });


//同じ関数２つも書いてて死ゾ

//TODO: 一回localstrageを変える(他のタブに移動したり、ブラウザを再起動させると)消える？
//regexとxpathの組み合わせをオブジェクトにしていく。
//TODO:xpathに何も書いていなければ全ての要素を取る
function getRegEx_Xpath_object(){
    var obj={};
    
    var cnt=0;
    var url,xpath;
    while(url.val()&&xpath.val()){//どっちにも要素が存在するなら
        obj[url.val()]=xpath.val();
        cnt++;
        
        // url=$( ".url"+cnt) ) && xpath=$( ".xpath"+cnt ) をwhileにしたら
        //なんかバグってる
         url=$(".url"+cnt)
         xpath=$(".xpath"+cnt ) 
        
    }
    return JSON.stringify(obj);
}
