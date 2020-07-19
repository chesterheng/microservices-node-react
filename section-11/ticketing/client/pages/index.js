import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  // axios.get('/api/users/currentuser');

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async () => {
  // const response = await axios.get('/api/users/currentuser');

  // return response.data;
  console.log('I WAS EXECUTED');
  return {};
};

export default LandingPage;