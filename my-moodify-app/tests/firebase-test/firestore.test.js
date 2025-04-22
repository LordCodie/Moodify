const { getAuth } = require("firebase/auth")
const { getFirestore } = require("firebase/firestore")

const { signUp, signIn, passwordReset, deleteUserAccount, googleSignIn } = require("../jest.setup")

let auth, db

const mockUser = {
    email: "skyler.peaceful89@novaxmail.net",
    username: "Mokzy",
    password: "password01"
}

beforeAll(() => {
    auth = getAuth(global.firebaseApp)
    db = getFirestore(global.firebaseApp)
    // deleteUserAccount(auth)
    console.info('running...')
})

describe("authenication tests", () => {

    test("create an account", async () => {
        const res = await signUp(auth, mockUser.email, mockUser.password, mockUser.username)
        expect(res).toEqual({ succes: true, message: `User succesfully signed-up` })
    })

    test("sign-in an account", async() => {
        const res = await signIn(auth, mockUser.email, mockUser.password)
        expect(res).toEqual({ succes: true, message: `User succesfully signed-in` })
    })

    // test("sign-in with google account", async() => {
    //     const res = await googleSignIn(auth) 
    //     expect(res).toEqual({ succes: true, message: `User signed-in with google` })
    // })

    test("forgot password", async() => {
        const res = await passwordReset(auth, mockUser.email)
        expect(res).toEqual({ success: true, message: "Password reset email sent!" })
    })

})

// describe("firestore tests", () => {

//     test("name and save playlists", async() => {

//     })

//     test("delete playlists", async() => {

//     })

// })

afterAll(() => {
    
})

