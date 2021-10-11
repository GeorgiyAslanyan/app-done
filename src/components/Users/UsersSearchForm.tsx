import { Formik, Form, Field } from "formik";
import React from "react";
import { FilterType } from "../../redux/users-reducer";
import s from './Users.module.css'
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selector";

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void,
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: FilterType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{term: filter.term}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form className={s.form}>
                        <Field type="text" name="term"/>
                        <button type="submit" disabled={isSubmitting}>
                            Найти
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

export default UsersSearchForm