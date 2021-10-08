import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.queryByText(/contact form/i);
  expect(header).toHaveTextContent(/contact form/i);
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  userEvent.type(firstName, "name");
  await waitFor(() => {
    const emptyFirstName = screen.queryByText(
      /must have at least 5 characters./i
    );

    expect(emptyFirstName).toBeInTheDocument();
  });
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    const emptyFirstName = screen.queryByText(
      /must have at least 5 characters./i
    );
    const emptyLastName = screen.queryByText(/is a required field./i);
    const emptyEmail = screen.queryByText(/must be a valid email address./i);
    expect(emptyFirstName).toBeInTheDocument();
    expect(emptyLastName).toBeInTheDocument();
    expect(emptyEmail).toBeInTheDocument();
  });
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);

  userEvent.type(firstName, "scout");
  userEvent.type(lastName, "reilly");
  userEvent.type(email, "");

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    const emptyEmail = screen.queryByText(/must be a valid email address./i);
    expect(emptyEmail).toBeInTheDocument();
  });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);

  userEvent.type(firstName, "scout");
  userEvent.type(lastName, "reilly");
  userEvent.type(email, "scoutreilly.com");

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    const emptyEmail = screen.queryByText(/must be a valid email address./i);
    expect(emptyEmail).toBeInTheDocument();
  });
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);

  userEvent.type(firstName, "scout");
  userEvent.type(lastName, "");
  userEvent.type(email, "test@test.com");

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    const emptyLastName = screen.queryByText(/lastName is a required field./i);
    expect(emptyLastName).toBeInTheDocument();
  });
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);
  // const message = screen.getByLabelText(/message/i);

  userEvent.type(firstName, "scout");
  userEvent.type(lastName, "reilly");
  userEvent.type(email, "test@test.com");

  const button = screen.getByRole("button");
  userEvent.click(button);

  const firstNameSub = screen.queryByTestId("firstnameDisplay");
  const lastNameSub = screen.queryByTestId("lastnameDisplay");
  const emailSub = screen.queryByTestId("emailDisplay");

  expect(firstNameSub).toBeInTheDocument();
  expect(lastNameSub).toBeInTheDocument();
  expect(emailSub).toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);
  const message = screen.getByLabelText(/message/i);

  userEvent.type(firstName, "scout");
  userEvent.type(lastName, "reilly");
  userEvent.type(email, "test@test.com");
  userEvent.type(
    message,
    "can't you see yourself by my side? no surprise when you're on his shoulder like every night"
  );

  const button = screen.getByRole("button");
  userEvent.click(button);

  const firstNameSub = screen.queryByTestId("firstnameDisplay");
  const lastNameSub = screen.queryByTestId("lastnameDisplay");
  const emailSub = screen.queryByTestId("emailDisplay");
  const messageSub = screen.queryByTestId("messageDisplay");

  expect(firstNameSub).toBeInTheDocument();
  expect(lastNameSub).toBeInTheDocument();
  expect(emailSub).toBeInTheDocument();
  expect(messageSub).toBeInTheDocument();
});
