
To install the controls demo:
  - run npm install in the root directory
  - run npm install in the components directory
    - Note: in components/package.json temporarily change the dependency  "@kdsoft/lit-mvvm": "^2.1.0" to "@kdsoft/lit-mvvm": ".."
    - After running the demo, change the dependency back so that the components can be published properly
  - switch to the demo/controls directory
  - run "npm install" 

To run the demo:
  - switch to the demo/controls directory
  - use "npm run start", this starts the vite dev server and opens a browser
