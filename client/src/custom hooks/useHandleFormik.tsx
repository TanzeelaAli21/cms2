import { useFormik } from 'formik';

const useHandleFormik = (initialValue:any,validationSchema : any , handleSubmit : ()=> void  ) => {
    const handleFormik = useFormik({
        initialValues: initialValue,
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
                handleSubmit();
                console.log(values);
                setSubmitting(false);
                resetForm();
            } catch (error : any) {
                setSubmitting(false);
                setErrors(error);
            }
        }

    })
    return handleFormik;
}

export default useHandleFormik;
