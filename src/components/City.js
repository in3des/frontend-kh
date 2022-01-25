import React, { useState, useEffect } from "react";
import CityDataService from "../services/CityService";

const City = props => {
  const initialCityState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentCity, setCurrentCity] = useState(initialCityState);
  const [message, setMessage] = useState("");

  const getCity = id => {
    CityDataService.get(id)
      .then(response => {
        setCurrentCity(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCity(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCity({ ...currentCity, [name]: value });
  };

  const updateCity = () => {
    CityDataService.update(currentCity.id, currentCity)
      .then(response => {
        console.log(response.data);
        setMessage("The city was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCity ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentCity.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentCity.description}
                onChange={handleInputChange}
              />
            </div>

          </form>


          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCity}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a City...</p>
        </div>
      )}
    </div>
  );
};

export default City;
