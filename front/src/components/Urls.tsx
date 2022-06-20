import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Grid, Paper } from '@mui/material';
import { Add, Search, Delete } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { changeLocation } from '../utils/helpers';

const Urls = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUrls();
  }, []);

  const getUrls = () => {
    axios.get('http://localhost:20000').then((resp) => {
      setUrls(resp.data.items);
      setLoading(false);
    });
  };

  const deleteUrl = async (id: string) => {
    await axios.delete('http://localhost:20000', { params: { id } });
    await getUrls();
  };

  const columns: GridColDef[] = [
    { field: 'full', headerName: 'URL', width: 380 },
    { field: 'short', headerName: 'Short ID', width: 380 },
    { field: 'clicks', headerName: 'Clicks', width: 110 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 110,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <ButtonGroup disableElevation variant="contained">
          <Button
            size="small"
            color="info"
            onClick={() => changeLocation(`${window.location.host}/${params.row.short}`)}
          >
            <Search />
          </Button>
          <Button size="small" color="error" onClick={() => deleteUrl(params.row._id)}>
            <Delete />
          </Button>
        </ButtonGroup>
      )
    }
  ];

  return (
    <Paper elevation={3} sx={{ p: 2, margin: 'auto' }}>
      <Grid container>
        <Grid item xs sx={{ textAlign: 'right', paddingBottom: 2 }}>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Button color="info" variant="contained" endIcon={<Add />}>
              Ajouter
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs sx={{ textAlign: 'right', paddingBottom: 2, width: 1000, height: 500 }}>
          <DataGrid
            loading={loading}
            rows={urls}
            disableSelectionOnClick
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Urls;
