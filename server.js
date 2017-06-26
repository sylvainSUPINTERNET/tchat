var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');


//SI on veut utiliser les node_modules tels que bootstrap
app.use('node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));





var usersList = [];

io.on('connection', function (socket) {

    //console.log("test");
    const currentUser = {
        id  : null,
        pseudo : null
    };


    socket.on('setPseudo', function(pseudo){
            //1) On resneigne les propriété de la l'object et on l'ajoute à la liste
        currentUser.id = socket.id;
        currentUser.pseudo = pseudo;
        usersList.push(currentUser);

        //2) Envoi de la liste à ce nouvelle utilisateur
        socket.emit('usersList', usersList);

        //3 on envoit à tout le monde le nouvelle user
        socket.broadcast.emit('newUser', currentUser);


    });


    socket.on('disconnect', function () {
    });

});


/*
 io.on('connection', function(socket){
 console.log('a user connected');
 socket.on('disconnect', function(){
 console.log('user disconnected');
 });


 //test server site
 socket.on('send',function(messageSend){
 console.log(messageSend);
 });
 });
 */

const port = process.env.PORT || 8000; //env.port => port coté client, 8000 port local
http.listen(port, function () {
    console.log('listening on *:' + port);
});
