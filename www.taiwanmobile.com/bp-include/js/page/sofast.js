
$(document).ready(function(){
    var sofast;
    var path = {};
    var city = ["台北市","新北市","桃園市","台中市","台南市","高雄市","新竹市","新竹縣","苗栗縣","彰化縣","南投縣","雲林縣","嘉義縣","屏東縣","宜蘭縣","花蓮縣"];
    var city_info;
    var area = '';
    var result;
    var count=0;

    console.log("ready");

    $.getJSON("/mobile/ssi/api/calculate/city.json", function(data){
        console.log("city");
        city_info = data["info"];
    });

    $.getJSON("/mobile/ssi/api/calculate/sofast.json", function(data) {
        sofast = data;

        console.log(sofast["question"]["content"]);
        //${ans(sofast["question"]["ans"],1)}
        question1 ='<div class="question calculate-box" level=1>'+
                        '<h3 class="headline-calculate-question">'+sofast["question"]["content"]+'</h3>'+
                        '<div class="content row calculate-answers">'+
                            '<div class="choose_btn calculate-answer col-12 col-sm" level="1" index="0">'+
                                '<div class="calculate-answer-inner">'+
                                    '<div class="calculate-answer-content">是</div>'+
                                '</div>'+
                            '</div>'+
                            "<a href='/mobile/calculate/allprice_3.html' class='calculate-answer col-12 col-sm' level='1' index='1'>"+
                                "<div class='calculate-answer-inner'>"+
                                    "<div class='calculate-answer-content'>否</div>"+
                                "</div>"+
                            "</a>"+
                        "</div>"+
                    "</div>"

        $("#calculate_recommend").html(question1);
    });

    $.getJSON("/mobile/ssi/api/calculate/sofast_result.json", function(data){
        result = data;
    });


    $("#calculate_recommend").on('click','.choose_btn',function(){
        //console.log($(this).attr("level"),$(this).attr("index"));
        path[$(this).attr("level")] = $(this).attr("index");
        //console.log(path);

        $(this).siblings(".choose_btn").removeClass("active");
        $(this).addClass("active");

        if( $(this).hasClass("city_btn") && area==''){
            alert("請選擇縣市/行政區");
        }else{
            show_question($(this).attr("level"),$(this).attr("index"));
        }

        scroll_to($(this).attr("level"));
    })

    $(document.body).on("change","select[name='city']",function(){
        area_info = '<option>--行政區--</option>';
        console.log($(this).val());
        choose_city = $(this).val();
        $.each(city_info,function(index,val){
            if(val['city']==choose_city){
                area_info += "<option val='"+val["MSO"]+"' mso='"+val["MSO"]+"'>"+val["area"]+"</option>";
            }
        })
        //console.log(area_info);
        $(".question").each(function(){
            if($(this).attr("level")>2){
                $(this).remove();
            }
        })
        area = '';
        $("select[name='area']").html(area_info);
    })

    $(document.body).on("change","select[name='area']",function(){

        area = $("select[name='area'] :selected").attr("val");
        console.log(area);
    })

    $(document.body).on("change","input[name='behavier']",function(){

        $(".question").each(function(){
            if($(this).attr("level")>4){
                $(this).remove();
            }
        })

        count=0;
        $("input[name='behavier']:checked").each(function(){
            count++
        })

        console.log(count);

        if(count>0){
            path[4]="0";
            console.log(path);
            show_question("4","0");
        }
    })

    $("#calculate_recommend").on("click",".recommend_btn",function(){
        console.log($(this).attr("type"),$(this).attr("standard"));

        $(this).parents(".recommend").find(".recommend_btn").removeClass("active");
        $(this).addClass("active");

        $(".result").remove();

        $("#calculate_recommend").append(result_layout($(this).attr("type"),$(this).attr("standard")));

        scroll_to(6);
    })



    function city_select() {
        city_option ='<option>--縣市--</option>';

        $.each(city,function(index,val){
            city_option += "<option val='"+val+"'>"+val+"</option>"
        })

        template =
        "<div class='calculate-answer col-sm col-12'>"+
            "<select name='city'>"+city_option+"</select>"+
        "</div>"+
        "<div class='calculate-answer col-sm col-12'>"+
            "<select name='area'>"+
                "<option>--行政區--</option>"+
            "</select>"+
        "</div>"+
        "<div class='calculate-answer col-sm col-12'>"+
            "<div class='choose_btn city_btn' level='2' index='0' >確認查詢</div>"+
        "</div>"+
        "<div class='calculate-answer col-sm col-12' style='min-width:30%'>"+
            "<a class='not_find' href='https://www.taiwanmobile.com/mobile/calculate/allprice_3.html'>找不到你的區域嗎?</br> 還可挑選手機/門號優惠專案，請點這裡</a>"+
        "</div>"


        return template;
    }

    function ans(data,level) {
        template = '';

        $.each(data,function(index,val){
            template += "<div class='choose_btn calculate-answer col-12 col-sm' level="+level+" index="+index+"><div class='calculate-answer-inner'><div class='calculate-answer-content'>"+val["content"]+"</div></div></div>";
        })
        return template;
    }

    function check_box_layout(data) {
        template = '';

        $.each(data,function(index,val){
            layout =
            '<label class="calculate-answer col-12 col-sm">'+
                '<input type="checkbox" name="behavier" value="'+index+'">'+
                "<div class='checkbox_btn'>"+
                    "<div class='calculate-answer-inner'>"+
                        "<div class='num'>"+(index+1)+"</div>"+
                        "<div class='calculate-answer-content'>"+val+"</div>"+
                    "</div>"+
                "</div>"+
            "</label>"

            template += layout;
        })
        return template;
    }

    function recommend_layout(data) {
        console.log("===================")
        console.log(data);
        data_length = (data.length==1)?"single":"uptosingle";
        type_temp = '<div class="row calculate-answers">';

        $.each(data,function(index,val){
            console.log("length:"+val["content"].length);
            amount = (val["content"].length==1)?"single":"uptosingle";

            content_temp = '';
            $.each(val["content"],function(index,content){
                type_class= (content["result"]["type"]=="D+")?"disney":"";
                content_temp +=
                '<div class="recommend_btn calculate-answer col-12 col-sm '+amount+' '+type_class+'" type="'+content["result"]["type"]+'" standard="'+content["result"]["standard"]+'">'+
                    '<div class="calculate-answer-inner">'+
                        "<div class='calculate-answer-content'>"+
                            '<div class="plan">'+content["plan"]+'</div>'+
                            '<div class="speed">'+content["speed"]+'</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'

            })

            type_temp +=
            '<div class="recommend_type calculate-answer col-12 col-sm '+data_length+'">'+
                '<div class="title">'+val["title"]+'</div>'+
                '<div class="content row calculate-answers">'+content_temp+'</div>'+
            '</div>'

        })

        type_temp += '</div>';
        return type_temp;
    }

    function recommend_layout_check(data) {
        console.log(data);
        template = '';
        if(count>2){
            console.log("111",count);
            template = recommend_layout(data["3"]);
        }else{
            console.log("222",count);
            template = recommend_layout(data[count]);
        }
        return template;
    }

    function result_layout(type,standard) {
        if(area=='K/T'){
            cta = '<a href="'+result[type]["plan"][standard]["link"]+'" class="btn btn-brand-orange btn-capsule">立即線上申辦</a>';
        }else{
            cta = '<a  class="btn btn-brand-gr btn-capsule">請至直營/加盟門市辦理</a>';
        }

        template =
        '<div class="question calculate-box-result result" level=7>'+
            '<p class="calculate-box-eyebrow">根據您的選擇分析，我們認為您適合以下資費：</p>'+
            '<div class="calculate-box-result-box">'+
                '<h4 class="headline-calculate-result">'+result[type]["plan"][standard]["title"]+'</h4> '+
                '<div class="calculate-box-result-content">'+
                    '<div class="bonus">'+result[type]["plan"][standard]["bonus"]+'</div>'+
                    result[type]["plan"][standard]["content"]+
                '</div> '+
            '</div>'+
            '<div class="calculate-box-buttons text-center">'+cta+'</div>'+
            '<div class="notice">'+result[type]["notice"]+'</div>'+
        '</div>'


        return template;
    }

    function show_question(level,index){
        next_question = '';
        ans_data = [];
        next_level = Number(level)+1;
        recommend = [];
        this_type = '';

        console.log(path);

        switch (level) {
                case "1":
                next_question   = sofast["question"]["ans"][index]["question"]["content"];
                ans_data        = sofast["question"]["ans"][index]["question"]["ans"];
                break;

                case "2":
                next_question   = sofast["question"]["ans"][path[1]]["question"]["ans"][index]["question"]["content"];
                ans_data        = sofast["question"]["ans"][path[1]]["question"]["ans"][index]["question"]["ans"];
                break;

                case "3":
                next_question   = sofast["question"]["ans"][path[1]]["question"]["ans"][path[2]]["question"]["ans"][index]["question"]["content"];
                ans_data        = sofast["question"]["ans"][path[1]]["question"]["ans"][path[2]]["question"]["ans"][index]["question"]["ans"];
                break;

                case "4":
                next_question   = sofast["question"]["ans"][path[1]]["question"]["ans"][path[2]]["question"]["ans"][path[3]]["question"]["ans"][index]["question"]["content"];
                ans_data        = sofast["question"]["ans"][path[1]]["question"]["ans"][path[2]]["question"]["ans"][path[3]]["question"]["ans"][index]["question"]["ans"];
                break;

                case "5":
                this_type       = sofast["question"]["ans"][path[1]]["question"]["ans"][path[2]]["question"]["ans"][path[3]]["question"]["ans"][path[4]]["question"]["ans"][index]["type"];
                recommend       = sofast["question"]["ans"][path[1]]["question"]["ans"][path[2]]["question"]["ans"][path[3]]["question"]["ans"][path[4]]["question"]["ans"][index]["recommend"];
                // ans_data        = sofast["question"]["ans"][path[1]]["question"]["ans"][path[2]]["question"]["ans"][path[3]]["question"]["ans"][path[4]]["question"]["ans"][index]["recommend"]["content"];
                break;

            default:
                break;
        }

        console.log(this_type);

        //關閉level之後的Question
        $(".question").each(function(){
            if($(this).attr("level")>level){
                $(this).remove();
            }
        })

        //show下一題
        if(level<5){

            if(level=='1' && index=='0'){
                this_content = city_select();

            }else if(level=='3' && index=='1'){
                this_content = check_box_layout(sofast["question"]["ans"][path[1]]["question"]["ans"][path[2]]["question"]["ans"][index]["question"]["checkbox"]);
            }else{
                this_content = ans(ans_data,next_level);
            }

            next_template =
            '<div class="question calculate-box" level='+next_level+'>'+
                '<h3 class="headline-calculate-question">'+next_question+'</h3>'+
                '<div class="content row calculate-answers">'+this_content+'</div>'+
            '</div>'

        }else{
            if(this_type=="check"){
                //console.log("in");
                this_content = recommend_layout_check(recommend);
                this_title = (index!="0")?"推薦給您以下專案":"推薦給您以下兩種專案";
            }else{
                this_content = recommend_layout(recommend);
                this_title = (recommend.length==1)?"推薦給您以下專案":"推薦給您以下兩種專案";
            }



            next_template =
            '<div class="question calculate-box recommend" level='+next_level+'>'+
                '<h3 class="headline-calculate-question">'+this_title+'</h3>'+
                this_content+
            '</div>'

        }

        $("#calculate_recommend").append(next_template);

    }

    function scroll_to(level) {

        to_level = Number(level)+1;
        console.log(to_level);

        scroll_H = $(".question[level="+to_level+"]").offset().top;
        console.log(scroll_H);

        $(window).animate({
            scrollTop: scroll_H - 80
        },500,"swing");
    }
})
