const greetings = [
    "Greetings! How can I be of service?",
    "Hey! How's it going?",
    "What’s up!",
    "Good day! How may I help you today?",
    "Hello! How can I make your day better?",
    "Welcome! How may I assist you now?",
    "Hi! Looking for some help?",
    "Hi there! What can I do for you?",
    "Welcome! What's on your mind today?",
    "Hello! Got a question for me?"
];

export const getRandomGreeting = () => {
    const index = Math.floor(Math.random() * greetings.length);
    return greetings[index];
};
