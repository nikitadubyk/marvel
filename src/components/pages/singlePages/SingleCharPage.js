import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelServices from '../../../services/MarvelServices';

import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import AppBanner from '../../appBanner/AppBanner';

import './singleComicPage.scss';

const SingleCharPage = () => {
    const [char, setChar] = useState({});
    const { id } = useParams();

    const { loading, error, getCharacter, clearError } = useMarvelServices();

    useEffect(() => {
        updateChar(id);
    }, [id]);

    const setCharHandler = char => {
        setChar(char);
    };

    const updateChar = id => {
        clearError();
        getCharacter(id).then(res => setCharHandler(res));
    };

    const spinner = loading ? <Spinner /> : null;
    const errorMassage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !char) ? <View data={char} /> : null;

    return (
        <>
            <AppBanner />
            {spinner}
            {errorMassage}
            {content}
        </>
    );
};

const View = ({ data }) => {
    const { thumbnail, title, description } = data;
    return (
        <div className='single-comic'>
            <img
                src={thumbnail}
                alt={title}
                className='single-comic__char-img'
            />
            <div className='single-comic__info'>
                <h2 className='single-comic__name'>{title}</h2>
                <p className='single-comic__descr'>{description}</p>
            </div>
            <Link to='/' className='single-comic__back'>
                Back to all
            </Link>
        </div>
    );
};

export default SingleCharPage;
