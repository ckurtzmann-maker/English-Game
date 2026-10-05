// Lerninhalte. Jedes Thema = eine Station auf der Reise nach Michigan.
// word: en = englisches Wort, de = deutscher Hinweis (für Eltern / optional gesprochen),
//       pic = Emoji, oder color = Farbe für das gezeichnete Auto, count = Anzahl Autos.
//       say = kurzer Beispielsatz (Sprachbausteine statt Einzelwörter).

// Stufe 1: Wörter verstehen.
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
  { en: 'I am {age} years old.', de: 'Ich bin {age} Jahre alt.', pic: '{agePic}' },
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

// Stufe 3: Fragen verstehen und antworten.
// Jede Frage hat 1–2 richtige Antworten (bei Ja/Nein-Fragen ist beides richtig).
// Das Ja-Bild ist pro Frage verschieden (🥶 bei "cold", 😋 bei "hungry") – so muss das Kind
// die Frage wirklich verstehen und kann nicht einfach immer 👍 tippen.
// Falsche Auswahlmöglichkeiten werden aus den anderen Fragen desselben Themas gezogen.
const NO = '🙅';
const yn = (q, de, yesPic, yes, no) => ({ q, de, answers: [{ pic: yesPic, en: yes }, { pic: NO, en: no }] });

const QA_TOPICS = [
  {
    id: 'qa-me', stage: 3, type: 'qa', icon: '🙋', de: 'Über mich',
    items: [
      { q: "What's your name?", de: 'Wie heißt du?', answers: [{ pic: '🙋‍♂️', en: 'My name is {name}.' }] },
      { q: 'How old are you?', de: 'Wie alt bist du?', answers: [{ pic: '{agePic}', en: "I'm {age}!" }] },
      { q: 'How are you?', de: 'Wie geht es dir?', answers: [{ pic: '😄', en: "I'm good, thank you!" }] },
      { q: 'Where are you from?', de: 'Woher kommst du?', answers: [{ pic: '🇩🇪', en: "I'm from Germany!" }] },
      yn('Do you like cars?', 'Magst du Autos?', '🚗', 'Yes! I love cars!', "No, I don't."),
      yn('Do you speak English?', 'Sprichst du Englisch?', '🇺🇸', 'Yes, a little!', 'No, not yet.'),
    ],
  },
  {
    id: 'qa-food', stage: 3, type: 'qa', icon: '🍽️', de: 'Hunger & Durst',
    items: [
      yn('Are you hungry?', 'Hast du Hunger?', '😋', "Yes, I'm hungry!", "No, I'm not hungry."),
      yn('Are you thirsty?', 'Hast du Durst?', '🥤', "Yes, I'm thirsty!", 'No, thank you.'),
      yn('Do you want to eat?', 'Möchtest du essen?', '🍽️', 'Yes, please!', 'No, thank you.'),
      yn('Do you want more?', 'Möchtest du noch mehr?', '➕', 'More, please!', "No, thank you. I'm full."),
      yn('Is it yummy?', 'Schmeckt es?', '😍', "Yes, it's yummy!", "No, I don't like it."),
      { q: 'Do you want milk or water?', de: 'Möchtest du Milch oder Wasser?', answers: [{ pic: '🥛', en: 'Milk, please!' }, { pic: '💧', en: 'Water, please!' }] },
      { q: 'Do you want a cookie or an apple?', de: 'Möchtest du einen Keks oder einen Apfel?', answers: [{ pic: '🍪', en: 'A cookie, please!' }, { pic: '🍎', en: 'An apple, please!' }] },
    ],
  },
  {
    id: 'qa-outside', stage: 3, type: 'qa', icon: '❄️', de: 'Draußen & Winter',
    items: [
      yn('Do you want to go outside?', 'Möchtest du rausgehen?', '🌳', "Yes, let's go outside!", 'No, I want to stay inside.'),
      yn('Are you cold?', 'Ist dir kalt?', '🥶', "Yes, I'm cold!", "No, I'm warm."),
      yn('Do you want to build a snowman?', 'Möchtest du einen Schneemann bauen?', '⛄', "Yes! Let's build a snowman!", 'No, thank you.'),
      yn('Are you tired?', 'Bist du müde?', '😴', "Yes, I'm tired.", "No, I'm not tired!"),
      yn('Do you need to go to the bathroom?', 'Musst du aufs Klo?', '🚽', 'Yes, I need to go!', "No, I'm okay."),
      yn('Do you want to play?', 'Möchtest du spielen?', '🧸', "Yes! Let's play!", 'Not now, thank you.'),
      { q: 'Do you want to play with cars or trains?', de: 'Willst du mit Autos oder Zügen spielen?', answers: [{ pic: '🚗', en: 'Cars, please!' }, { pic: '🚂', en: 'Trains, please!' }] },
    ],
  },
];

