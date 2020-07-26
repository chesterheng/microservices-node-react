process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require('axios');

const cookie =
  'express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalZsT0dZME5qQTFOak5oWVRkbE1EQXlZMkl3TUdSbU5pSXNJbVZ0WVdsc0lqb2lkR1Z6ZERFd1FIUmxjM1F1WTI5dElpd2lhV0YwSWpveE5UZzJOVE0yTlRBMWZRLlh3R3p5UVZHYnFSaHZ1YWJDMTdsYzNtYlpQNU1XMnl1UU1kODU1Y0hEM3MifQ==';

const doRequest = async () => {
  const { data } = await axios.post(
    `https://ticketing.dev/api/tickets`,
    { title: 'ticket', price: 5 },
    {
      headers: { cookie },
    }
  );

  await axios.put(
    `https://ticketing.dev/api/tickets/${data.id}`,
    { title: 'ticket', price: 10 },
    {
      headers: { cookie },
    }
  );

  axios.put(
    `https://ticketing.dev/api/tickets/${data.id}`,
    { title: 'ticket', price: 15 },
    {
      headers: { cookie },
    }
  );

  console.log('Request complete');
};

(async () => {
  for (let i = 0; i < 200; i++) {
    doRequest();
  }
})();
