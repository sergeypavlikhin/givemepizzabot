/**
 * Created by Sergey on 12.11.2016.
 */
'use strict'
const goodAnswers = ['+', 'me', 'я буду'];
const MAKE_ME_DEFAULT = 'default';
const I_NOT_DEFAULT = '--';
const SHOW_INFO = 'status';
const CLEAR = 'clear';
const badAnwsers = ['-'];

module.exports = function (req, db) {
    let result = {
        response_type: 'in_channel'
    };
    try{
        var text = req.body.text;
        var user = req.body.user_name;
        if(text){
            text = text.trim().toLowerCase();
            if(goodAnswers.includes(text)){
                result =  add(user, db);
            }else if(badAnwsers.includes(text)){
                result = remove(user, db);
            }else if (MAKE_ME_DEFAULT == text){
                result = saveDefault(user, db);
            }else if(SHOW_INFO == text){
                result = info();
            }else if (I_NOT_DEFAULT == text){
                result = removeDefault(user);
            }else{
                result = idk();
            }
        }else{
            result = idk();
        }
    }catch (err){
        result = error();
        console.error(err);
    }finally {
        return result;
    }

    function add(user, db) {
        if (!db.orders.includes(user)){
            db.orders.push(user);
            return okey("Я тебя запомнил");
        }  else{
            return errorRepeat();
        }
    }
    function remove(user, db) {
        if(db.orders.includes(user)){
            console.log(db.orders);
            db.orders.remove(user);
            return okey("Ну и фиг с тобой, то есть спасибо, что написал заранее");
        }else{
            console.log(db.orders);
            return okey("Но я ты и так ничего не заказывал)");
        }

    }
    function saveDefault( user, db ) {
        db.defaults.push(user);
        remove(user, db);
        return okey("Теперь я тебя буду помнить вечно");
    }
    function removeDefault( user, db ) {
        db.defaults.remove(user);
        return okey("Возвращайся если чё.");
    }
    function info() {
        let text = "Пиццу заказали следующие обжоры: ";
        let all = db.orders.concat(db.defaults);
        text += all.join(', ');
        result.text = text;
        return result;
    }
    function errorRepeat() {
        let text = "Ты уже заказал пиццу, бро. Оставь другим";
        result.text = text;
        return result;
    }
    function error() {
        let text = "Что-то пошло не так, сорян. Серёге привет";
        result.text = text;
        return result;
    }
    function okey(post) {
        let text = "Окей, бро.";
        if(post)
            text += " " + post;
        result.text = text;
        return result;
    }
    function idk() {
        let text = "Я не понимаю тебя, будь яснее.";
        result.text = text;
        return result;
    }
};