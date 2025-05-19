const { getAuth } = require("firebase/auth")
const { getFirestore } = require("firebase/firestore")
const {
    signUp,
    signIn,
    passwordReset,
    deleteUserAccount,
    googleSignIn,
    saveplaylist,
    deleteplaylist,
    fetchUserPlaylistsTitles,
    fetchUserPlaylistsSongs,
} = require("../firebase-test/jest.setup")

let auth, db

const mockUser = {
    email: "skyler.peaceful89@novaxmail.net",
    username: "Mokzy",
    password: "password01",
    uid: "a878be00-1c18-4688-82e4-065c04053a3b"
}

beforeAll(() => {
    auth = getAuth(global.firebaseApp)
    db = getFirestore(global.firebaseApp)
    // deleteUserAccount(auth)
    console.info('running...')
})

describe("authenication tests", () => {

    // test("create an account", async () => {
    //     const res = await signUp(auth, mockUser.email, mockUser.password, mockUser.username)
    //     expect(res).toEqual({ succes: true, message: `User succesfully signed-up` })
    // })

    // test("sign-in an account", async() => {
    //     const res = await signIn(auth, mockUser.email, mockUser.password)
    //     expect(res).toEqual({ succes: true, message: `User succesfully signed-in` })
    // })

    // test("sign-in with google account", async() => {
    //     const res = await googleSignIn(auth) 
    //     expect(res).toEqual({ succes: true, message: `User signed-in with google` })
    // })

    // test("forgot password", async() => {
    //     const res = await passwordReset(auth, mockUser.email)
    //     expect(res).toEqual({ success: true, message: "Password reset email sent!" })
    // })

})

describe("firestore tests", () => {

    // test("name and save playlists", async () => {
    //     const docData = {
    //         mockSavedPlaylists: Array.from({ length: 50 }).map((_, i) => ({
    //             id: i + 1,
    //             artist: `Artst ${i + 1}`,
    //             song: `Song ${i + 1}`,
    //             url: `http://mocksongs/song${i + 1}.mp3/`,
    //             image: `Song ${i + 1}.jpg`
    //         }))
    //     }
    //     const res = await saveplaylist(db, mockUser.uid, 'playlist #2', docData)
    //     console.log(res)
    //     expect(res).toBeDefined()
    // })

    // test('fetch users playlists titles', async () => {
    //     const res = await fetchUserPlaylistsTitles(db, mockUser.uid)
    //     console.log(res)
    //     expect(res).toBeDefined()
    // })

    // test('fetch users playlists songs', async () => {
    //     const res = await fetchUserPlaylistsSongs(db, mockUser.uid, 'playlist #1')
    //     console.log(res)
    //     expect(res).toBeDefined()
    // })

    // test("delete a playlist", async () => {
    //     const res = await deleteplaylist(db, mockUser.uid, 'playlist #1')
    //     console.log(res)
    //     expect(res).toBeDefined()
    // }, 60000)

})

// afterAll(() => {})

