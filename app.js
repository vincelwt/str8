const notifier = require('node-notifier')
const path = require('path')

let delay = 10*1000 // 10 * 60  * 1000 10 minutes default
let notifyLoop = null

const messages = [
					"A friendly reminder for your posture", 
					"Do it for your mom, sit straight.", 
					"Dude, sit straight", 
					"Watch your back bro", 
					"Imagine what you'll look like in 20 years"
				]

const sendNotification = () => {
	// Send.notif
	let randomMessage = messages[ Math.floor(Math.random() * messages.length) ]

	notifier.notify({
		title: 'Sit Straight',
		message: randomMessage,
		// icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
		actions: ['Yes', 'No'],
		dropdownLabel: 'Were you?',
		sound: false, // Only Notification Center or Windows Toasters
		timeout: 10,
		wait: true // Wait with callback, until user action is taken against notification
	}, (err, response, metadata) => {

		if (response === 'activate') {
			
			let wasStraight = metadata.activationValue === 'Yes'

			// Adjust notification delay depending on user's posture			
			if (wasStraight) delay *= 2
			else delay = delay / 2

			clearInterval(notifyLoop)

			notifyLoop = setInterval(() => {
				sendNotification()
			}, delay)

		}

	})

}


notifyLoop = setInterval(() => {
	sendNotification()
}, delay)