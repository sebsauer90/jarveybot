import { validator } from '@jarveybot/core';

const { minLength, required, email } = validator;

const messages = [
  {
    id: 'start',
    message: 'Heyy, nice to see you! 😊 Can i help you?',
    action: {
      type: 'select',
      options: [  
        { value: 'message', label: 'Yes, I have a message for you.' },
        { value: 'documentation', label: 'Where can I find the documentation?' },
      ],
    },
    response: ({ value, nextMessage }) => {
      nextMessage(value);
    },
  },

  // message

  {
    id: 'message',
    message: 'Okay, what\'s your message?',
    action: {
      type: 'text',
      name: 'message',
    },
    response: ({ nextMessage }) => {
      nextMessage('name');
    },
  },

  {
    id: 'name',
    message: 'Okay nice! Now I need your name.',
    action: {
      type: 'text',
      name: 'name',
      validator: [
        required('Please enter your name ✌🏻'),
        minLength('Please enter your full name ✌🏻', 3),
      ],
    },
    response: ({ nextMessage }) => {
      nextMessage('email');
    },
  },

  {
    id: 'email',
    message: 'Perfect $name! At least I need your email adress.',
    action: {
      type: 'text',
      name: 'email',
      validator: [
        required('Please enter your email adress ✌🏻'),
        email('Please enter a valid email ✌🏻'),
      ],
    },
    response: ({ nextMessage }) => {
      nextMessage('submit');
    },
  },

  {
    id: 'submit',
    message: 'Okay $name, we can contact you here $email. And you have following message for us: $message',
    action: {
      type: 'select',
      options: [  
        { value: true, label: 'Yes, please submit.' },
      ],
    },
    response: ({ value, nextMessage }) => {
      if (value === true) {
        nextMessage('start', {
          message: 'I\'ve sent the message to my boss 😎 Can I do even more for you?',
        });
      }
    },
  },

  // documentation

  {
    id: 'documentation',
    message: 'That\'s easy 😊 just follow this link to our <a href="#">documentation</a>',
    action: {
      type: 'select',
      options: [  
        { value: true, label: 'Nice, thanks!' },
      ],
    },
    response: ({ nextMessage }) => {
      nextMessage('start', {
        message: 'Can I do even more for you? 🤗',
      });
    },
  },
];

export default messages;
