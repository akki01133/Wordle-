const http = require("http");
const checkWord = require('check-if-word');

const words = checkWord('en');
let hostname = '0.0.0.0'
let port = process.env.PORT || 3000

const ERROR = "ERROR"
const GREAT = "GREAT"

//BANDI isn't a english word!! It just lightens that I am in Delhi!!
const SLIST = ["BANDI","CIGAR","CRANE","THING","DELHI","CHINA","COVID","LEMON",
			   "PHONE","TRUST","VISIT","SORRY","WOULD","ADULT","CHEST","ALONE",
			   "CHILD","CRAZY","NIGHT","MUSIC","DANCE","YOURS","TREAT","WANDA" ]

//choosing a random word from the list. this word doesn't change until the server re-initializes!
const SECRET = SLIST[Math.floor((Math.random() * SLIST.length))];

function myFunction(req, res) {
	const GUESS = String(req.url.split('q=')[1]).toUpperCase()
	let ans = ""
	
	if (GUESS != undefined && GUESS.length == 5 && words.check(GUESS)) {
		for (let i = 0; i < 5; i++) {
			if (GUESS[i] == SECRET[i]) {
				ans += 'g'
			} else if (SECRET.includes(GUESS[i])) {
				ans += 'y'
			}
			else {
				ans += "b"
			}
		}
		res.statusCode = 200
	}
	else {
		ans = ERROR
		res.statusCode = 400
	}

	let feedback = generateHTML(ans,GUESS)

	res.setHeader('Content-Type', 'text/html')
	res.write(feedback);
	res.end();
}

function callBack() {
	console.log(`sever is running at http://${hostname}:${port}/`)
}

http.createServer(myFunction).listen(port, hostname, callBack);


//just adding an additional feature to show the output in wordle manner
function generateHTML(ans,GUESS) {

	function beautify(word) {
		let answer = ""
		if (word == ERROR){
			for (let i = 0; i < 5; i++) {
				answer += `<span class="tile tiler">${ERROR[i]}</span>`
			}
			answer+="</div>"
			answer+="<div><p>please enter a correct url</p>"
		}
		else {
			for (let i = 0; i < 5; i++) {
				if (word[i] == 'g') {
					answer += `<span class="tile tileg">${GUESS[i]}</span>`
				}
				else if (word[i] == 'b') {
					answer += `<span class="tile tileb">${GUESS[i]}</span>`
				}
				else if (word[i] == 'y') {
					answer += `<span class="tile tiley">${GUESS[i]}</span>`
				}
			}
		}
		return answer
	}

	let beautifiedAnswer = beautify(ans);
	return `<!DOCTYPE html>
	<html lang="en">
	
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Wordle+</title>
		<style>
			* {
				margin: 0;
				padding: 0;
				font-family: 'Franklin Gothic Medium', 'Arial Narrow', system-ui, Arial, sans-serif;
			}
	
			.home {
				height: 100vh;
				width: 100%;
				background: black;
				text-align:center;
				color: #ffffff;
			}
	
			.tile-container {
				display: flex;
				justify-content: center;
				padding-top: 6rem;
			}
	
			.tile {
				width: 3rem;
				height: 3rem;
				text-align: center;
				font-size: 1.5rem;
				font-weight: bold;
				border: 1px solid #818384;
				margin: 3px;
				line-height:2;
			}
			.tiler{
				background-color: #cb2b2b;
			}
			.tileb{
				background-color: #939598;
			}
			
			.tiley{
				background-color: #b59f3b;
			}
			
			.tileg{
				background-color: #6aaa64;
			}
		</style>
	</head>
	
	<body>
	
		<div class="home">
			<h1>Wordle+</h1>
			<div class="tile-container">
				${beautifiedAnswer}
			</div>
		</div>
	</body>
	
	</html>`
}
