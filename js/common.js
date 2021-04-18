// gnb
var gnb = {
	
	gnb1depthList : []				// WEB Gnb 1depth List
	, gnb2depthCon : null			// WEB Gnb 2depth Container
	, gnbDim : null					// WEB Gnb Dim
		
	, init : function(){
		this.gnb1depthList = $(".gnb_con > li");
		this.gnbDim = $(".gnb_dim");
		
		this.registEvent();
	}

	, registEvent : function(){
		var _this = this;
		
		// WEB gnb 오버 시
		this.gnb1depthList.on("mouseenter", function(){
			var idx = _this.gnb1depthList.index(this);
			
			// gnb 2depth show
			_this.gnb2depthCon = $(_this.gnb1depthList[idx]).find("> ul"); 
			_this.gnb2depthCon.css({height: "auto", display: "block"});

			// gnb dim show
			var dimHeight = _this.gnb2depthCon[0].offsetHeight;
			_this.gnbDim.css({height: dimHeight, display: "block"});
		})
		
		// WEB gnb 아웃 시
		this.gnb1depthList.on("mouseleave", function(){
			_this.gnb2depthCon.css({height: 0, display: "none"});
			_this.gnbDim.css({height: 0, display: "none"});
		})
	}
}

// popup
var popup = {
	target : null

	, openPopup : function( id ){
		if( $(id).length > 0 ){
			this.target = $(id);
			var h, con = this.target.find(".popup_contents_con");

			this.target.addClass("active");
			if( window.outerHeight > con.height() && !this.target.hasClass("big") ){
				con.css({"margin-top": -con.height() / 2});
			}else{
				con.css({"margin-top": 0, "top": 0});
			}
		}else{
			alert("존재하지 않는 팝업을 호출하였습니다.");
			return;
		}
	}

	, closePopup : function(){
		this.target.removeClass("active");
		this.target = null;
	}
}

function setViewport() {
	if( $(window).width() <= 375 ) {
		var ww = ( document.documentElement.clientWidth < window.screen.width ) ? $(window).width() : window.screen.width;
		var mw = 375;
		var ratio = ww / mw;
		$('meta[name="viewport"]').attr( 'content', 'width=' + mw + ', initial-scale=' + ratio + ', user-scalable=no' );
	} else {
		$('meta[name="viewport"]').attr( 'content', 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' );
	}
}

window.onload = function() {
	gnb.init();
	
	// 운영중인 과정 slide
	var courseSwiper = new Swiper('.swiper-container', {
		slidesPerView: 1,
		spaceBetween: 10,
		// init: false,
		pagination: {
			el: '.pagination_con',
			clickable: true,
		},
		navigation: {
			prevEl: '.slide_arrow.left',
			nextEl: '.slide_arrow.right'
		},
		breakpoints: {
			768: {
			slidesPerView: 2,
			spaceBetween: 10,
			},
			1200: {
			slidesPerView: 3,
			spaceBetween: 21,
			}
		}
	});

	// go to Top
	$('.top_btn').on('click', function(){
		var body = $("html, body");
		body.stop().animate({scrollTop:0}, 200, 'swing');
	})

	// 회원가입 정보입력 - 회원유형 일반, 교원 선택
	$("input[name=m_type]").on("change", function(){
		if( $(this).val() === "teacher" ) $(".teacher_id_con").removeClass('d-none');
		else $(".teacher_id_con").addClass('d-none');
	});

	// viewport 설정
	setViewport();

	// faq toggle
	$(".faq_con dl dt").on('click', function(){
		if( !$(this).hasClass("on") ){
		  	$(".faq_con dl > *").removeClass("on");
		  	$(this).addClass("on");
		  	$(this).next("dd").addClass("on");
		  	$(this).siblings("dd").slideUp(100);
		} else {
		  	$(this).removeClass("on");
		  	$(this).next("dd").removeClass("on");
		}
		$(this).next("dd").slideToggle(100);
	});
}