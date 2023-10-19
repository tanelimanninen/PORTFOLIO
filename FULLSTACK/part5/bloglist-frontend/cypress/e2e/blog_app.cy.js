describe("Blog app", function() {
    //BEFORE EVERY TEST IS RUN
    beforeEach(function() {
        //CLEAR TEST DATA
        cy.request("POST", "http://localhost:3003/api/testing/reset")

        //MAKE AND POST NEW TEST USER
        const user = {
            username: "user1",
            name: "new user",
            password: "secret"
        }

        //MAKE ANOTHER (FOR TEST 7)
        const user2 = {
            username: "user2",
            name: "new user2",
            password: "secret2"
        }

        cy.request("POST", "http://localhost:3003/api/users/", user)
        cy.request("POST", "http://localhost:3003/api/users/", user2)

        //OPEN UI
        cy.visit("http://localhost:5173")
    })

    //1. TEST
    it("Login form is shown", function() {
        cy.contains("Log In")
        cy.contains("Username")
        cy.contains("Password")
        cy.contains("login")
    })

    describe("Login",function() {
        //2. TEST
        it("succeeds with correct credentials", function() {
            /*cy.get("#username").type("user1")
            cy.get("#password").type("secret")
            cy.get("#log-in-button").click()*/

            cy.login({ username: "user1", password: "secret" })

            cy.contains("user1 logged in")
        })

        //3. TEST
        it("fails with wrong credentials", function() {
            cy.get("#username").type("user1")
            cy.get("#password").type("this is wrong")
            cy.get("#log-in-button").click()

            cy.get(".error").contains("Wrong username or password")
        })
    })

    describe("When logged in", function() {
        //LOG IN USER
        beforeEach(function() {
            /*cy.get("#username").type("user1")
            cy.get("#password").type("secret")
            cy.get("#log-in-button").click()*/

            cy.login({ username: "user1", password: "secret" })
        })

        //4. TEST
        it("A blog can be created", function() {
            /*cy.contains("New blog").click()
            cy.get("#blog-title").type("new blog for testing")
            cy.get("#blog-author").type("test writer")
            cy.get("#blog-url").type("www.test-blog.com/new-blog-for-testing/")
            cy.get("#create-button").click()*/

            cy.createBlog({
                title: "new blog for testing",
                author: "test writer",
                url: "www.test-blog.com/new-blog-for-testing/",
                likes: 1
            })

            cy.contains("new blog for testing - test writer")
        })

        //5. TEST
        it("A blog can be liked", function() {
            cy.createBlog({
                title: "new blog for testing",
                author: "test writer",
                url: "www.test-blog.com/new-blog-for-testing/",
            })

            cy.get("#view-button").click()
            cy.get("#like-button").click()

            cy.contains("Likes: 1")
        })

        //6. TEST
        it("A blog can be deleted by user that made it", function() {
            cy.createBlog({
                title: "new blog for testing",
                author: "test writer",
                url: "www.test-blog.com/new-blog-for-testing/",
            })

            cy.get("#view-button").click()
            cy.get("#delete-button").click()

            cy.contains("Deletion successful")
        })

        //7. TEST
        it("Only the maker of blog sees the delete-button", function() {
            //CREATE BLOG WITH USER 1
            cy.createBlog({
                title: "new blog for testing",
                author: "test writer",
                url: "www.test-blog.com/new-blog-for-testing/",
            })

            //LOG OUT USER 1
            cy.contains("logout").click()

            //LOG IN USER 2
            cy.login({ username: "user2", password: "secret2" })

            //OPEN THE BLOG WITH MORE DATA
            cy.get("#view-button").click()

            //CHECK THAT PAGE DOESN'T CONTAIN DELETE-BUTTON
            cy.get("#delete-button").should("not.exist")
        })

        //8. TEST
        it("Multiple blogs are listed by the amount of likes", function() {
            //CREATE 2 BLOGS WITH USER 1
            cy.createBlog({
                title: "new blog for testing",
                author: "test writer",
                url: "www.test-blog.com/new-blog-for-testing/",
                likes: 12
            })

            cy.createBlog({
                title: "second new blog",
                author: "test writer",
                url: "www.test-blog.com/second-new-blog/",
                likes: 55
            })

            //CHECK THAT THE ORDER IS AS EXPECTED
            cy.get(".single-blog").eq(0).should("contain", "second new blog - test writer")
            cy.get(".single-blog").eq(1).should("contain", "new blog for testing - test writer")
        })
    })
})