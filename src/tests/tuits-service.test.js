/**
* @jest-environment node
*/
import {
  createTuit,
  deleteTuit, findAllTuits,
  findTuitById
} from "../services/tuits-service";
import {
  createUser,
  deleteUsersByUsername, findAllUsers,
  findUserById
} from "../services/users-service";

describe('can create tuit with REST API', () => {
  // TODO: implement this
  // describe('createUser', () => {
    // sample tuit to insert

// const MOCKED_USERS = [
//   {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
//   {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
// ]
    const tuit = {
      tuit: 'tuit to insert',
     // _id: '123'
    };
    const ripley = {
      username: 'ellenripley',
      password: 'lv426',
      email: 'ellenripley@aliens.com',
      // _id: "234"
    };
    let tuitId;
    let userId;
    // let newTuit;
    // const newUser = await createUser(ripley);
    // const newTuit = await createTuit(newUser._id, tuit)
  
    // setup test before running test
    beforeAll(() => {
      // remove any/all users to make sure we create it in the test
      // createUser(ripley);
      
      
      // newTuit = await createTuit(newUser._id, tuit)
      return deleteUsersByUsername(ripley.username);;
    })
  
    // clean up after test runs
    afterAll(() => {
      // remove any data we created
      
      deleteTuit(tuitId);
      return deleteUsersByUsername(ripley.username);
    })
  
    test('can insert new tuits with REST API', async () => {
      // insert new user in the database
      // const user =  createUser(ripley);
      const newUser = await createUser(ripley);
      userId = newUser._id;
      const newTuit = await createTuit(userId, tuit);
      tuitId = newTuit._id
  
      // verify inserted user's properties match parameter user
      expect(newTuit.tuit).toEqual(tuit.tuit);
      // expect(newTuit.postedBy).toEqual(newUser._id);
    });
  // });
});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
  // describe('deleteUsersByUsername', () => {

    // sample tuit to delete
    let tuitId;
    let userId;
    const tuit = {
      tuit: "tuit to delete",
      //_id: "123"
    }
    const sowell = {
      username: 'thommas_sowell',
      password: 'compromise',
      email: 'compromise@solutions.com',
      //_id: "234"
    };
  
    // setup the tests before verification
    beforeAll(() => {
      // insert the sample user we then try to remove
      return deleteUsersByUsername(sowell.username);

      // return 
    });
  
    // clean up after test runs
    afterAll(() => {
      // remove any data we created
      
      return deleteUsersByUsername(sowell.username);
    })
  
    test('can delete tuits from REST API by uid', async () => {
      const user = await createUser(sowell);
      
      userId = user._id;
      const tuitToDelete = await createTuit(userId, tuit);
      tuitId = tuitToDelete._id;
      // delete a user by their username. Assumes user already exists
      const status = await deleteTuit(tuitId);
  
      // verify we deleted at least one user by their username
      expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
  // });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  let userId;
  let tuitId;
    // sample user we want to retrieve
    const adam = {
      username: 'adam_smith',
      password: 'not0sum',
      email: 'wealth@nations.com'
    };

    const tuit = {
      tuit: 'tuit to retrieve'
    }
  
    // setup before running test
    beforeAll(() => {
      // clean up before the test making sure the user doesn't already exist
      
      return deleteUsersByUsername(adam.username)
    });
  
    // clean up after ourselves
    afterAll(() => {
      // remove any data we inserted
      deleteTuit(tuitId);
      return deleteUsersByUsername(adam.username);
    });
  
    test('can retrieve tuit from REST API by primary key', async () => {
      // insert the user in the database
      const newUser = await createUser(adam);
      userId = newUser._id;
      const newTuit = await createTuit(userId, tuit)
      tuitId = newTuit._id;
  
      // verify new user matches the parameter user
      expect(newTuit.tuit).toEqual(tuit.tuit);
      // expect(newUser.password).toEqual(adam.password);
      // expect(newUser.email).toEqual(adam.email);
  
      // retrieve the user from the database by its primary key
      const existingTuit = await findTuitById(tuitId);
  
      // verify retrieved user matches parameter user
      expect(existingTuit.tuit).toEqual(tuit.tuit);
      // expect(existingUser.password).toEqual(adam.password);
      // expect(existingUser.email).toEqual(adam.email);
    });
});

describe('can retrieve all tuits with REST API', () => {
    // sample users we'll insert to then retrieve
    // const usernames = [
    //   "larry", "curley", "moe"
    // ];
    // let userIds = [

    // ]
    // let user1Id, user2Id, user3Id;
  
    // sample tuits we'll insert to then retrieve
    // const tuits = [
    //   {uid: user1Id, tuit: "tuit1"},
    //   {uid: user2Id, tuit: "tuit2"},
    //   {uid: user3Id, tuit: "tuit3"}
    // ];
    let userId;
    let tuitIds = [
      "", "", ""
    ]
    const sarah = {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com'};
    const tuitsToInsert = [
      {tuit: "tuit1"},
      {tuit: "tuit2"},
      {tuit: "tuit3"}
    ]
  
    // setup data before test
    beforeAll(() =>
      // insert several known users
      // usernames.map((username, index) => {
      //   const newUser = createUser({
      //     username,
      //     password: `${username}123`,
      //     email: `${username}@stooges.com`
      //   })
      //   userIds[index] = newUser._id;
      // }),
      // insert several known users
      deleteUsersByUsername(sarah.username)
      // const newUser = createUser(sarah);
      // tuits.map(tuit =>
      //   createTuit(tuit.uid, tuit.tuit)
      // )
    );
  
    // clean up after ourselves
    afterAll(() => {

      deleteUsersByUsername(sarah.username)
      // delete the users we inserted
      Promise.all(tuitsToInsert.map((tuit, index) => {
        deleteTuit(tuitIds[index])
      }))
      // tuitsToInsert.map((tuit, index) =>
      //   deleteTuit(tuitIds[index])
      // )
    });
    // test('aaa', async () => {
    //   expect(3).toBeGreaterThanOrEqual(tuitsToInsert.length);
    // })
    test('can retrieve all tuits from REST API', async () => {
      const newUser = await createUser(sarah);
      userId = newUser._id;
      await Promise.all(tuitsToInsert.map(async (tuitToInsert, index) => {
        const newTuit = await createTuit(userId, tuitToInsert)
        tuitIds[index] = newTuit._id
        
      }))
      // for (let i = 0; i < tuitIds.length; i++) {
      //   console.log(tuitIds[i])
      // }
      // tuitsToInsert.map(async (tuitToInsert, index) => {

        
      //   const newTuit = await createTuit(userId, tuitToInsert)
      //   tuitIds[index] = newTuit._id
      // })
      // retrieve all the users
      const tuits = await findAllTuits();
  
      // there should be a minimum number of users
      expect(tuits.length).toBeGreaterThanOrEqual(tuitsToInsert.length);
      
  
      // let's check each user we inserted
      const tuitsWeInserted = tuits.filter(
        tuit => tuitsToInsert.indexOf(tuit.tuit) >= 0);
  
      // compare the actual users in database with the ones we sent
      tuitsWeInserted.forEach(tuitInserted => {
        const tuitContent = tuitsToInsert.find(tuitToInsert => tuitToInsert.tuit === tuitInserted.tuit);
        expect(tuitContent.tuit).toEqual(tuitInserted.tuit);
      //   // expect(user.password).toEqual(`${username}123`);
      //   // expect(user.email).toEqual(`${username}@stooges.com`);
      });
    });
});