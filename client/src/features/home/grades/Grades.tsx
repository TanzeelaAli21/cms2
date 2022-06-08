import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import useGetHeight from '../../../custom hooks/useGetHeight';
import { useAppSelector } from '../../../hooks';
import { IGrades } from './grades.slice';

interface ITableHead {
  title: string,
  minWidth: number,
  align: 'left' | 'right' | 'center'
}

const tableHead : ITableHead[] = [
  {
    title: 'Marks',
    minWidth: 200,
    align: 'left'
  },
  {
    title: 'Grade',
    minWidth: 100,
    align: 'left'
  },
  {
    title: 'GPA',
    minWidth: 100,
    align: 'left'
  }
] 

const Grades = () => {
  const grades: IGrades[] = useAppSelector(state=> state.grade);
  return (
    <>
    <Paper sx={{width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{maxHeight: (+useGetHeight().height-150)}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {
                tableHead.map((item,index)=>(
                  <TableCell key={index} align={item.align} style={{minWidth: item.minWidth, fontWeight: 'bold'}}>
                    {item.title}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              grades.map((item, index)=>(
                <TableRow hover key={index}>
                  <TableCell>
                    {`${item.bottomRange} - ${item.topRange}`}
                  </TableCell>
                  <TableCell>
                    {item.grade}
                  </TableCell>
                  <TableCell>
                    {item.GPA}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </>
  )
}

export default Grades;