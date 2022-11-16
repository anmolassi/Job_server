document.getElementById('signup_btn').addEventListener("click",function (){
    console.log('change');
    var opaciy=document.getElementsByClassName("signup_body");
    var form=document.getElementById('form_sign_up');
    opaciy[0].style.display="flex";
    form.style.display='flex';
});
document.getElementById('signup_btn_rec').addEventListener("click",function (){
    console.log('change');
    var opaciy=document.getElementsByClassName("signup_body");
    var form=document.getElementById('form_sign_up_rec');
    opaciy[0].style.display="flex";
    form.style.display='flex';
});
document.getElementById('signn_btn_rec').addEventListener("click",function (){
    console.log('change');
    var opaciy=document.getElementsByClassName("signup_body");
    var form=document.getElementById('form_sign_in_rec');
    opaciy[0].style.display="flex";
    form.style.display='flex';
});
document.getElementById('join_now_btn').addEventListener("click",function (){
    console.log('change');
    var opaciy=document.getElementsByClassName("signup_body");
    var form=document.getElementById('form_sign_up');
    opaciy[0].style.display="none";
    form.style.display='none';
});
document.getElementById('join_now_btn_rec').addEventListener("click",function (){
    console.log('change');
    var opaciy=document.getElementsByClassName("signup_body");
    var form=document.getElementById('form_sign_up_rec');
    opaciy[0].style.display="none";
    form.style.display='none';
});