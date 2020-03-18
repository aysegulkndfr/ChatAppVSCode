var http = require('http'); 
var express = require('express'); 
var app = express(); 
var server = http.createServer(app);
var io = require('socket.io').listen(server); 

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname});
});

io.on('connection', function (socket) { // Burada I/O kısmına connection durumu olduğunda her kullanıcı için bir bir kanal açılır.
    console.log('a user connected');// Console bir kişi geldiğini yazdırılır.
    socket.on('chat message', function (msg) { // Eğer açık kanaldan birisi bir message yollar ise bunu yakalıyoruz.
        io.emit('chat message', msg); // Yakaladığmız bu mesajı bize bağlı olan bütün açık kanallara emit(yayılma) edilir.
    });

    socket.on('disconnect', function () { // Eğer açık kanaldan birisi çıkar ise bunu yakalıyoruz. 
        console.log('user disconnected'); // Birisinin çıktığını söylüyoruz.(Otomatik olarak açık kanalı o kişi için kapatacaktır.)

    });

});
const port = 8000; // Serverimizin dinleyeceği portu söylüyoruz.
server.listen(port, () => { // Bizim kurduğumuz server yapısının kapısının porttan dinlemesini söylüyoruz.
    console.log('Server is listening on:' + port + ' now...'); // Dinlediğinin kanıtı olarak ekrana yazdırıyoruz.

});