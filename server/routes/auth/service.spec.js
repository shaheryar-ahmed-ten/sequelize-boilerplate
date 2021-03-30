const {AuthService} = require("./service")
const messages = require("./messages")
const { RegisterValidation, LoginValidation } = require("./validation")
const { assert } = require("joi")
const authService = new  AuthService()
let token = ""

describe("Auth User", () => {
    // test("Register User", async () => {
    //     const fields = {
    //         first_name: "Stanley",
    //         last_name: "Moody",
    //         password: "eUgqJpdjPNwsAEdH",
    //         email: "hobco@ilawah.tl",
    //         role_id: 2
    //     }
    //     const isValid = await RegisterValidation.validateAsync(fields)
    //     if(isValid){
    //         const user = await authService.register(fields)
    //         expect(user.message).toBe(messages.user_success)
    //     }
    // })

    test("Login User", async () => {
        const fields = {
            password: "eUgqJpdjPNwsAEdH",
            email: "hobco@ilawah"
        }
        const isValid = await LoginValidation.validateAsync(fields)
        console.log("isValid", isValid.message)
        if(isValid){
            const user = await authService.login(fields)
            token = user.data.token
            expect(user.message).toBe(messages.LOGIN_SUCCESS)
        }
    })
    
})
