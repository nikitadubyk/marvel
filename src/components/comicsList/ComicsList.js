import './comicsList.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelServices from '../../services/MarvelServices';

const ComicsList = props => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelServices();

    useEffect(() => {
        onRequestComics(offset, true);
    }, []);

    const onRequestComics = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset).then(res => {
            onComicsListLoaded(res);
        });
    };

    const onComicsListLoaded = newComicsList => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setNewComicsLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    };

    const renderList = arr => {
        const items = arr.map((item, i) => {
            return (
                <li className='comics__item' key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img
                            src={item.thumbnail}
                            alt={item.name}
                            className='comics__item-img'
                        />
                        <div className='comics__item-name'>{item.title}</div>
                        <div className='comics__item-price'>{item.price}</div>
                    </Link>
                </li>
            );
        });

        return <ul className='comics__grid'>{items}</ul>;
    };

    const items = renderList(comicsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const load = loading && !newComicsLoading ? <Spinner /> : null;

    return (
        <div className='comics__list'>
            {load}
            {errorMessage}
            {items}
            <button
                className='button button__main button__long'
                onClick={() => onRequestComics(offset)}
                style={{ display: comicsEnded ? 'none' : 'block' }}
                disabled={newComicsLoading ? true : false}
            >
                <div className='inner'>load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
