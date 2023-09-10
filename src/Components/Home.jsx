import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Style.css'


const Home = () => {
  const [apiData, setApiData] = useState({});

  const baseURL = `https://run.mocky.io/v3/ae511409-8c0e-40ed-9336-aebcb602823d`;

  const callApi = async () => {
    try {
      //Fetching API as specified
      const res = await axios.get(baseURL)
        .then((response) => {
          //Grouping data based on its status
          const groupedData = response.data.data.reduce((result, currentItem) => {
            const { status } = currentItem;

            if (!result[status]) {
              result[status] = [];
            }

            result[status].push(currentItem);

            return result;
          }, {});
          //Store the fetched data in state 'apiData'
          setApiData(groupedData);
        });

    } catch (error) {
      // console.log(error);
    }
  }

  //call API on render for the first time and handle any side effects
  useEffect(() => {
    // Function to call API
    callApi();
  }, [])

  return (
    <div>
      <div className="grid-container">
        {
          //Mapping the grouped data based on status 
          Object.keys(apiData).map((elem,index) => {
            return (
              <>
                <div className="grid-item" key={index+elem}>
                  <h1>{elem}</h1>
                  {apiData[elem].map((el) => {
                    return (
                      <>
                        <div className='grid-item subsection' key={el.id}>
                          <h4>{el.name}</h4>
                          <ul>
                            <li><img src='https://via.placeholder.com/18x18' /> {el.last_updated_at}</li>
                            <li><img src='https://via.placeholder.com/18x18' />{el.location}</li>
                            <li><img src='https://via.placeholder.com/18x18' />{el.gender}</li>
                          </ul>

                        </div>
                      </>
                    )
                  })}
                </div>
              </>
            )
          })}
      </div>
    </div>
  )
}

export default Home