import {useState} from 'react';

const App = () => {
  const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://tst.moidex.ru/mirror_api/users/list', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {err && <h2>{err}</h2>}

      <button onClick={handleClick}>Fetch data</button>

      {isLoading && <h2>Loading...</h2>}

      {data.data.map(person => {
        return (
          <div key={person._id}>
            <h2>{person.name}</h2>
            <h2>{person.role}</h2>
            <h2>{person.login}</h2>
            
            <h2>{person.email}</h2>
            <h2>{person.number}</h2>
            <h2>{person.telegram_id}</h2>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default App;
