exports.getStro = async (
    database
) => {
    const response = await database.ref().once('value');
    return response.val();
}

exports.updateViews = async (
    database,
    currentViews
) => {
    const updates = {}
    const path = 'Views'
    const newViews = currentViews + 1
    updates[path] = newViews
    return database.ref().update(updates)
}

exports.incrementRestoCounter = async (
    database,
    currentCounter
) => {
    const updates = {}
    const path = 'restouid'
    const newCounter = currentCounter + 1
    updates[path] = newCounter
    const response = await database.ref().update(updates)
    return database.ref().update(updates)
}

exports.addNewResto = async (
    database,
    restoUid,
    restoName,
    restoAddress
) => {
    const response = await database.ref(`restaurants/${restoUid}`)
    response.set({
        'restoName': restoName, 
        'restoAddress': restoAddress
    })
    return { msg : 'success'}
}

exports.incrementProductCounter = async (
    database,
    currentCounter
) => {
    const updates = {}
    const path = 'productuid'
    const newCounter = currentCounter + 1
    updates[path] = newCounter
    const response = await database.ref().update(updates)
    return database.ref().update(updates)
}

exports.addNewProduct = async (
    database,
    productUid,
    restoUid,
    productName,
    requiredPts
) => {
    const response = await database.ref(`products/${restoUid}/${productUid}`)
    response.set({
        'productName': productName, 
        'requiredPts': requiredPts
    })
    return { msg : 'success'}
}