$(function(){
    var service_type,apply_mode;

    $(".step_1_btn").click(function(){
        
        gotonext("step_2");
    })

    $(".step_2_btn").click(function(){

        $(".step_3 .service_type").removeClass("active");
        
        gotonext("step_3");
    })

    $(".step_3 .service_type").click(function(){ //選擇申辦類型

        if(!$(this).hasClass("active")){

            $(".step_3_res, .step_4, .step_5, .step_6").hide();

            $(".step_3 .service_type").removeClass("active");
            $(this).addClass("active");

            service_type = $(this).attr("type"); //申辦類型 new,NP,renew
            console.log(service_type);

            //檢查
			/*
            if( true ){
                //通過
                $(".step_3_res .pass").show();
                $(".step_3_res .not_sup").show();//demo show畫面
            }else{
                //不通過
                $(".step_3_res .pass").hide();
                $(".step_3_res .not_sup").show();
            }
            
            gotonext("step_3_res");
			*/
        }

        
    })

    $(".step_3_res .back_to_address").click(function(){
        scroll_h = $(".step_2").offset().top - $(".v2-o-header__header").height();
        $(".step_3, .step_3_res").hide();
        $('html, body').animate({
            scrollTop: scroll_h - 50
          },1000);
    })

    $(".step_4 .service_type").click(function(){

        if(!$(this).hasClass("active")){

            $(".step_5, .step_6").hide();

            $(".step_4 .service_type").removeClass("active");
            $(this).addClass("active");

            apply_mode = $(this).attr("type"); //通路：online,contact,store
            console.log(apply_mode);

            $(".step6_container").hide();
            $(".step6_container[type="+apply_mode+"]").show();
            
            if(apply_mode=="contact"){
                gotonext("step_5");
            }else{
                gotonext("step_6");
            }
            
        }

        
    })

    $(".step_5_btn").click(function(){

        //檢查表單

        if(true){
            gotonext("step_6");
        }
    })

    $(".step_6 .back_to_choose_apply_mode").click(function(){
        scroll_h = $(".step_4").offset().top - $(".v2-o-header__header").height();
        $(".step_4 .service_type").removeClass("active");
        $(".step_5, .step_6").hide();
        $('html, body').animate({
            scrollTop: scroll_h - 50
          },1000);
    })
})

function gotonext(to_go_stepNAME) {
    $("."+to_go_stepNAME).show();

    scroll_h = $("."+to_go_stepNAME).offset().top - $(".v2-o-header__header").height();
    console.log(scroll_h);

    $('html, body').animate({
        scrollTop: scroll_h - 50
      },
      1000);
}