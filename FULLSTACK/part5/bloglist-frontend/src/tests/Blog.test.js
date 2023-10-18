import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "../components/Blog"

//1. TEST
test("renders title", () => {
    const blog = {
        title: "Otsikko",
        author: "Kirjoittaja",
        url: "www.nettisivu.fi/blogi/"
    }

    //RENDER TEST BLOG
    render(<Blog blog={blog} />)

    const element = screen.getByText(/otsikko/i)
    screen.debug(element)
    //EXPECT THAT TITLE IS RENDERED
    expect(element).toBeDefined()
})

//2. TEST
test("renders rest of the data when button is pushed", async () => {
    const blog = {
        title: "Otsikko",
        author: "Kirjoittaja",
        url: "www.nettisivu.fi",
        likes: 7
    }

    //RENDER TEST BLOG
    render(<Blog blog={blog} />)

    const user = userEvent.setup()

    const button = screen.getByText(/view/i)
    console.log("button before pushed")
    screen.debug(button)
    await user.click(button)

    console.log("whole element after view-button pushed")
    screen.debug()

    //EXPECT THAT BUTTON HAS BEEN PUSHED
    const buttonAfterPushed = screen.getByText(/hide/i)
    console.log("button after pushed")
    screen.debug(buttonAfterPushed)
    expect(buttonAfterPushed).toBeInTheDocument()

    //EXPECT THAT REST OF THE DATA IS NOW RENDERED
    const url = screen.getByText(/www.nettisivu.fi/i)
    const likes = screen.getByText(/7/i)

    screen.debug(url)
    screen.debug(likes)
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
})

//3. TEST
test("updateLikes() is called twice when button is pushed twice", async () => {
    const blog = {
        title: "Otsikko",
        author: "Kirjoittaja",
        url: "www.nettisivu.fi",
        likes: 7
    }

    const mockHandler = jest.fn()

    //RENDER TEST BLOG
    const { container } = render(<Blog blog={blog} updateLikes={mockHandler} />)

    console.log("container after render")
    screen.debug(container)

    const user = userEvent.setup()

    //GET AND PUSH THE VIEW-BUTTON
    const viewButton = screen.getByText(/view/i)
    await user.click(viewButton)

    console.log("whole element after view-button pushed")
    screen.debug()

    //GET AND PUSH THE LIKE-BUTTON TWICE
    const likeButton = container.querySelector(".like-button")
    await user.click(likeButton)
    await user.click(likeButton)

    //EXPECT UPDATELIKES() TO BEEN CALLED TWICE
    expect(mockHandler.mock.calls).toHaveLength(2)
})