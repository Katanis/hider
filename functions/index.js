// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin
    .database()
    .ref('/messages')
    .push({ original: original });
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString());
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
// exports.makeUppercase = functions.database
//   .ref('/users/{userId}')
//   .onCreate((snapshot, context) => {
//     // Grab the current value of what was written to the Realtime Database.
//     const original = snapshot.val();
//     console.log('Uppercasing', context.params.userId, original);
//     const uppercase = original.toUpperCase();
//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to the Firebase Realtime Database.
//     // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//     return snapshot.ref.parent.child('uppercase').set(uppercase);
//   });

exports.UserPressesLike = functions.database
  .ref('/users/{userId}/matches/{otherUserId}')
  .onCreate(async (snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snapshot.val();
    const userId = context.params.userId;
    const matchedUserId = context.params.otherUserId;
    const a = await checkUserMatch(userId, matchedUserId);
    if (a === true) {
      console.log('Its a match');
      addNewChat(userId, matchedUserId);
      //create chat for both users
    } else {
      console.log('There is no match');
      //do nothing
      console.log(a);
    }

    return null;
  });

checkUserMatch = async (userId, matchedUserId) => {
  const isLiked = await admin
    .database()
    .ref('/users/' + matchedUserId + '/matches/' + userId)
    .once('value')
    .then(snapshot => {
      // let tempuserId = snapshot.val();
      // if()
      let isLiked = snapshot.exists();
      console.log(isLiked);
      return isLiked;
    })
    .catch(error => {
      console.log(error);
      return snapshot;
    });
  return isLiked;
};

addNewChat = async (userId, matchedUserId) => {
  const user1 = await getUserDataById(userId);
  let tempUsername = user1.username;
  const user2 = await getUserDataById(matchedUserId);
  console.log(JSON.stringify(user1));
  console.log('UserID: ' + JSON.stringify(userId));
  const snapshot = await admin
    .database()
    .ref('/chats')
    .push({
      members: {
        [userId]: true,
        [matchedUserId]: true,
      },
      [userId]: {
        username: user1.username,
        profile_picture: user1.profile_picture,
      },
      [matchedUserId]: {
        username: user2.username,
        profile_picture: user2.profile_picture,
      },
    });
};

// const snapshot = await admin
//     .database()
//     .ref('/chats')
//     .push({
//       members: { [userId]: true, [matchedUserId]: true },
//       [userId]: { data: user1 },
//       [matchedUserId]: { data: user2 },
//     });

getUserDataById = userId => {
  return admin
    .database()
    .ref('/users/' + userId)
    .once('value')
    .then(childsnapshot => childsnapshot.val());
};
