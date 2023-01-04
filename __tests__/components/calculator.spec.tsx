import "@testing-library/jest-dom"

import { cleanup, render, screen, waitFor } from "@testing-library/react";

import Calculator from "../../components/Calculator";
import userEvent from "@testing-library/user-event"

//sets up userEvent to reuse it through the test
const user = userEvent.setup()

describe("Calculator component testing", () => {

  describe("Calculator fields", () => {
    it("has all the fields", () => {
      const component = render(<Calculator />);
      expect(document.getElementById("first")).toBeInTheDocument();
      expect(document.getElementById("second")).toBeInTheDocument();
      expect(document.getElementById("operation")).toBeInTheDocument();
      expect(document.querySelector("button[type=submit]")).toBeInTheDocument();
    });
  
  })
  
  describe("Calculator functionality", () => {
    it("Should be able to type on input fields and select operation", async () => {
      render(<Calculator />)
      
      //text field #1
      const inputFieldFirst: HTMLInputElement = screen.getByLabelText(/First Number/i)
      await user.type(inputFieldFirst, '3')
      expect(inputFieldFirst.value).toBe("3")
      
      //text field #2
      const inputFieldSecond: HTMLInputElement = screen.getByLabelText(/Second Number/i)
      await user.type(inputFieldSecond, '4')
      expect(inputFieldSecond.value).toBe("4")
  
    })

    describe("Should allow user to change operation", () => {
      function changeUserOperation(userEventOp: string, selectOp: string, value: string) {
        user.selectOptions(
          // Find the select element
          screen.getByRole("combobox"),
          // Find and select the add option
          screen.getByRole("option", { name: userEventOp })
        )
  
        const selectOperation: HTMLInputElement = screen.getByRole("option", { name: selectOp })
        expect(selectOperation.value).toBe(value)
      }
      it("should allow user to change to addition", () => {
        render(<Calculator />)
        changeUserOperation("+", "+", "add")
      })
  
      it("should allow user to change to subtraction", () => {
        render(<Calculator />)
        changeUserOperation("-", "-", "subtract")
      })
  
      it("should allow user to change to multiplication", () => {
        render(<Calculator />)
        changeUserOperation("*", "*", "multiply")
      })
  
      it("should allow user to change to division", () => {
        render(<Calculator />)
        changeUserOperation("/", "/", "divide")
      })
    })
  })
});


describe("Calculator component testing errors", () => {
  describe("Calculator shows help text explaining the issue", () => {
    
    afterEach(cleanup);

    it("Should show help text on First Number input when entering a non-numeric value", async () => {
      render(<Calculator />)
      const inputFieldFirst: HTMLInputElement = screen.getByLabelText(/First Number/i)
      await user.type(inputFieldFirst, 'a')

      const inputFieldSecond: HTMLInputElement = screen.getByLabelText(/Second Number/i)
      await user.type(inputFieldSecond, '4')

      user.selectOptions(
        screen.getByRole("combobox"),
        screen.getByRole("option", { name: "+" })
      )

     const button = screen.getByRole("button")
     userEvent.click(button)

     waitFor(() => {
      expect(screen.findByText("Value is not numeric")).toBeInTheDocument()
     })

    })

    fit("Should show help text on Second Number input when entering a non-numeric value", async () => {
      render(<Calculator/>)
      const inputFieldFirst: HTMLInputElement = screen.getByLabelText(/First Number/i)
      await user.type(inputFieldFirst, '2')

      const inputFieldSecond: HTMLInputElement = screen.getByLabelText(/Second Number/i)
      await user.type(inputFieldSecond, 'b')
    
     user.selectOptions(
       screen.getByRole("combobox"),
       screen.getByRole("option", { name: "-" })
     )

     const button = screen.getByRole("button")
     userEvent.click(button)

     await waitFor(async () => {
      expect(await screen.findByText("DJFHGNSFJGKGNKD224235346456##")).toBeInTheDocument()
     })

    })
  })
  
})
