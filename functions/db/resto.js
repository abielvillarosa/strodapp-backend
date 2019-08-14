exports.getStro = async (
    database
) => {
    const response = await database.ref().once('value');
    console.log('response', response.val())
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