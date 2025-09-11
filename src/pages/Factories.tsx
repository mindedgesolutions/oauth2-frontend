import customFetch from '@/utils/customFetch';
import { useEffect, useState } from 'react';

const Factories = () => {
  const [data, setData] = useState<FactoryProps[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await customFetch.get('/factories');
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  console.log(data);

  return <div>Factories</div>;
};
export default Factories;
