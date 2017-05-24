## Notes

#### Getting set up:
Make sure you're running Node v6 and then run
```bash
npm install
```
(If you need to upgrade your version of Node, [this tool](https://github.com/tj/n) is handy)

#### To generate a simple output:
```bash
npm run main 889 # outputs stats for user 889
```

#### To run tests:
```bash
npm test
```

#### To view the UI:
```bash
npm start # and navigate to localhost:3000 in your browser.
```
Unfortunately for now (until `babel` is added) the UI will only run in browsers that support ES2015

**Screenshot**:
<img width="1267" alt="screen shot 2017-05-23 at 11 18 02 pm" src="https://cloud.githubusercontent.com/assets/5264279/26389331/52008942-400e-11e7-8235-75fdd5038ba1.png" />

#### TODOs
- [x] Entry point to logic in `main.js`
- [x] Modularize helper functions 
- [x] Add unit tests for helper functions
- [x] Create API endpoints for a client to interact with
- [x] Create a simple UI for interacting with the data
- [ ] **BONUS**: Improve validations and error handling
- [ ] **BONUS**: Add `eslint`, `webpack`, `babel` for improved development experience
- [ ] **BONUS**: Improve UI with custom CSS
- [ ] **BONUS**: Deploy to Heroku/AWS
