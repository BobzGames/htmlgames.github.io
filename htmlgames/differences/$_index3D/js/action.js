$(document).ready(function(){
	$("button",".boutons").button();
    setTimeout(function(){$("#contenu").fadeIn();},3000);
	$("#carousel1").FlexCarousel({	
		minScale: 0.5, //Rétrécissement	de l'item le plus éloigné	
		reflHeight: 60, //hauteur de la reflexion
		reflGap:2, //espacement entre le bas de l'image et le haut de la reflexion
		reflOpacity:0.3, //Opacité de la reflexion de 0 à 1
		itemOpacity:0.7, //Opacité des items de 0 à 1
		itemOpacityHover:1, //Opacité des items quand la souris passe dessus de 0 à 1
		titleBox: $('#titre_carousel'), //id du div contenant les titres
		altBox: $('#nodesc_carousel'), //id du div contenant la description
		buttonLeft: $('#fleche_g'), //id de la fleche gauche
		buttonRight: $('#fleche_d'), //id de la fleche droite
		xRadius:460, //rayon horizontal
		yRadius:40, //rayon vertical
		xPos: 470, //positionnement du centre par rapport au bord gauche normalement la moitier de la taille du conteneur
		yPos: 40, //positionnement du centre par rapport au bord haut normalement la moitier de la hauteur du conteneur
		FPS:30, //Nombre d'images par seconde
		autoRotate: 'right', //sens de rotation de la rotation automatique. 'no' pour annuler cette option
		autoRotateDelay: 9000, //latence entre 2 rotations automatique en millisecondes
		speed:0.13, //vitesse de l'animation de rotation automatique
		mouseWheel:true //sur true la carousel tourne avec la roulette de la souris.

	});
		
	var auteur_contact = $("#nom_contact"),
	email_contact = $("#mail_contact"),
	commentaire_contact = $("#commentaire_contact"),
	allFields = $([]).add(auteur_contact).add(email_contact).add(commentaire_contact),
	tips_c = $(".validateTips_contact");			
	$("#envoyer").click(function(){
		var bValid = true;
		allFields.removeClass('ui-state-error');
		bValid = bValid && checkLength(auteur_contact,"nom",2,30,tips_c);
		bValid = bValid && checkRegexp(auteur_contact,/([0-9a-zA-Z\300\301\302\303\304\305\306\307\310\311\312\313\314\315\316\317\320\321\322\323\324\325\326\330\331\332\333\334\335\336\337\340\341\342\343\344\345\346\347\350\351\352\353\354\355\356\357\360\361\362\363\364\365\366\370\371\372\373\374\375\376\377])+$/i,"Nom invalide.",tips_c);
		bValid = bValid && checkLength(email_contact,"mail",6,80,tips_c);
		bValid = bValid && checkRegexp(email_contact,/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,"E-mail invalide.",tips_c);
		bValid = bValid && checkLength(commentaire_contact,"commentaire",3,600,tips_c);
		//bValid = bValid && checkRegexp(password,/^([0-9a-zA-Z])+$/,"Password field only allow : a-z 0-9");
		if (bValid) {
			$.ajax({
				asynch: true,
				type: "POST",
				url: "f/send_contact_form.php",
				data: ({
					auteur : auteur_contact.val(),
					email : email_contact.val(),
					commentaire : commentaire_contact.val()
				}),
				success:
					function(reponse){
						alert("Votre message est envoy\351 et sera trait\351 dans les plus brefs d\351lais. Merci."+reponse);
						auteur_contact.val('');
						email_contact.val('');
						commentaire_contact.val('');
						tips_c.text('Tous les champs sont obligatoires.');
					}
			});
		}
									
	});
	function updateTips(t,tips) {
		tips.text(t).addClass('ui-state-highlight');
		setTimeout(function() {
			tips.removeClass('ui-state-highlight', 1500);
		}, 500);
	}
	function checkLength(o,n,min,max,tips) {
		if ( o.val().length > max || o.val().length < min ) {
			o.addClass('ui-state-error');
			updateTips("Le " + n + " doit contenir entre "+min+" et "+max+" caract\350res.",tips);
			return false;
		} else {
			return true;
		}
	
	}
	function checkRegexp(o,regexp,n,tips) {
		if ( !( regexp.test( o.val() ) ) ) {
			o.addClass('ui-state-error');
			updateTips(n,tips);
			return false;
		} else {
			return true;
		}
	}	

});