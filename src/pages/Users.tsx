import customFetch from '@/utils/customFetch';
import { useEffect, useState } from 'react';

const Users = () => {
  const [data, setData] = useState<UserProps[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await customFetch.get('/users');
        if (response.status === 200) {
          setData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  console.log(data);

  return <div>Users</div>;
};
export default Users;
