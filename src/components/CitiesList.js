import React, { useState, useEffect, useMemo, useRef } from "react";
import CityDataService from "../services/CityService";
import { useTable } from "react-table";

const CitiesList = (props) => {
  const [cities, setCities] = useState([]);
  const [searchName, setSearchName] = useState("");
  const citiesRef = useRef();

  citiesRef.current = cities;

  useEffect(() => {
    retrieveCities();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveCities = () => {
    CityDataService.getAll()
      .then((response) => {
        setCities(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const refreshList = () => {
  //   retrieveCities();
  // };

  const findByTitle = () => {
    CityDataService.findByTitle(searchName)
      .then((response) => {
        setCities(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openCity = (rowIndex) => {
    const id = citiesRef.current[rowIndex].id;

    props.history.push("/cities/" + id);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "name",
      },
      {
        Header: "Title2",
        accessor: "sex",
      },
      // {
      //   Header: "Description",
      //   accessor: "photo",
      // },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openCity(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: cities,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CitiesList;
