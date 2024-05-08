const express = require('express');
const { stringify } = require('querystring');
const axios = require('axios');
const app = express();
var received = '';
let windowPrevState = [];
let result = {
    "windowPrevState": [],
    "windowCurrState": [],
    "numbers": [],
    "avg":0.0
}
const token = {
  token_type: "Bearer",
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTUwMzI4LCJpYXQiOjE3MTUxNTAwMjgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjVhZmI2ZmJkLTY0Y2MtNGQyZi04ZDhlLTlhZjNhMzI5ODNjNyIsInN1YiI6IjIxMDUxNzQxQGtpaXQuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJBZmZvcmRNZWRpY2FsIiwiY2xpZW50SUQiOiI1YWZiNmZiZC02NGNjLTRkMmYtOGQ4ZS05YWYzYTMyOTgzYzciLCJjbGllbnRTZWNyZXQiOiJtQldtYUtIWUlBclBuVXhFIiwib3duZXJOYW1lIjoiTWFudGhhbiIsIm93bmVyRW1haWwiOiIyMTA1MTc0MUBraWl0LmFjLmluIiwicm9sbE5vIjoiMjEwNTE3NDEifQ.-nBhnlpCWDmoTs7O0Q9azHlPputJofAgwZLj8Lorlbk",
  expires_in: 1715150328,
};
const credentials = {
   'headers': { Authorization: `Bearer ${(token.access_token)}` }
};
const FetchData =  (url)=> {
    axios.get(url,credentials)
    .then((res)=> {
        return res;
    }).catch((err)=> {
        return err;
    }) 
}
 const calculateAverage = (numbers)=> {
    if (numbers.length > 10) numbers.length = 10;
    for (let number of numbers) 
        avg = (number / number.length) * number.length;
    return avg;
 } 
function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
app.get("/numbers/:param", (req, res) => {
  const {param} = req.params;
  const url = `http://20.244.56.144/test/${param}`;
    responce = FetchData(url);
    numbers = removeDuplicates(numbers);
    result.numbers = responce.numbers;
    result.avg = avg;
    result.windowPrevState = windowPrevState;
    result.windowCurrState = numbers;
    windowPrevState = numbers;
    res.send(result);
});

app.listen(3000, ()=> {
    console.log('Server is Listening');
})