// Stufe 4: Anweisungen verstehen – das hört ein Kind in der Gastfamilie am häufigsten.
// type 'pick': richtiges Bild antippen. type 'move': selbst mitmachen (Bewegung), dann 👍.
const ACTION_TOPICS = [
  {
    id: 'do-home', stage: 4, type: 'pick', icon: '🧥', de: 'Anziehen & Alltag',
    items: [
      { cmd: 'Put on your jacket!', de: 'Zieh deine Jacke an!', pic: '🧥' },
      { cmd: 'Put on your shoes!', de: 'Zieh deine Schuhe an!', pic: '👟' },
      { cmd: 'Put on your hat!', de: 'Setz deine Mütze auf!', pic: '🧢' },
      { cmd: 'Put on your gloves!', de: 'Zieh deine Handschuhe an!', pic: '🧤' },
      { cmd: 'Put on your boots!', de: 'Zieh deine Stiefel an!', pic: '🥾' },
      { cmd: 'Wash your hands, please!', de: 'Wasch dir bitte die Hände!', pic: '🧼' },
      { cmd: 'Brush your teeth!', de: 'Putz dir die Zähne!', pic: '🪥' },
      { cmd: 'Dinner is ready!', de: 'Das Essen ist fertig!', pic: '🍽️' },
      { cmd: 'Time for bed!', de: 'Ab ins Bett!', pic: '🛏️' },
      { cmd: 'Time for a bath!', de: 'Zeit zum Baden!', pic: '🛁' },
      { cmd: 'Clean up your toys, please!', de: 'Räum bitte deine Spielsachen auf!', pic: '🧸' },
      { cmd: 'Get in the car!', de: 'Steig ins Auto!', pic: '🚗' },
    ],
  },
  {
    id: 'do-move', stage: 4, type: 'move', icon: '🤸', de: 'Mach mit!',
    items: [
      { cmd: 'Jump!', de: 'Spring!', pic: '🦘' },
      { cmd: 'Clap your hands!', de: 'Klatsch in die Hände!', pic: '👏' },
      { cmd: 'Stand up!', de: 'Steh auf!', pic: '🧍' },
      { cmd: 'Sit down, please!', de: 'Setz dich bitte hin!', pic: '🪑' },
      { cmd: 'Touch your nose!', de: 'Fass dir an die Nase!', pic: '👃' },
      { cmd: 'Turn around!', de: 'Dreh dich um!', pic: '🔄' },
      { cmd: 'Wave hello!', de: 'Wink mal!', pic: '👋' },
      { cmd: 'Stomp your feet!', de: 'Stampf mit den Füßen!', pic: '🦶' },
      { cmd: 'Come here, please!', de: 'Komm bitte her!', pic: '🏃' },
      { cmd: 'Stop! Freeze!', de: 'Stopp! Erstarren!', pic: '✋' },
      { cmd: 'Drive like a car! Vroom vroom!', de: 'Fahr wie ein Auto!', pic: '🚗' },
      { cmd: 'Fly like an airplane!', de: 'Flieg wie ein Flugzeug!', pic: '✈️' },
    ],
  },
];

// Stufen werden über Sterne freigeschaltet (im Eltern-Bereich auch sofort möglich).
const STAGES = [
  { n: 1, de: 'Wörter', stars: 0 },
  { n: 2, de: 'Sätze sagen', stars: 0 },
  { n: 3, de: 'Fragen & Antworten', stars: 60 },
  { n: 4, de: 'Anweisungen & Mitmachen', stars: 150 },
];

// Wer fragt? Verschiedene Figuren mit unterschiedlicher Stimmhöhe – wie in einer echten Familie.
const HOSTS = [
  { pic: '👩', pitch: 1.15 },
  { pic: '👨', pitch: 0.85 },
  { pic: '👧', pitch: 1.45 },
  { pic: '👵', pitch: 1.05 },
  { pic: '👴', pitch: 0.75 },
];

const AGE_WORDS = { 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven' };

const STARS_TO_MICHIGAN = 600;
