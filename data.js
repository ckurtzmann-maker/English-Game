// Lerninhalte. Jedes Thema = eine Station auf der Reise nach Michigan.
// word: en = englisches Wort, de = deutscher Hinweis (für Eltern / optional gesprochen),
//       pic = Emoji, oder color = Farbe für das gezeichnete Auto, count = Anzahl Autos.
//       say = kurzer Beispielsatz (Sprachbausteine statt Einzelwörter).

const TOPICS = [
  {
    id: 'hello', icon: '👋', en: 'Hello!', de: 'Hallo & Danke',
    words: [
      { en: 'hello', de: 'hallo', pic: '👋', say: 'Hello! How are you?' },
      { en: 'goodbye', de: 'tschüss', pic: '🙋', say: 'Goodbye! See you later!' },
      { en: 'yes', de: 'ja', pic: '👍', say: 'Yes, please!' },
      { en: 'no', de: 'nein', pic: '🙅', say: 'No, thank you.' },
      { en: 'please', de: 'bitte', pic: '🙏', say: 'Milk, please.' },
      { en: 'thank you', de: 'danke', pic: '💛', say: 'Thank you very much!' },
    ],
  },
  {
    id: 'vehicles', icon: '🚗', en: 'Cars and more', de: 'Fahrzeuge',
    words: [
      { en: 'car', de: 'Auto', pic: '🚗', say: 'I see a car.' },
      { en: 'bus', de: 'Bus', pic: '🚌', say: 'The bus is big.' },
      { en: 'truck', de: 'Lastwagen', pic: '🚚', say: 'The truck is very big.' },
      { en: 'train', de: 'Zug', pic: '🚂', say: 'Choo choo! Here comes the train.' },
      { en: 'airplane', de: 'Flugzeug', pic: '✈️', say: 'The airplane flies high.' },
      { en: 'boat', de: 'Boot', pic: '⛵', say: 'The boat is on the water.' },
      { en: 'bike', de: 'Fahrrad', pic: '🚲', say: 'I ride my bike.' },
      { en: 'motorcycle', de: 'Motorrad', pic: '🏍️', say: 'The motorcycle is loud.' },
    ],
  },
  {
    id: 'colors', icon: '🎨', en: 'Colors', de: 'Farben',
    words: [
      { en: 'red', de: 'rot', color: '#e53935', say: 'The car is red.' },
      { en: 'blue', de: 'blau', color: '#1e88e5', say: 'The car is blue.' },
      { en: 'yellow', de: 'gelb', color: '#fdd835', say: 'The car is yellow.' },
      { en: 'green', de: 'grün', color: '#43a047', say: 'The car is green.' },
      { en: 'orange', de: 'orange', color: '#fb8c00', say: 'The car is orange.' },
      { en: 'black', de: 'schwarz', color: '#263238', say: 'The car is black.' },
      { en: 'white', de: 'weiß', color: '#fafafa', say: 'The car is white.' },
      { en: 'purple', de: 'lila', color: '#8e24aa', say: 'The car is purple.' },
    ],
  },
  {
    id: 'numbers', icon: '🔢', en: 'Numbers', de: 'Zahlen',
    words: [
      { en: 'one', de: 'eins', count: 1, say: 'One car.' },
      { en: 'two', de: 'zwei', count: 2, say: 'Two cars.' },
      { en: 'three', de: 'drei', count: 3, say: 'Three cars.' },
      { en: 'four', de: 'vier', count: 4, say: 'Four cars.' },
      { en: 'five', de: 'fünf', count: 5, say: 'Five cars.' },
      { en: 'six', de: 'sechs', count: 6, say: 'Six cars.' },
      { en: 'seven', de: 'sieben', count: 7, say: 'Seven cars.' },
      { en: 'eight', de: 'acht', count: 8, say: 'Eight cars.' },
      { en: 'nine', de: 'neun', count: 9, say: 'Nine cars.' },
      { en: 'ten', de: 'zehn', count: 10, say: 'Ten cars! Wow!' },
    ],
  },
  {
    id: 'rescue', icon: '🚒', en: 'Big machines', de: 'Große Maschinen',
    words: [
      { en: 'fire truck', de: 'Feuerwehrauto', pic: '🚒', say: 'The fire truck is red.' },
      { en: 'police car', de: 'Polizeiauto', pic: '🚓', say: 'Nee naw! The police car is fast.' },
      { en: 'ambulance', de: 'Krankenwagen', pic: '🚑', say: 'The ambulance helps people.' },
      { en: 'tractor', de: 'Traktor', pic: '🚜', say: 'The tractor is on the farm.' },
      { en: 'helicopter', de: 'Hubschrauber', pic: '🚁', say: 'The helicopter goes up, up, up!' },
      { en: 'rocket', de: 'Rakete', pic: '🚀', say: 'Three, two, one, blast off!' },
      { en: 'race car', de: 'Rennauto', pic: '🏎️', say: 'The race car is super fast!' },
      { en: 'school bus', de: 'Schulbus', pic: '🚌', say: 'The school bus is yellow.' },
    ],
  },
  {
    id: 'actions', icon: '🚦', en: 'Go and stop', de: 'Los & Stopp',
    words: [
      { en: 'go', de: 'los', pic: '🟢', say: 'Ready, set, go!' },
      { en: 'stop', de: 'stopp', pic: '🛑', say: 'Stop! Red light!' },
      { en: 'fast', de: 'schnell', pic: '🏎️', say: 'The race car is fast.' },
      { en: 'slow', de: 'langsam', pic: '🐢', say: 'The turtle is slow.' },
      { en: 'big', de: 'groß', pic: '🐘', say: 'The elephant is big.' },
      { en: 'small', de: 'klein', pic: '🐭', say: 'The mouse is small.' },
      { en: 'up', de: 'hoch', pic: '⬆️', say: 'The airplane goes up.' },
      { en: 'down', de: 'runter', pic: '⬇️', say: 'The airplane comes down.' },
    ],
  },
  {
    id: 'family', icon: '👨‍👩‍👦', en: 'Family', de: 'Familie',
    words: [
      { en: 'mom', de: 'Mama', pic: '👩', say: 'I love you, Mom!' },
      { en: 'dad', de: 'Papa', pic: '👨', say: 'I love you, Dad!' },
      { en: 'grandma', de: 'Oma', pic: '👵', say: 'Hello, Grandma!' },
      { en: 'grandpa', de: 'Opa', pic: '👴', say: 'Hello, Grandpa!' },
      { en: 'boy', de: 'Junge', pic: '👦', say: 'I am a boy.' },
      { en: 'girl', de: 'Mädchen', pic: '👧', say: 'She is a girl.' },
      { en: 'baby', de: 'Baby', pic: '👶', say: 'The baby is sleeping.' },
      { en: 'friend', de: 'Freund', pic: '🧑‍🤝‍🧑', say: 'You are my friend!' },
    ],
  },
  {
    id: 'animals', icon: '🐶', en: 'Animals', de: 'Tiere',
    words: [
      { en: 'dog', de: 'Hund', pic: '🐶', say: 'The dog says woof woof!' },
      { en: 'cat', de: 'Katze', pic: '🐱', say: 'The cat says meow!' },
      { en: 'bird', de: 'Vogel', pic: '🐦', say: 'The bird can fly.' },
      { en: 'fish', de: 'Fisch', pic: '🐟', say: 'The fish can swim.' },
      { en: 'horse', de: 'Pferd', pic: '🐴', say: 'The horse runs fast.' },
      { en: 'cow', de: 'Kuh', pic: '🐮', say: 'The cow says moo!' },
      { en: 'duck', de: 'Ente', pic: '🦆', say: 'The duck says quack quack!' },
      { en: 'deer', de: 'Reh', pic: '🦌', say: 'Look, a deer!' },
    ],
  },
  {
    id: 'food', icon: '🍪', en: 'Food', de: 'Essen',
    words: [
      { en: 'apple', de: 'Apfel', pic: '🍎', say: 'I like apples.' },
      { en: 'banana', de: 'Banane', pic: '🍌', say: 'I want a banana, please.' },
      { en: 'cookie', de: 'Keks', pic: '🍪', say: 'Can I have a cookie, please?' },
      { en: 'milk', de: 'Milch', pic: '🥛', say: 'Milk, please!' },
      { en: 'water', de: 'Wasser', pic: '💧', say: 'Can I have some water, please?' },
      { en: 'pancakes', de: 'Pfannkuchen', pic: '🥞', say: 'Yummy pancakes!' },
      { en: 'pizza', de: 'Pizza', pic: '🍕', say: 'I love pizza!' },
      { en: 'ice cream', de: 'Eis', pic: '🍦', say: 'Ice cream is yummy!' },
    ],
  },
  {
    id: 'feelings', icon: '😊', en: 'How I feel', de: 'Gefühle',
    words: [
      { en: 'happy', de: 'fröhlich', pic: '😄', say: 'I am happy!' },
      { en: 'sad', de: 'traurig', pic: '😢', say: 'I am sad.' },
      { en: 'hungry', de: 'hungrig', pic: '😋', say: 'I am hungry.' },
      { en: 'thirsty', de: 'durstig', pic: '🥤', say: 'I am thirsty.' },
      { en: 'tired', de: 'müde', pic: '😴', say: 'I am tired.' },
      { en: 'bathroom', de: 'Toilette', pic: '🚽', say: 'I need to go to the bathroom.' },
    ],
  },
  {
    id: 'christmas', icon: '🎄', en: 'Christmas', de: 'Weihnachten',
    words: [
      { en: 'snow', de: 'Schnee', pic: '❄️', say: 'Look, it is snowing!' },
      { en: 'snowman', de: 'Schneemann', pic: '⛄', say: "Let's build a snowman!" },
      { en: 'Santa', de: 'Weihnachtsmann', pic: '🎅', say: 'Ho ho ho! Merry Christmas!' },
      { en: 'Christmas tree', de: 'Weihnachtsbaum', pic: '🎄', say: 'The Christmas tree is beautiful.' },
      { en: 'present', de: 'Geschenk', pic: '🎁', say: 'Thank you for the present!' },
      { en: 'reindeer', de: 'Rentier', pic: '🦌', say: 'The reindeer pulls the sleigh.' },
      { en: 'star', de: 'Stern', pic: '⭐', say: 'The star is shining.' },
      { en: 'candy cane', de: 'Zuckerstange', pic: '🍬', say: 'I like candy canes!' },
    ],
  },
];

