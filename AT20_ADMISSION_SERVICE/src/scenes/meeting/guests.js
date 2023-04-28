const guests = [
    { name: 'Dan Reynols', number: "+59178819336"},
    { name: 'Juan Luis Guerra', number: "+59178819336"},
    { name: 'Adele', number: "+59178819336" },  
    { name: 'Alejandro Sanz', number: "+59178819336" },  
    { name: 'Lewis Capaldi', number: "+59178819336" },  
    { name: 'Fito Páez', number: "+59178819336" },  
  ];


import { GET_USERS} from '../../graphql/user';
import { useQuery } from '@apollo/client';

function guestsList () {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const usersArray = data.users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      photo: user.photo,
  }));

  return usersArray
}



export {guests, guestsList}