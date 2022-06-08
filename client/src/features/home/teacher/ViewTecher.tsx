import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Divider, Grid, IconButton, InputAdornment, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { Clear, Search } from '@mui/icons-material';
import { designations } from '../../../models/user.model';
import { getTeachersAsync } from './teacher.slice';
import TeacherTable from './TeacherTable';

export interface ISearchValue {
    name: string,
    designation: string
}

const ViewTecher = () => {
    const { isLoading } =  useAppSelector(state=> state.teachers);
    const dispatch = useAppDispatch();
    const [ searching, setSearching ] = React.useState<true | false>(false);
    const [ searchValue, setSearchValue ] = React.useState<ISearchValue>({ name: '', designation: ''})
    const handleSearch = async () =>{
      setSearching(true);
      await dispatch(getTeachersAsync({
          token: localStorage.getItem('token') as string,
          search: searchValue
      }))
  }
    React.useEffect(()=>{
      handleSearch();
    },[])
    const handleChanges = (name: string, value: string) =>{
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
            View Teachers
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
                    <TextField label="Designation" select value={searchValue.designation}
                    onChange={(e)=>handleChanges(e.target.name, e.target.value)}
                    margin="dense" size="small" name="designation" fullWidth>
                        <MenuItem value={""}>Select</MenuItem>
                        {
                            designations.map((item,index)=><MenuItem key={index} value={item.value.toUpperCase()} >{item.title}</MenuItem>)
                        }
                    </TextField>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <LoadingButton
                  onClick={handleSearch} 
                  sx={{marginTop: '8px'}} 
                  color='primary' variant='contained'
                  startIcon= {<Search />}
                  loading={isLoading}
                  loadingPosition= "start"
                  fullWidth>Search</LoadingButton>
                </Grid>
            </Grid>
            <Divider sx={{margin: '10px 0px'}} />
            <TeacherTable searching={searching} />
        </Paper>
    </>
  )
}

export default ViewTecher;