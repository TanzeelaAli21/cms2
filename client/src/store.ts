import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/auth.slice';
import courseReducer from './features/home/course/course.slice';
import gradeReducer from './features/home/grades/grades.slice';
import alertifyReducer from './components/slices/alertify.slice';
import studentReducer from './features/home/student/student.slice';
import teacherReducer from './features/home/teacher/teacher.slice';
import classReducer from './features/home/class/classes.slice';

export const store = configureStore({
  reducer: {
      alertify: alertifyReducer,
      auth: authReducer,
      course: courseReducer,
      class: classReducer,
      grade: gradeReducer,
      students: studentReducer,
      teachers: teacherReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch