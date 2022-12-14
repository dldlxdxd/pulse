$(document).ready(function(){
    $('.your-class').slick({
        speed: 1200,
        //adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.svg"></button>',
        responsive:[
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }   
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
        })
        
      });

      $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
        })
        
      });

      //Modal
      $('[data-modal=consultation]').on('click',function(){
          $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
      });
      
      $('.button_mini').each(function(i){
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        })
      });
    
      //Validation forms

      function valideForms(form){
        $(form).validate({
          rules:{
            name:{
              required: true,
              minlength: 2
            },
            phone:"required",
            email:{
              required:true,
              email:true
  
            }
          },
          messages: {
            name: {
              required: "????????????????????,?????????????? ???????? ??????",
              minlength: jQuery.validator.format("?????????????? {0} ????????????????")
            },
            phone:"????????????????????,?????????????? ???????? ??????????????",
            email: {
              required: "????????????????????,?????????????? ???????? ??????????",
              email: "?????????????????????? ???????????? ?????????? ??????????"
            }
          }
        });
      }

      valideForms('#consultation-form');
      valideForms('#consultation form');
      valideForms('#order form');


      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll pageup
    $(window).scroll(function() {
      if($(this).scrollTop()>1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });
    $("a.pageup").click(function() {
      $("html, body").animate({
         scrollTop: $($(this).attr("href")).offset().top + "px"
      }, {
         duration: 500,//???????????????? ??????????????????
         easing: "swing"//???????????? ??????????????????
      });
      return false;
   });

   //wow style animation css
   new WOW().init();
  });

  