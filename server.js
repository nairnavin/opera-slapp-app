'use strict'

const express = require('express')
const Slapp = require('slapp')
const ConvoStore = require('slapp-convo-beepboop')
const Context = require('slapp-context-beepboop')

var botflow = require('./techbotflow.json');
var navin = 'U2ST254HY';
var andy = '';

function getFirstMessage() {
	return getAttachmentMessage('Greetings');
}

function getAttachmentMessage(msgName) {
	for(var i = 0; i < botflow.messages.length; i++) {
		if (msgName == botflow.messages[i].message_name ) {
			return botflow.messages[i];
		}
	}
}


// use `PORT` env var on Beep Boop - default to 3000 locally
var port = process.env.PORT || 3000

var slapp = Slapp({
  // Beep Boop sets the SLACK_VERIFY_TOKEN env var
  verify_token: process.env.SLACK_VERIFY_TOKEN,
  convo_store: ConvoStore(),
  context: Context()
})



var HELP_TEXT = `
I will respond to the following messages:
\`help\` - to see this message.
\`hi\` - to demonstrate a conversation that tracks state.
\`thanks\` - to demonstrate a simple response.
\`<type-any-other-text>\` - to demonstrate a random emoticon response, some of the time :wink:.
\`attachment\` - to see a Slack attachment message.
`




//*********************************************
// Setup different handlers for messages
//*********************************************

// response to the user typing "help"

slapp.event('hello', (msg) => {
  console.log("Connection opened, Hi there")
})

slapp.message('help', ['mention', 'direct_message'], (msg) => {
  msg.say(HELP_TEXT)
})

// "Conversation" flow that tracks state - kicks off when user says hi, hello or hey
slapp
  .message('^(hi|hello|hey)$', ['direct_mention', 'direct_message'], (msg, text) => {
  
  if(msg.meta.user_id == navin) {
    console.log("This is Navin, a supervisor");
    console.log("Loading supervisor botflow");
    botflow = require('./botflow.json');
  }
  else {
    console.log("Default technician botflow");
  }    
  msg.say(getFirstMessage())

})

slapp.action('Greetings', 'action', (msg, value) => {
  msg.say(getAttachmentMessage(value))
})

slapp.action('Daily-Review', 'action', (msg, value) => {
  //console.log(value)
  msg.say(getAttachmentMessage(value))
})

slapp.action('Operations', 'action', (msg, value) => {
  //console.log(value)
  msg.say(getAttachmentMessage(value))
})

slapp.action('Review-Well', 'action', (msg, value) => {
  //console.log(value)
  msg.say(getAttachmentMessage(value))
})

//This is a test

  /*
  .route('how-are-you', (msg, state) => {
    var text = (msg.body.event && msg.body.event.text) || ''

    // user may not have typed text as their next action, ask again and re-route
    if (!text) {
      return msg
        .say("Whoops, I'm still waiting to hear how you're doing.")
        .say('How are you?')
        .route('how-are-you', state)
    }

    // add their response to state
    state.status = text

    msg
      .say(`Ok then. What's your favorite color?`)
      .route('color', state)
  })
  .route('color', (msg, state) => {
    var text = (msg.body.event && msg.body.event.text) || ''

    // user may not have typed text as their next action, ask again and re-route
    if (!text) {
      return msg
        .say("I'm eagerly awaiting to hear your favorite color.")
        .route('color', state)
    }

    // add their response to state
    state.color = text

    msg
      .say('Thanks for sharing.')
      .say(`Here's what you've told me so far: \`\`\`${JSON.stringify(state)}\`\`\``)
    // At this point, since we don't route anywhere, the "conversation" is over
  })
    */
// Can use a regex as well
slapp.message(/^(thanks|thank you)/i, ['mention', 'direct_message'], (msg) => {
  // You can provide a list of responses, and a random one will be chosen
  // You can also include slack emoji in your responses
  msg.say([
    "You're welcome :smile:",
    'You bet',
    ':+1: Of course',
    'Anytime :sun_with_face: :full_moon_with_face:'
  ])
})
/*
slapp.message('chess', ['direct_message'], (msg) => {
  msg.say(["Excellent choice"])
})
*/


// Catch-all for any other responses not handled above
slapp.message('.*', ['direct_mention', 'direct_message'], (msg) => {
  // respond only 40% of the time
  msg.say(slapp.message)
  /*
  if (Math.random() < 0.4) {
    msg.say([':wave:', ':pray:', ':raised_hands:'])
  }
  */
})

// attach Slapp to express server
var server = slapp.attachToExpress(express())

// start http server
server.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on port ${port}`)
})
