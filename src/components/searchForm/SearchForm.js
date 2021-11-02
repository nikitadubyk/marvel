import { useState } from 'react';
import {
    Formik,
    Form,
    Field,
    ErrorMessage as FormikErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import useMarvelServices from '../../services/MarvelServices';
import './SearchForm.scss';

const SearchForm = () => {
    const [char, setChar] = useState(null);

    const { clearError, getCharacterByName, loading } = useMarvelServices();

    const onCharLoaded = char => {
        setChar(char);
        console.log(char);
    };

    const submitRequest = name => {
        clearError();

        getCharacterByName(name).then(res => onCharLoaded(res));
    };

    const result = !char ? null : char.length > 0 ? (
        <div className='find__wrapper'>
            <div className='form__success'>
                There is! Visit {char[0].name} page?
                <a href={char[0].wiki} className='button button__secondary'>
                    <div className='inner'>TO PAGE</div>
                </a>
            </div>
        </div>
    ) : (
        <div className='form__error'>
            The character was not found. Check the name and try again
        </div>
    );

    return (
        <div className='find'>
            <Formik
                initialValues={{ charName: '' }}
                validationSchema={Yup.object({
                    charName: Yup.string()
                        .required('This field is required')
                        .min(2, 'Minimum 2 characters'),
                })}
                onSubmit={({ charName }) => {
                    submitRequest(charName);
                }}
            >
                <Form>
                    <h2 className='find__title'>
                        Or find a character by name:
                    </h2>
                    <div className='find__form'>
                        <Field
                            name='charName'
                            type='text'
                            placeholder='Enter name'
                            className='find__input'
                        />
                        <button
                            className='button button__main'
                            type='submit'
                            disabled={loading}
                        >
                            <div className='inner'>Find</div>
                        </button>
                    </div>
                    <FormikErrorMessage
                        component='div'
                        className='form__error'
                        name='charName'
                    />
                </Form>
            </Formik>
            {result}
        </div>
    );
};

export default SearchForm;
