const http = require("http");

let hostname = '127.0.0.1'
let port = 8080


const SECRET = "AJEET"; 

function myFunction(req, res) {
	const GUESS = String(req.url.split('q=')[1]);

	let ans = "";
	if(GUESS.length == 5){
		for(let i = 0;i< 5;i++){
			if(GUESS[i]==SECRET[i]){
				ans +='g'
			}else if(SECRET.includes(GUESS[i])){
				ans+='y'
			}
			else{
				ans+="b"
			}
		}
	}
	const feedback = ans;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
	res.write(feedback);
	res.end();
}

function callBack(){
	console.log(`sever is running at http://${hostname}:${port}/`)
}

http.createServer(myFunction).listen(port, hostname,callBack);
