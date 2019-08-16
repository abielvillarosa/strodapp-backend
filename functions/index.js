const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors') ({origin: true});
const website = require('./db/resto');
const url = require('url')


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
            const body = JSON.parse(req.body)
            const newResto = await website.addNewResto(admin.database(), body.restoUid, body.restoName, body.restoAddress)
            const newStro = await website.getStro(admin.database())
            return res.status(200).json(newStro)
        } catch (err){
            return res.status(500).json(err)
        }
    })
})

exports.getProductUid = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            const Stro = await website.getStro(admin.database())
            const productUid = Stro.productuid
            const newProductUid = await website.incrementProductCounter(admin.database(), productUid)
            console.log('newProductUid: ' + newProductUid)
            const newStro = await website.getStro(admin.database())
            return res.status(200).json(newStro)
        } catch (err){
            return res.status(500).json(err)
        }
    })
})

exports.addNewProduct = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            // console.log('productreqbody', req.body)
            const body = JSON.parse(req.body)
            const Stro = await website.getStro(admin.database())
            const productUid = Stro.productuid
            const newProductUid = await website.incrementProductCounter(admin.database(), productUid)
            const currproductUid = Stro.productuid
            const newProduct = await website.addNewProduct(admin.database(), currproductUid, body.restoUid, body.productName, body.requiredPts)
            const newStro = await website.getStro(admin.database())
            return res.status(200).json(newStro)
        } catch (err){
            return res.status(500).json(err)
        }
    })
})

exports.getProducts = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            let parts = url.parse(req.url, true)
            let query = parts.query
            const getProducts = await website.getProducts(admin.database(), query.restoUid)
            return res.status(200).json(getProducts)
        } catch (err){
            return res.status(500).json(err)
        }
    })
})

exports.getCustomerUid = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            const Stro = await website.getStro(admin.database())
            const customerUid = Stro.customeruid
            const newCustomerUid = await website.incrementCustomerCounter(admin.database(), customerUid)
            const newStro = await website.getStro(admin.database())
            return res.status(200).json(newStro)
        } catch (err){
            return res.status(500).json(err)
        }
    })
})

exports.addNewCustomer = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            // console.log('productreqbody', req.body)
            const body = JSON.parse(req.body)
            const Stro = await website.getStro(admin.database())
            // const customerUid = Stro.customeruid
            // const newCustomerUid = await website.incrementCustomerCounter(admin.database(), customerUid)
            // const currcustomerUid = Stro.customeruid
            const newProduct = await website.addNewCustomer(admin.database(), body.restoUid, body.customerUid, body.customerAddress)
            const newStro = await website.getStro(admin.database())
            return res.status(200).json(newStro)
        } catch (err){
            return res.status(500).json(err)
        }
    })
})

exports.earnStamp = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            const body = JSON.parse(req.body)
            const currentPts = await website.getCustomerPts(admin.database(), body.restoUid, body.customerUid)
            const newEarnedPts = currentPts + body.earnedPts
            const newProduct = await website.updateCustomerPts(admin.database(), body.restoUid, body.customerUid, newEarnedPts)
            const newStro = await website.getStro(admin.database())
            return res.status(200).json(newStro)
        } catch (err){
            return res.status(500).json(err)
        }
    })
})

exports.redeemPts = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            // console.log('productreqbody', req.body)
            const body = JSON.parse(req.body)
            const currentPts = await website.getCustomerPts(admin.database(), body.restoUid, body.customerUid)
            const newEarnedPts = currentPts + body.earnedPts
            // const customerUid = Stro.customeruid
            const newProduct = await website.updateCustomerPts(admin.database(), body.restoUid, body.customerUid, newEarnedPts)
            const newStro = await website.getStro(admin.database())
            return res.status(200).json(newStro)
        } catch (err){
            return res.status(500).json(err)
        }
    })
})