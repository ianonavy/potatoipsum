var wordlist = ["potato", "french fries", "tater", "tots", "spud",
    "adirondack blue", "adirondack red", "agata", "almond", "apline", "alturas",
    "amandine", "annabelle", "anya", "arran victory", "atlantic", "avalanche",
    "bamberg", "bannock russet", "belle de fontenay", "bildtstar", "bintje",
    "blazer russet", "blue congo", "bonnotte", "british queens", "cabritas",
    "camota", "canela russet", "cara", "carola", "chelina", "cielo",
    "clavela blanca", "estima", "fianna", "fingerling", "flava",
    "german butterball", "golden wonder", "goldrush", "home guard",
    "innovator", "irish cobbler", "jersey royal", "kennebec", "kerr's pink",
    "kestrel", "keuka gold", "king edward", "kipfler", "lady balfour",
    "langlade", "linda", "marcy", "marfona", "maris piper", "marquis",
    "megachip", "monalisa", "nicola", "norgold russet", "pike", "pink eye",
    "pink fir apple", "primura", "ranger russet", "ratte", "record",
    "red lasoda", "red norland", "red pontiac", "rooster", "russet burbank",
    "russet norkotah", "selma", "shepody", "sieglinde", "silverton russet",
    "sirco", "snowden", "spunta", "up to date", "stobrawa", "superior",
    "vivaldi", "vitelotte", "yellow finn", "yukon gold"];

var CLAUSE_MIN_LENGTH = 5;
var CLAUSE_MAX_LENGTH = 7;
var PERCENT_COMPOUND_SENTENCES = 0.42;

var SMALL = 300;
var MEDIUM = 500;
var LARGE = 800;
var VERY_LARGE = 1337;
var WALL_OF_TEXT = 9999;

var DEFAULT_NUM_PARAGRAPHS = 5;
var DEFAULT_MAX_CHARACTERS = 500;
var DEFAULT_PARAGRAPH_SIZE = 'medium';
var MINIMUM_MAX_CHARS = SMALL;

var LipsumElement = {
    numParagraphs: document.getElementById('num_paragraphs'),
    paragraphSize: document.getElementById('paragraph_size'),
    maxCharacters: document.getElementById('max_characters'),
    regenerate: document.getElementById('regenerate'),
    lipsum: document.getElementById('lipsum')
};

var TextSize = {
    small: SMALL,
    medium: MEDIUM,
    large: LARGE,
    very_large: VERY_LARGE,
    wall_of_text: WALL_OF_TEXT
};

/* Utility functions */
function output(text) {
    LipsumElement.lipsum.value = text;
}

function shuffle(list) {
    var i, j, t;
    for (i = 1; i < list.length; i++) {
       j = Math.floor(Math.random() * (1 + i));  // choose j in [0..i]
    if (j != i) {
        t = list[i];                             // swap list[i] and list[j]
        list[i] = list[j];
        list[j] = t;
      }
    }
    return list;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Lipsum generation functions */

function generate(numParagraphs, maxChars) {
    if (typeof numParagraphs === 'undefined')
        numParagraphs = DEFAULT_NUM_PARAGRAPHS;
    if (typeof maxChars === 'undefined')
        maxChars = DEFAULT_MAX_CHARACTERS;

    var paragraphs = [];
    for (var i = 0; i < numParagraphs; i++) {
        paragraphs.push(generateParagraph(maxChars));
    }
    return paragraphs.join('\n\n');
}

function generateParagraph(maxChars) {
    var paragraph = [];
    while (paragraph.join(' ').length < Math.max(MINIMUM_MAX_CHARS, maxChars)) {
        paragraph.push(generateSentence());
    }
    return paragraph.splice(0, paragraph.length - 1).join(' ');
}

function generateSentence() {
    if (Math.random() < PERCENT_COMPOUND_SENTENCES) {
        return makeCompoundSentence();
    } else {
        return makeSimpleSentence();
    }
}

function generateClause(min, max) {
    if (typeof(min) === 'undefined') min = CLAUSE_MIN_LENGTH;
    if (typeof(max) === 'undefined') max = CLAUSE_MAX_LENGTH;

    return shuffle(wordlist).slice(0,
        Math.round(Math.random() * (max - min) + min)).join(' ');
}

function makeSimpleSentence() {
    return capitalizeFirstLetter(generateClause() + ".");
}

function makeCompoundSentence() {
    return capitalizeFirstLetter(
        generateClause(1, CLAUSE_MAX_LENGTH) + ", " +
        generateClause() + ".");
}

/* Update functions */

function getMaxCharactersFromSize() {
    return TextSize[LipsumElement.paragraphSize.value];
}

function getSizeFromMaxCharacters() {
    var maxChars = LipsumElement.maxCharacters.value;
    if (maxChars >= SMALL) return 'small';
    if (maxChars >= MEDIUM) return 'medium';
    if (maxChars >= LARGE) return 'large';
    if (maxChars >= VERY_LARGE) return 'very_large';
    if (maxChars >= WALL_OF_TEXT) return 'wall_of_text';
    }

function update() {
    updateConfig();
    output(
        generate(
            LipsumElement.numParagraphs.value,
            LipsumElement.maxCharacters.value));
}

function updateSize() {
    LipsumElement.maxCharacters.value = getMaxCharactersFromSize();
    update();
}

function updateConfig() {
    if (LipsumElement.maxCharacters.value < MINIMUM_MAX_CHARS) {
        LipsumElement.maxCharacters.value = MINIMUM_MAX_CHARS;
    }
}

/* Main functions */

function setEventListeners() {
    LipsumElement.numParagraphs.addEventListener('keyup', update, false);
    LipsumElement.paragraphSize.addEventListener('change', updateSize, false);
    LipsumElement.maxCharacters.addEventListener('change', update, false);
    LipsumElement.regenerate.addEventListener('click', update, false);
}

function setDefaults() {
    LipsumElement.numParagraphs.value = DEFAULT_NUM_PARAGRAPHS;
    LipsumElement.paragraphSize.value = DEFAULT_PARAGRAPH_SIZE;
    updateSize();
}

setEventListeners();
setDefaults();
