import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelServices from '../../../services/MarvelServices';

import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const [comics, setComics] = useState([]);
    const { id } = useParams();
    const { loading, error, getComics, clearError } = useMarvelServices();

    useEffect(() => {
        updateComic();
    }, [id]);

    const updateComic = () => {
        clearError();
        getComics(id).then(res => setComics(res));
    };

    const spinner = loading ? <Spinner /> : null;
    const errorMassage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !comics) ? (
        <View data={comics} />
    ) : null;

    return (
        <>
            {spinner}
            {errorMassage}
            {content}
        </>
    );
};

const View = props => {
    const { title, thumbnail, description, price, pages, lang } = props.data;
    return (
        <div className='single-comic'>
            <img src={thumbnail} alt={title} className='single-comic__img' />
            <div className='single-comic__info'>
                <h2 className='single-comic__name'>{title}</h2>
                <p className='single-comic__descr'>{description}</p>
                <p className='single-comic__descr'>{pages} pages</p>
                <p className='single-comic__descr'>Language: {lang}</p>
                <div className='single-comic__price'>{price}</div>
            </div>
            <Link to='/comics' className='single-comic__back'>
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
