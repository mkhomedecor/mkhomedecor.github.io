//Recent product
var cookieList = function(cookieName) {
	//When the cookie is saved the items will be a comma seperated string
	//So we will split the cookie by comma to get the original array
	var cookie = $.cookie(cookieName);
	//Load the items or a new array if null.
	var items = cookie ? cookie.split(/,/) : new Array();
	return {
		"add": function(val) {
			var i;
			var check = false;
			for (i = 0; i< items.length;i++){
				if(val == items[i]){
					check= true;
				}
			}
			if(check == false){
				items.push(val);
			}
			//Save the items to a cookie.
			//EDIT: Modified from linked answer by Nick see
			//      http://stackoverflow.com/questions/3387251/how-to-store-array-in-jquery-cookie
			$.cookie(cookieName, items.join(','));
		},
		"remove": function (index) {
			items.splice(index, 1);
			$.cookie(cookieName, items.join(','));        },
		"clear": function() {
			items = null;
			$.cookie(cookieName, null);
		},
		"items": function() {
			return items;
		}
	}
}

function getProduct(alias) {

	Bizweb.getProduct(alias,function(product, variant){
		if(product.images.length == 0){
			var imgsrc = '<img style="min-height:unset;" src="//bizweb.dktcdn.net/thumb/large/assets/themes_support/noimage.gif" alt="'+product.name+'">'
			}else{
				var imgsrc = '<img style="min-height:unset;height:unset;" src="'+product.featured_image+'" alt="'+product.name+'">'
				}

		$('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 item">'
		  +'<div class="aside-content">'
		  +'<div class="product-mini-item product-mini-item-dx clearfix">'
		  +       '<div class="product-img relative">'
		  +           '<a class="image_thumb scale_hover"  href="'+product.url+'" title="'+ product.name +'">'
		  +               imgsrc
		  +           '</a>'
		  +       '</div>'
		  +      '<div class="product-info">'
		  +           '<h3 class="product-name">'
		  +               '<a href="'+product.url+'" title="'+product.name+'">'
		  +                   product.name
		  +              '</a>'
		  +           '</h3>'
		  +       '</div>'
		  +'</div>'
		  +'</div>'
		  +'</div>').appendTo('#recent-content');
	})
}
var list = new cookieList("MyItems");
list.add(alias);

var i;
var limit = list.items().length;
if(limit > getLimit){
	var fmit = limit - getLimit;
	var r;
	for(r = 0;r < fmit; r++ ){
		list.remove(r);
	}
}
for(i = limit-1;i >= 0; i-- ){
	getProduct(list.items()[i]);
	if (i == 0){
		setTimeout(function(e){
			$('.slickpro_recent').slick({
				autoplay: false,
				dots: false,
				arrows: true,
				infinite: false,
				speed: 300,
				rows: 5,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},1000)
	}
}