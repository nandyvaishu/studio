
export let fortunes: string[] = [
  "A beautiful adventure awaits you.",
  "Good things come to those who wait, but better things come to those who go out and get them.",
  "Your creativity will shine today. Embrace it!",
  "An unexpected opportunity will soon knock on your door.",
  "Laughter is the shortest distance between two people.",
  "Believe in yourself, and others will too.",
  "A pleasant surprise is waiting for you.",
  "The journey of a thousand miles begins with a single step.",
  "Your kindness will lead to great things.",
  "Patience is a virtue, especially when untangling headphones.",
  "You will find a forgotten item of value.",
  "Today is a good day to try something new.",
  "A dream you have will come true.",
  "Share your happiness with others today.",
  "Hard work will pay off sooner than you think.",
  "Every day is a new beginning. Take a deep breath and start again.",
  "Kindness is a language which the deaf can hear and the blind can see.",
  "The best way to predict the future is to create it.",
  "You are capable of amazing things.",
  "A smile is a curve that sets everything straight.",
  "Opportunity dances with those already on the dance floor.",
  "Your talents will be recognized and rewarded.",
  "Do not be afraid to explore new paths.",
  "The wise man is the one who knows what he does not know.",
  "A faithful friend is a strong defense.",
  "Simplicity is the ultimate sophistication.",
  "Happiness is not by chance, but by choice.",
  "You will soon embark on a delightful journey.",
  "Let your actions speak louder than your words.",
  "The world is full of magical things, patiently waiting for our senses to grow sharper.",
  "A new perspective will come with the new year.",
  "Your ability to find the good in others will guide you.",
  "An admirer is concealing their affection for you.",
  "Generosity will return to you in unexpected ways.",
  "Embrace the unknown; it holds wonderful surprises."
];

export function addFortune(newFortune: string): void {
  if (newFortune && !fortunes.includes(newFortune)) {
    fortunes.push(newFortune);
  }
}
