import { Clear, Create, Search } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Divider, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCoursesAsync } from '../course/course.slice';
import { getStudentsAsync } from '../student/student.slice';
import { ISearchValue } from '../student/ViewStudent';
import { getTeachersAsync } from '../teacher/teacher.slice';
import { ICreateClass } from '../../../models/class.model';
import agent from '../../../api/agent';
import { createAlert } from '../../../components/slices/alertify.slice';

const CreateClass = () => {
  const dispatch = useAppDispatch();
  const {course, teachers, students} = useAppSelector(state=>state);
  
  const [ isCreating, setIsCreating] = React.useState<true | false>(false);
  const [ searchValue, setSearchValue ] = React.useState<ISearchValue>({ name: '', rollNo: ''})
  const [ classConstraints, setClassConstraints] = React.useState<ICreateClass>({
    courseId: -1,
    students: [],
    teacherId: -1
  });
  const [selectedStudents, setSelectedStudents] = React.useState<GridSelectionModel>([]);
  useEffect(()=>{
    const getCourses = async () => await dispatch(getCoursesAsync(localStorage.getItem('token') as string));
    getCourses();
    const getTeachers = async () => await dispatch(getTeachersAsync({
      token: localStorage.getItem('token') as string,
      search: { name: '', designation: '' }
    }))
    getTeachers();
  },[])
  useEffect(()=>{
    setClassConstraints((classConstraints)=> (
      {
      ...classConstraints,
       students: (selectedStudents as unknown) as number[]
      }))
  }, [selectedStudents])
  const handleSearch = async () =>{
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
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Full Name',
      width: 200
    },
    {
      field: 'RollNo',
      headerName: 'Roll No',
      width: 200
    }
  ]
  const createClass = async () =>{
    setIsCreating(true);
    const response = await agent.classess.createClass(
      localStorage.getItem('token') as string,
      classConstraints
    )
    if(response.success){
      dispatch(createAlert({
        severity: 'success',
        message: response.message as string,
        open: true
      }))
      setClassConstraints({
        courseId: -1,
        students: [],
        teacherId: -1
      })
      setIsCreating(false);
    }
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
            Create Class
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Autocomplete
                onChange={(event:any,newValue) => setClassConstraints((classConstraints)=>({...classConstraints, courseId: +(newValue?.value ? newValue.value : -1) }))}
                options = {course.courses.map(item=>({label: `${item.courseId} - ${item.courseName} - ${item.creditHours}`, value: item.id}))}
                renderInput = {(params)=><TextField {...params} margin='dense' label="Select Course" />}
               />
              {/* <TextField select margin='dense' label="Select Course"
                fullWidth
              >
                {
                  course.courses.map(item=>(<MenuItem key={item.id} value={item.id}>
                    {`${item.courseId} - ${item.courseName} - ${item.creditHours}`}
                  </MenuItem>))
                }
              </TextField> */}
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              {/* <TextField select margin='dense' label="Select Teacher"
                fullWidth
              >
                {
                  teachers.teachers.filter(item =>item.active).map(item=><MenuItem key={item.id} value={item.id}>
                    {`${item.designation} - ${item.name}`}
                  </MenuItem>)
                }
              </TextField> */}
              <Autocomplete
                onChange={(event:any,newValue) => setClassConstraints((classConstraints)=>({...classConstraints, teacherId: +(newValue?.value ? newValue?.value : -1 ) }))}
                options = {teachers.teachers.filter(item =>item.active).map(item=>({label: `${item.name} - ${item.designation}`, value: item.id}))}
                renderInput = {(params)=><TextField {...params} margin='dense' label="Select Teacher" />}
               />
            </Grid>
          </Grid>
          <Divider sx={{my: '10px'}} />
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
                  loading={students.isLoading}
                  loadingPosition= "start"
                  fullWidth>Students</LoadingButton>
                </Grid>
            </Grid>
            <Divider sx={{marginTop: '10px'}} />
            {
              students.students.length > 0 ? 
              <DataGrid
              sx={{width: '100%', height: 400}}
              rowsPerPageOptions={[5]}
              onSelectionModelChange = {
                (newSelectedStudents)=> setSelectedStudents(newSelectedStudents)
              }
              selectionModel={selectedStudents}
              pageSize={10}
              pagination
              checkboxSelection
              columns={columns}
              rows={students.students.filter(item=> ( item.active && {name: item.name, RollNo: item.RollNo}))}
              /> : <Typography color="CaptionText" marginTop={'10px'} component={'h5'} variant={'h5'}>No students found</Typography>
            }
            <br />
            {
              (selectedStudents.length > 0 && classConstraints.courseId !== -1 && classConstraints.teacherId !== -1 ) &&  
              <LoadingButton
              sx={{marginTop: '8px'}} 
              color='primary' variant='contained'
              startIcon= {<Create />}
              loadingPosition= "start"
              fullWidth
              loading={isCreating}
              onClick={createClass}
              >
                Create Class
              </LoadingButton>
            }
      </Paper>
    </>
  )
}

export default CreateClass;