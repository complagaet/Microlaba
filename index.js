const host = "127.0.0.1",
port = 8000, 
path = require('path'),
express = require('express'),
app = express(),
fs = require('fs');
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log("User-Agent: " + req.get('User-Agent'));
    if (res.status(404)) {
    	res.redirect("/")
    }
})

app.listen(port, () => {
    console.log("\x1b[36m"+ `МИКРОЛАБА ДОСТУПНА ПО АДРЕСУ http://${host}:${port}\x1b[0m`);
});