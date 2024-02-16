# cypress-basico-v2

Sample project for the basic course of the Talking About Testing.

The test suite is made entirely following TAT course, a bit more updated to Cypress 10.0.

## Pre-requirements

It is required to have Node.js and npm installed to run this project.

> I used versions `v16.13.2` and `8.3.2` of Node.js and npm, respectively. I suggest you use the same or later versions.

## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

You can run the tests simulating a desktop or a mobile viewport.

## To run in Desktop

Run `npm test` (or `npm t` for the short version) to run the test in headless mode on a desktop viewport.

Or, run `npm run cy:open` to open Cypress in interactive mode on a desktop viewport.

## To run on Mobile

Run `npm run test:mobile` to run the test in headless mode.

Or, run `npm run cy:open` to open Cypress in interactive mode.
