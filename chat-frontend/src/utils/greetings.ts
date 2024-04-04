const greetings = [
    "Greetings! How can I be of service?",
    "Hello! Let me know how I can help you.",
    "Hi! What do you need assistance with?",
    "Good day! How may I help you today?",
    "Hello! How can I make your day better?",
    "Welcome! How may I assist you now?",
    "Hello, how can I assist you today?",
    "Hi there! What can I do for you?",
    "Hey! Ready to help you. What do you need?",
    "Hi, there! How can I be helpful today?",
];

export const getRandomGreeting = () => {
    const index = Math.floor(Math.random() * greetings.length);
    return greetings[index];
};
