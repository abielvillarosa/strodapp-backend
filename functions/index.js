const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors') ({origin: true});
const website = require('./db/resto');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyAScqon04Jxjq6xdYdr-8xf0YsnVxgk2eo",
    authDomain: "strodapp-backend.firebaseapp.com",
    databaseURL: "https://strodapp-backend.firebaseio.com",
    projectId: "strodapp-backend",
    storageBucket: "",
    messagingSenderId: "23120386748",
    appId: "1:23120386748:web:bbb6d33c19b15971"
});

exports.getStro = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            const Stro = await website.getStro(admin.database())
            const views = Stro.Views
            const Views = await website.updateViews(admin.database(), views)
            // let UserId = 'abvillarosa'
            // let Password = 'Pass123'
            // const password = await website.updateUserId(admin.database(), UserId, Password)
            // console.log(Stro)
            console.log('Views: ' + Views)
            return res.status(200).json(Stro)
        } catch (err){
            return res.status(500).json(err)
        }
    })
})

exports.getRestoUid = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            const Stro = await website.getStro(admin.database())
            const restoUid = Stro.restouid
            const newrestoUid = await website.incrementRestoCounter(admin.database(), restoUid)
            console.log('newrestoUid: ' + newrestoUid)
            const newStro = await website.getStro(admin.database())
            return res.status(200).json(newStro)
        } catch (err){
            return res.status(500).json(err)
        }
    })
})

exports.addNewResto = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            var restoUid = 6
            var restoName = 'bk'
            var restoAddress = '0x123456'
            console.log('req', req)
            console.log('reqtext', req.body)
            const newResto = await website.addNewResto(admin.database(), restoUid, restoName, restoAddress)
            const newStro = await website.getStro(admin.database())
            return res.status(200).json(newStro)
        } catch (err){
            return res.status(500).json(err)
        }
    })
})