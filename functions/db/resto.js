exports.getStro = async (
    database
) => {
    const response = await database.ref().once('value');
    // console.log('response', response.val())
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
    // return database.ref().update(updates)
    const response = await database.ref().update(updates)
    // console.log('responsed', response.val())
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

// exports.updateUserId = async (
//     database,
//     UserId,
//     Password
// ) => {
//     const updates = {}
//     const pathUserId = 'UserId/UserId'
//     updates[pathUserId] = UserId
//     const pathPassword = 'UserId/Password'
//     updates[pathPassword] = Password
//     return database.ref().update(updates)
// }