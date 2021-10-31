import { useState, useEffect, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

import './charList.scss';

const CharList = props => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelServices();

    useEffect(() => {
        onRequestChar(offset, true);
    }, []);

    const onRequestChar = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset).then(res => onCharListLoaded(res));
    };

    const onCharListLoaded = newCharList => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(item => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
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
                <CSSTransition
                    key={item.id}
                    timeout={500}
                    classNames='char__item'
                >
                    <li
                        tabIndex={0}
                        className='char__item'
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
                </CSSTransition>
            );
        });
        return (
            <ul className='char__grid'>
                <TransitionGroup component={null}>{items}</TransitionGroup>
            </ul>
        );
    }

    const items = renderItem(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className='char__list'>
            {errorMessage}
            {spinner}
            {items}
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
