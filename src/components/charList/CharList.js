import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    };

    marvelService = new MarvelServices();

    componentDidMount() {
        this.onRequestChar();
    }

    onRequestChar = offset => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(res => this.onCharListLoaded(res))
            .catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({ newItemLoading: true });
    };

    onCharListLoaded = newCharList => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onError = () => {
        this.setState({ error: true });
    };

    itemsRef = [];

    setRefs = ref => {
        this.itemsRef.push(ref);
    };

    focusItem = id => {
        this.itemsRef.forEach(item =>
            item.classList.remove('char__item_selected')
        );
        this.itemsRef[id].classList.add('char__item_selected');
        this.itemsRef[id].focus();
    };

    renderItem(arr) {
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
                        this.props.onCharSelected(item.id);
                        this.focusItem(i);
                    }}
                    onKeyDown={e => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            this.props.onCharSelected(item.id);
                            this.focusItem(i);
                        }
                    }}
                    ref={this.setRefs}
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

    render() {
        const { charList, error, loading, newItemLoading, offset, charEnded } =
            this.state;
        const items = this.renderItem(charList);
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
                    onClick={() => this.onRequestChar(offset)}
                    disabled={newItemLoading ? true : false}
                    style={{ display: charEnded ? 'none' : 'block' }}
                >
                    <div className='inner'>load more</div>
                </button>
            </div>
        );
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
