// import React, { useState, useEffect, useMemo, useRef } from "react";
// import Pagination from "@material-ui/lab/Pagination";
// import CityDataService from "../services/CityService";
// import { useTable } from "react-table";
//
// const CitiesList = (props) => {
//   const [cities, setCities] = useState([]);
//   const [searchName, setSearchName] = useState("");
//   const citiesRef = useRef();
//
//   const [page, setPage] = useState(1);
//   const [count, setCount] = useState(0);
//   const [pageSize, setPageSize] = useState(3);
//
//   const pageSizes = [3, 6, 9];
//
//   citiesRef.current = cities;
//
//   const onChangeSearchTitle = (e) => {
//     const searchName = e.target.value;
//     setSearchName(searchName);
//   };
//
//   const getRequestParams = (searchName, page, pageSize) => {
//     let params = {};
//
//     if (searchName) {
//       params["title"] = searchName;
//     }
//
//     if (page) {
//       params["page"] = page - 1;
//     }
//
//     if (pageSize) {
//       params["size"] = pageSize;
//     }
//
//     return params;
//   };
//
//   const retrieveCities = () => {
//     const params = getRequestParams(searchName, page, pageSize);
//
//     CityDataService.getAll(params)
//       .then((response) => {
//         const { cities, totalPages } = response.data;
//
//         setCities(cities);
//         setCount(totalPages);
//
//         console.log(response.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };
//
//   useEffect(retrieveCities, [page, pageSize]);
//
//   const refreshList = () => {
//     retrieveCities();
//   };
//
//   const findByTitle = () => {
//     setPage(1);
//     retrieveCities();
//   };
//
//   const openCity = (rowIndex) => {
//     const id = citiesRef.current[rowIndex].id;
//
//     props.history.push("/cities/" + id);
//   };
//
//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };
//
//   const handlePageSizeChange = (event) => {
//     setPageSize(event.target.value);
//     setPage(1);
//   };
//
//   const columns = useMemo(
//     () => [
//       {
//         Header: "Title",
//         accessor: "title",
//       },
//       {
//         Header: "Description",
//         accessor: "description",
//       },
//       {
//         Header: "Actions",
//         accessor: "actions",
//         Cell: (props) => {
//           const rowIdx = props.row.id;
//           return (
//             <div>
//               <span onClick={() => openCity(rowIdx)}>
//                 <i className="far fa-edit action mr-2"></i>
//               </span>
//             </div>
//           );
//         },
//       },
//     ],
//     []
//   );
//
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({
//     columns,
//     data: cities,
//   });
//
//   return (
//     <div className="list row">
//       <div className="col-md-8">
//         <div className="input-group mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search by title"
//             value={searchName}
//             onChange={onChangeSearchTitle}
//           />
//           <div className="input-group-append">
//             <button
//               className="btn btn-outline-secondary"
//               type="button"
//               onClick={findByTitle}
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </div>
//
//       <div className="col-md-12 list">
//         <div className="mt-3">
//           {"Items per Page: "}
//           <select onChange={handlePageSizeChange} value={pageSize}>
//             {pageSizes.map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//
//           <Pagination
//             className="my-3"
//             count={count}
//             page={page}
//             siblingCount={1}
//             boundaryCount={1}
//             variant="outlined"
//             shape="rounded"
//             onChange={handlePageChange}
//           />
//         </div>
//
//         <table
//           className="table table-striped table-bordered"
//           {...getTableProps()}
//         >
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {rows.map((row, i) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => {
//                     return (
//                       <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//
//     </div>
//   );
// };
//
// export default CitiesList;
