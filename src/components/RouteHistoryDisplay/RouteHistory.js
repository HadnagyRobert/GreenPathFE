import React, { useContext, useEffect, useState } from 'react';
import RouteHistoryApi from '../../Api/RouteHistoryApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './RouteTable.css';
import { AuthContext } from '../AuthContext/AuthContext';

export default function BasicTable() {
  const [routes, setRoutes] = useState([])
  const { tokenPayload } = useContext(AuthContext)

  useEffect(() => {

    if (tokenPayload) {
      getAllHistory(tokenPayload.userId);
    }

  }, [tokenPayload])

  const getAllHistory = (id) => {
    RouteHistoryApi.getAllRouteHistory(id)
      .then(data => setRoutes(data))
      .catch(error => console.log(error));
  }

  

  const handleDelete = (id) => {

    RouteHistoryApi.deleteRouteHistory(id)
    .then(() => getAllHistory(tokenPayload.userId));
  }

  const handleDeleteAll = () => {
    if(tokenPayload){
      RouteHistoryApi.deleteAllRouteHistory(tokenPayload.userId);
    }
    
  }

  function createData(id, Origin, Destination, Length, Duration, Air_Quality, Date) {
    return { id, Origin, Destination, Length, Duration, Air_Quality, Date };
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Origin</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell align="right">Length</TableCell>
            <TableCell align="right">Duration</TableCell>
            {/* <TableCell align="right">Air Quality</TableCell> */}
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {routes.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.origin}
              </TableCell>
              <TableCell>{row.destination}</TableCell>
              <TableCell align="right">{row.length} km</TableCell>
              <TableCell align="right">{row.duration} min</TableCell>
              {/* <TableCell align="right">{row.length}</TableCell> */}
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align='right'><IconButton onClick={() => handleDelete(row.id)} color='error' aria-label="delete" size="small">
                <DeleteIcon />
              </IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* TODO: insert actual userId */}
      <IconButton onClick={() => handleDeleteAll()} color='error' aria-label="delete" size="large">
        Clear All<DeleteIcon />
      </IconButton>
    </TableContainer>


  );
}