/*
Script para requisição e construção do menu de navegação.

Author: Afonso Alban
*/

var windowSize = $(window).width();

$(document).ready(function() {

	$.getJSON("api/nav.json", function(data){
		console.log(data.items);
		buildNav(data.items);
	});

	$('.open-menu-button').click(function(){
		if( $('#page-container').hasClass('open-menu') ){
			closeNav();
		}else{
			openNav();
		}
	});

	$('#content-container').click(closeNav);
});

var openNav = function(){
	$('#page-container').addClass('open-menu');
} 
var closeNav = function(){
	$('#page-container').removeClass('open-menu');
	$('nav .open').removeClass('open').children('ul').slideUp();
}

var buildNav = function(data){

	// limpa todo o HTML dentro do NAV de nível global
	$('nav .global').empty();

	var html = '';
	$.each(data, function(i, link){

		var cl = '';
		if (link.items.length > 0){
			cl = ' class="has-submenu"';
		}

		html += '<li'+ cl +'><a href="'+ link.url +'">'+ link.label +'</a>';

		if(cl){
			html += '<ul class="secondary">';
			$.each(link.items, function(j, sublink){
				html += '<li><a href="'+ sublink.url +'">'+ sublink.label +'</a></li>';
			});
			html += '</ul>';
		}

		html += '</li>';

	});

	$('nav .global').append(html);

	$('nav .global a').click(function(event){

		openNav();

		if( $(this).parent().hasClass('open') ){
			event.preventDefault();

			if(windowSize > 768){
				closeNav();
			}else{
				$(this).parent().removeClass('open').children('ul').slideUp();
			}
			return true;
		}

		$('nav .open').removeClass('open').children('ul').slideUp();

		if( $(this).parent().hasClass('has-submenu') ){
			event.preventDefault();
			$(this).parent().addClass('open').children('ul').slideDown();
		} else {
			closeNav();
			return true;
		}
	});

}