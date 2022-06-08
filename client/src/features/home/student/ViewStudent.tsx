import { LoadingButton } from '@mui/lab';
import { Divider, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getStudentsAsync } from './student.slice';
import StudentTable from './StudentTable';

export interface ISearchValue {
  name: string,
  rollNo: string
}

const ViewStudent = () => {
  const { isLoading } = useAppSelector(state=> state.students);
  const dispatch = useAppDispatch();
  const [ searching, setSearching ] = React.useState<true | false>(false);
  const [ searchValue, setSearchValue ] = React.useState<ISearchValue>({ name: '', rollNo: ''})
  const handleSearch = async () =>{
    setSearching(true);
    await dispatch(getStudentsAsync({
        token: localStorage.getItem('token') as string,
        search: searchValue
    }));
  }
  const handleChanges = (name: string, value: string) => {
    setSearchValue((searchValue)=>{
      return {...searchValue, [`${name}`]: value.toUpperCase()}
    });
  }
  return (
    <>
        <Paper
            sx={{padding: '20px', width: '90%', overflow: 'hidden'}}
            variant="elevation"
            elevation={4}
        >
          <Typography
            variant="h3"
            component="h3"
            fontSize="25px"
            align="left"
            color="rgba(0,0,0,0.75)"
            padding="0px 0px 10px 0px"
          >
            View Students
          </Typography>
            <Grid spacing={1} container>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <TextField
                    label="Name"
                    name="name"
                    margin="dense"
                    size="small"
                    type="text"
                    value={searchValue.name}
                    onChange={(e)=>handleChanges(e.target.name, e.target.value)}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>
                        {
                          searchValue.name && <IconButton size="small" onClick={()=> setSearchValue((search)=>({...search,name: ''}))}> <Clear /> </IconButton>
                        }
                      </InputAdornment>
                    }}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <TextField
                    label="Roll No"
                    name="rollNo"
                    margin="dense"
                    size="small"
                    type='text'
                    value={searchValue.rollNo}
                    onChange={(e)=>handleChanges(e.target.name, e.target.value)}
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>
                        {
                          searchValue.rollNo && <IconButton size="small" onClick={()=> setSearchValue((search)=>({...search,rollNo: ''}))}> <Clear /> </IconButton>
                        }
                      </InputAdornment>
                    }}
                    />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <LoadingButton
                  onClick={handleSearch} 
                  sx={{marginTop: '8px'}} 
                  color='primary' variant='contained'
                  startIcon= {<Search />}
                  disabled={!Boolean(searchValue.name || searchValue.rollNo)}
                  loading={isLoading}
                  loadingPosition= "start"
                  fullWidth>Search</LoadingButton>
                </Grid>
            </Grid>
            <Divider sx={{margin: '10px 0px'}} />
            <StudentTable searching={searching} />
        </Paper>
    </>
  )
}

export default ViewStudent;