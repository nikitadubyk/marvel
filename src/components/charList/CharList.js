import { useState, useEffect, useRef } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

import './charList.scss';

const CharList = props => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelServices();

    useEffect(() => {
        onRequestChar();
    }, []);

    const onRequestChar = offset => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(res => onCharListLoaded(res))
            .catch(onError);
    };

    const onCharListLoading = () => {
        setNewItemLoading(true);
    };

    const onCharListLoaded = newCharList => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(loading => false);
        setNewItemLoading(item => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    };

    const onError = () => {
        setError(true);
        setLoading(true);
    };

    const itemsRef = useRef([]);

    const focusItem = id => {
        itemsRef.current.forEach(item =>
            item.classList.remove('char__item_selected')
        );
        itemsRef.current[id].classList.add('char__item_selected');
        itemsRef.current[id].focus();
    };

    function renderItem(arr) {
        const items = arr.map((item, i) => {
            const style =
                item.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
            return (
                <li
                    className='char__item'
                    tabIndex={0}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusItem(i);
                    }}
                    onKeyDown={e => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id);
                            focusItem(i);
                        }
                    }}
                    ref={el => (itemsRef.current[i] = el)}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={style ? { objectFit: 'unset' } : null}
                    />
                    <div className='char__name'>{item.name}</div>
                </li>
            );
        });
        return <ul className='char__grid'>{items}</ul>;
    }

    const items = renderItem(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? items : null;
    return (
        <div className='char__list'>
            {errorMessage}
            {spinner}
            {content}

            <button
                className='button button__main button__long'
                onClick={() => onRequestChar(offset)}
                disabled={newItemLoading ? true : false}
                style={{ display: charEnded ? 'none' : 'block' }}
            >
                <div className='inner'>load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
