
const FCM = require('fcm-push');
const config=require('../config')


function enviarNotificaion(tokenDestinatario, mensaje) {
	var serverKey = config.server;
	var fcm = new FCM(serverKey);

	var message = {
	    to: tokenDestinatario, // required
	    collapse_key: '', 
	    data: {},
	    notification: {
	        title: 'Alerta',
	        body: mensaje,
	        //icon: "notificacion",
	        sound: "default",
	        color: "#00BCD4"
	    }
	};

	fcm.send(message, function(err, response){
	    if (err) {
	        console.log("Something has gone wrong!");
	    } else {
	        console.log("Successfully sent with response: ", response);
	    }
	});
}

function enviarData(tokenDestinatario, date,user) {
	var serverKey = config.server;
	var fcm = new FCM(serverKey);

	var message = {
	    to: tokenDestinatario, // required
	    collapse_key: '', 
	    data: {
	    	data:date,
	    	usuario:user
	    },
	    notification: {
	        title: 'Alerta',
	        body: date+" "+user,
	        //icon: "notificacion",
	        sound: "default",
	        color: "#00BCD4"
	    }
	};

	fcm.send(message, function(err, response){
	    if (err) {
	        console.log("Something has gone wrong!");
	    } else {
	        console.log("Successfully sent with response: ", response);
	    }
	});
}
module.exports={
		enviarNotificaion,
		enviarData
}