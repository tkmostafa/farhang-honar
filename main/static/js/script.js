$(document).ready(function(){





/////////////////////////////////////////////////
/////////////get pages//////////////////////////
///////////////////////////////////////////////
var type="";
var type_id;
if(window.location.href.indexOf("all")>-1 || window.location.href.indexOf("home")>-1){
type="all";
type_id=-1;
}
else if(window.location.href.indexOf("group_posts")>-1){
    type="gp";
    type_id=parseInt($(".type_page").html().substr(2));
}
var pages=0;

do_ajax();
    $.ajax({
        type: "POST",
        url: "/get_pages/",
        dataType:"json",
        data:{
            name:type,
            type_id:type_id
        },
        success: function (data) {
            if(parseInt(data.result)<=3){
                for (var i=1;i<=parseInt(data.result);i++){
                    $(".pagination_menu").append("<a class="+'item'+" id="+'page'+i+">"+i+"</a>");
                    if($(".type_page").html()=="all")
                    $("#page"+i).attr("href",'/all/page/'+i);
                    else if($(".type_page").html().indexOf("gp")>-1)
                    $("#page"+i).attr("href",'/gp/'+$(".type_page").html().substr(2)+'/page/'+i);    
                }
                $("#page"+parseInt($(".active_page").html())).addClass("active");

            }
            else{
                    for (var i=parseInt($(".active_page").html())-1;i<=parseInt($(".active_page").html())+1;i++){
                        if(i!=0)
                    $(".pagination_menu").append("<a class="+'item'+" id="+'page'+i+">"+i+"</a>");
                    if($(".type_page").html()=="all")
                    $("#page"+i).attr("href",'/all/page/'+i);
                    else if($(".type_page").html().indexOf("gp")>-1)
                    $("#page"+i).attr("href",'/gp/'+$(".type_page").html().substr(2)+'/page/'+i);

                                            }                
                    $(".pagination_menu").append("<div class= 'disabled item' ></div>");
                    if(parseInt($(".active_page").html())+1<parseInt(data.result)-1){
                        
                    for (var i=parseInt(data.result)-1;i<=parseInt(data.result);i++){
                    $(".pagination_menu").append("<a class="+'item'+" id="+'page'+i+">"+i+"</a>");
                    if($(".type_page").html()=="all")
                    $("#page"+i).attr("href",'/all/page/'+i);
                    else if($(".type_page").html().indexOf("gp")>-1)
                    $("#page"+i).attr("href",'/gp/'+$(".type_page").html().substr(2)+'/page/'+i);
                        
                }   }
                else{
                    for (var i=parseInt($(".active_page").html())+2;i<=parseInt(data.result);i++){
                    $(".pagination_menu").append("<a class="+'item'+" id="+'page'+i+">"+i+"</a>");
                    if($(".type_page").html()=="all")
                    $("#page"+i).attr("href",'/all/page/'+i);
                    else if($(".type_page").html().indexOf("gp")>-1)
                    $("#page"+i).attr("href",'/gp/'+$(".type_page").html().substr(2)+'/page/'+i);
                    
                }   
                }

            }
        },
        error:function(){
            console.log("error");
        }
    });


/////////////////////////////////////////////////
/////////////like post /////////////////////////
///////////////////////////////////////////////

$(".like_item").on('click',function(event){
    event.preventDefault();
    event.stopPropagation();
    var id=$(this).attr("id");
    id=id.substr(4,id.length);
    do_ajax();
    $.ajax({
        type: "POST",
        url: "/like_post/",
        dataType:"json",
        data :{
            name:id
        },
        success: function (data) {
            $("#like_lable"+id).html(data.result);
        },
        error:function(){
            console.log("error");
        }
    });
});





   
/////////////////////////////////////////////////
/////////////dislike post /////////////////////////
///////////////////////////////////////////////

$(".dislike_item").on('click',function(event){
    event.preventDefault();
    event.stopPropagation();
    var id=$(this).attr("id");
    id=id.substr(7,id.length);
    do_ajax();
    $.ajax({
        type: "POST",
        url: "/dislike_post/",
        dataType:"json",
        data :{
            name:id
        },
        success: function (data) {
            $("#dislike_lable"+id).html(data.result);
        },
        error:function(){
            console.log("error");
        }
    });
});






   
/////////////////////////////////////////////////
/////////////like comment /////////////////////////
///////////////////////////////////////////////

$(".like_item_cm").on('click',function(event){
    event.preventDefault();
    event.stopPropagation();
    var id=$(this).attr("id");
    id=id.substr(7,id.length);
    console.log(id);
    do_ajax();
    $.ajax({
        type: "POST",
        url: "/like_cm/",
        dataType:"json",
        data :{
            name:id
        },
        success: function (data) {
            $("#like_lable_cm"+id).html(data.result);
        },
        error:function(){
            console.log("error");
        }
    });
});




   
/////////////////////////////////////////////////
/////////////dislike comment/////////////////////
///////////////////////////////////////////////


$(".dislike_item_cm").on('click',function(event){
    event.preventDefault();
    event.stopPropagation();
    var id=$(this).attr("id");
    id=id.substr(10,id.length);
    console.log(id);

    do_ajax();
    $.ajax({
        type: "POST",
        url: "/dislike_cm/",
        dataType:"json",
        data :{
            name:id
        },
        success: function (data) {
            $("#dislike_lable_cm"+id).html(data.result);
        },
        error:function(){
            console.log("error");
        }
    });
});


   
/////////////////////////////////////////////////
/////////////post mouseover/////////////////////
///////////////////////////////////////////////

$(".post").on('mouseenter',function(){
    $(this).css("top",-3);
});
$(".post").on('mouseleave',function(){
    $(this).css("top",+3);
});



   
/////////////////////////////////////////////////
/////////////about us///////////////////////////
///////////////////////////////////////////////

$("#about_us").click(function(){
    window.location.href="/about_us/";

});


   
/////////////////////////////////////////////////
/////////////contatc us/////////////////////////
///////////////////////////////////////////////

$("#contact_us").click(function(){
    window.location.href="/contact_us/";

});


$("#home").click(function(){
    window.location.href="/home/";
});



   
/////////////////////////////////////////////////
/////////////group posts////////////////////////
///////////////////////////////////////////////

$(".menu_item").click(function(){

    var name=$(this).attr("id");
    var str="/group_posts/"+name;
    window.location.href = str;

});



   
/////////////////////////////////////////////////
/////////////next post /////////////////////////
///////////////////////////////////////////////

$(".next_btn").click(function(){
    var id=$(this).attr("id").substr(2,$(this).attr("id").length);
    var str="/single/"+id;
    window.location.href=str;
});



   
/////////////////////////////////////////////////
/////////////latest posts/////////////////////////
///////////////////////////////////////////////

$(".latest_p").click(function(){
    var id=$(this).attr("id").substr(3,$(this).attr("id").length);
    var str="/single/"+id;
    window.location.href=str;
});




   
/////////////////////////////////////////////////
/////////////send comment///////////////////////
///////////////////////////////////////////////

$(".submit_comment").click(function(){
    var id=$(this).attr("id").substr(14,$(this).attr("id").length);
    do_ajax();
    $.ajax({
        type: "POST",
        url: "/send_comment/",
        dataType:"json",
        data :{
            name:$("#cm_name").val(),
            email:$("#cm_email").val(),
            text:$("#cm_cm").val(),
            id:id
                    },
        success: function (data) {
            window.location.reload();
        },
        error:function(){
            console.log("error");
        }
    });
});





   
/////////////////////////////////////////////////
/////////////login//////////////////////////////
///////////////////////////////////////////////

$("#login").click(function(){
    $('.ui.modal.login').modal({blurring: true}).modal('show');
});
$('.ui.accordion').accordion();
$('.ui.checkbox').checkbox();



   
/////////////////////////////////////////////////
/////////////form validation////////////////////
///////////////////////////////////////////////
    $('#asc')
  .form({
    f_name: {
      identifier : 'f_name',
      rules: [
        {  
          type   : 'empty',
          prompt : 'لطفا نام خود را وارد کنید'
        }
      ]
    },
    l_name: {
      identifier : 'l_name',
      rules: [
        {  
          type   : 'empty',
          prompt : 'لطفا نام خانوادگی خود را وارد کنید'
        }
      ]
    },
    email: {
      identifier : 'email',
      rules: [
        {
          type   : 'email',
          prompt : 'لطفا یک ایمیل معتبر ارائه کنید'
        }
      ]
    },
    username: {
      identifier : 'username',
      rules: [
        {
          type   : 'empty',
          prompt : 'لطفا نام کاربری خود را وارد کنید'
        }
      ]
    },
    password1: {
        identifier: 'password1',
        rules: [
          {
          type   : 'length[6]',
          prompt : 'رمز عبور شما باید حداقل شش رقم باشد'
        }
        ]
      },
      password2: {
        identifier: 'password2',
        rules: [
          {
          type   : 'length[6]',
          prompt : 'رمز عبور شما باید حداقل شش رقم باشد'
        },
        {
          type   : 'match[password1]',
          prompt : 'رمز ها مطابقت ندارند'
        }
        ]
      }
  });




   
/////////////////////////////////////////////////
/////////////register //////////////////////////
///////////////////////////////////////////////
$('.dropdown').dropdown({on: 'hover'});
$(".register_btn").click(function(){
 window.location.href="/register/";
});
$(".submit_btn").on('click',function(){

    if($("#asc").hasClass('success')){
        $("#reg_dimmer").addClass("active");
         do_ajax();
    $.ajax({
        type: "POST",
        url: "/reg_user/",
        dataType:"json",
        data :{
            f_name:$("#f_name").val(),
            l_name:$("#l_name").val(),
            email:$("#email").val(),
            username:$("#username").val(),
            password :$("#password1").val()
                    },
        success: function (data) {
            $("#reg_dimmer").removeClass("active");
            if(data.reg=="true"){
                    $('#success_reg')
                    .modal('show')
                    ;

            }
            else{
                  $('#error_reg')
                    .modal('show')
                    ;  
            }
        },
        error:function(){
            console.log("error");
        }
    });
    }
});
$("#confirm_reg").click(function(){
    if($("#inner_success_modal").hasClass("ok")){
    $('#success_reg')
    .modal('hide')
    ;    
    $("#inner_success_modal").removeClass("ok");
                $("#inner_success_modal").html("ثبت نام با موفقیت انجام شد");
    }
    else{
   window.location=/home/ 
    $('#success_reg')
    .modal('hide')
    ;
}

});

$("#confirm_err").on('click',function(){
    if($("#inner_error_modal").hasClass("ok2")){
$('#login_modal')
        .modal('show')
        ;
        $('#error_reg')
    .modal('hide')
    ;
       
     $("#inner_error_modal").removeClass("ok2");
                $("#inner_error_modal").html("این نام کاربری قبلا وجود داشته است مجددا امتحان کنید");

    }
    else{
    $('#error_reg')
    .modal('hide')
    ;
}
    $("#username_field").addClass("error");
});





   
/////////////////////////////////////////////////
/////////////login//////////////////////////////
///////////////////////////////////////////////
$("#login_submit").click(function(){
     $("#reg_dimmer2").addClass("active");
    do_ajax();
    $.ajax({
        type: "POST",
        url: "/login_user/",
        dataType:"json",
        data :{
            username:$("#login_username").val(),
            password :$("#login_password").val()
                    },
        success: function (data) {
            $("#reg_dimmer2").removeClass("active");
            if(data.reg=="true"){
                $("#inner_success_modal").html("سلام "+data.name+" خوش آمدید");
                $("#inner_success_modal").addClass("ok");
                    $('#success_reg')
                    .modal('show')
                    ;
                    $("#login").hide();

            }
            else{
                $("#inner_error_modal").html("نام کاربری و یا رمز عبور اشتباه است مجددا امتحان کنید");
                $("#inner_error_modal").addClass("ok2");

                  $('#error_reg')
                    .modal('show')
                    ;  
            }
        },
        error:function(){
            console.log("error");
        }
    });
});


/////////////////////////////////////////////////
/////////////search/////////////////////////////
///////////////////////////////////////////////

// $("#search").on('click',function(e){
//     e.preventDefault();
//     e.stopPropagation();
//     var search_text=$("#search_text").val();
//     do_ajax();
//     $.ajax({
//         type: "POST",
//         url: "/search_post/",
//         dataType:"json",
//         data :{
//             name:search_text
//                     },
//         success: function (data) {
//         },
//         error:function(){
//             console.log("error");
//         }
//     });
// });



});




       
/////////////////////////////////////////////////
////////////CSRF token//////////////////////////
///////////////////////////////////////////////
    function getCookie(name) {
        var cookieValue = null;
        var i = 0;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (i; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }



   
/////////////////////////////////////////////////
////////////ajax////////////////////////////////
///////////////////////////////////////////////
function do_ajax(){

var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
        crossDomain: true, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
}