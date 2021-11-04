import './comicsList.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelServices from '../../services/MarvelServices';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
            break;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />;
            break;
        case 'confirmed':
            return <Component />;
            break;
        case 'error':
            return <ErrorMessage />;
            break;
        default:
            throw new Error('Unexpected process state');
    }
};

const ComicsList = props => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics, process, setProcess } =
        useMarvelServices();

    useEffect(() => {
        onRequestComics(offset, true);
    }, []);

    const onRequestComics = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
            .then(res => {
                onComicsListLoaded(res);
            })
            .then(() => setProcess('confirmed'));
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

    return (
        <div className='comics__list'>
            {setContent(
                process,
                () => renderList(comicsList),
                newComicsLoading
            )}
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