// Sätze zum Nachsprechen (Papagei-Spiel). {name} wird durch den Namen des Kindes ersetzt.
const PHRASES = [
  { en: 'Hello!', de: 'Hallo!', pic: '👋' },
  { en: 'My name is {name}.', de: 'Ich heiße {name}.', pic: '🙂' },
  { en: 'Thank you!', de: 'Danke!', pic: '💛' },
  { en: 'Yes, please!', de: 'Ja, bitte!', pic: '👍' },
  { en: 'No, thank you.', de: 'Nein, danke.', pic: '🙅' },
  { en: 'I like cars!', de: 'Ich mag Autos!', pic: '🚗' },
  { en: 'Look at my car!', de: 'Schau mal, mein Auto!', pic: '🏎️' },
  { en: 'Vroom vroom!', de: 'Brumm brumm!', pic: '💨' },
  { en: 'I am hungry.', de: 'Ich habe Hunger.', pic: '😋' },
  { en: 'Can I have water, please?', de: 'Kann ich Wasser haben, bitte?', pic: '💧' },
  { en: 'I need to go to the bathroom.', de: 'Ich muss aufs Klo.', pic: '🚽' },
  { en: 'Can I play?', de: 'Darf ich mitspielen?', pic: '⚽' },
  { en: 'I am four years old.', de: 'Ich bin vier Jahre alt.', pic: '4️⃣' },
  { en: 'Good morning!', de: 'Guten Morgen!', pic: '🌅' },
  { en: 'Good night!', de: 'Gute Nacht!', pic: '🌙' },
  { en: 'I love you!', de: 'Ich hab dich lieb!', pic: '❤️' },
  { en: 'Merry Christmas!', de: 'Frohe Weihnachten!', pic: '🎄' },
  { en: 'Wow, cool!', de: 'Wow, cool!', pic: '🤩' },
];

// Sticker für die Garage – werden nacheinander freigeschaltet.
const STICKERS = ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜',
  '🏍️', '🛵', '🚲', '🛴', '🚂', '🚄', '🚅', '🚇', '🚝', '🚠', '🚁', '🛩️', '✈️', '🛫', '🚀', '🛸',
  '⛵', '🚤', '🛥️', '🚢', '🛶', '🎈', '🏁', '🏆'];

const PRAISE = ['Great job!', 'Awesome!', 'You did it!', 'Super!', 'Well done!', 'Wow, amazing!',
  'High five!', 'Fantastic!', 'Yes! Good job!', "You're a star!"];

const ENCOURAGE = ['Hmm, try again!', 'Almost! Try again.', 'Good try! One more time.', 'Oops! Try another one.'];

const STARS_TO_MICHIGAN = 120;
