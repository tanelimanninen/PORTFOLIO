import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import BlogForm from "../components/BlogForm"



//1. TEST
test("<BlogForm /> updates parent state correctly and calls onSubmit", async () => {
    const mockHandler = jest.fn()

    const user = userEvent.setup()

    //RENDER TEST BLOG
    const { container } = render(<BlogForm createBlog={mockHandler} />)

    screen.debug(container)

    //GET THE INPUT FIELDS
    const titleInput = screen.getByPlaceholderText("write title here")
    const authorInput = screen.getByPlaceholderText("write author here")
    const urlInput = screen.getByPlaceholderText("write url here")

    //GET SUBMIT BUTTON
    const button = container.querySelector(".create-button")

    //USER ACTIONS
    await user.type(titleInput, "otsikko" )
    await user.type(authorInput, "kirjoittaja" )
    await user.type(urlInput, "nettisivut" )
    await user.click(button)

    //EXPECT CREATEBLOG() TO BE CALLED ONCE ON FORM SUBMIT
    expect(mockHandler.mock.calls).toHaveLength(1)

    //EXPECT CORRECT DATA TO BE PASSED
    expect(mockHandler).toHaveBeenCalledWith({
        title: "otsikko",
        author: "kirjoittaja",
        url: "nettisivut",
    })
})