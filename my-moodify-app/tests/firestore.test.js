const { getAuth } = require("firebase/auth")
const { getFirestore } = require("firebase/firestore")

const { signUp, signIn, passwordReset } = require("../../my-moodify-app/tests/jest.setup")

let auth, db

const mockUser = {
    email: "mock@example.com",
    username: "mokzy",
    password: "password01"
}

beforeAll(() => {
    auth = getAuth(global.firebaseApp)
    db = getFirestore(global.firebaseApp)
})

describe("authenication tests", () => {

    test("create an account", async () => {
        const createdAccount = await signUp(auth, mockUser.email, mockUser.password)
        await expect(Promise.resolve(createdAccount)).resolves.toBeDefined()
    })

    test("sign-in an account", async() => {
        const signInAccount = await signIn(auth, mockUser.email, mockUser.password)
        await expect(Promise.resolve(signInAccount)).resolves.toBeDefined()
    })

    test("forgot password", async() => {
        const resetPassword = await passwordReset(auth, mockUser.email)
        await expect(Promise.resolve(resetPassword)).resolves.toBeDefined()
    })
})

describe("firestore tests", () => {

    test("set username", async() => {

    })

    test("name and save playlists", async() => {

    })

    test("delete playlists", async() => {

    })

})

// afterAll()

