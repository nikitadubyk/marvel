import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
    };

    marvelService = new MarvelServices();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(res => this.onCharListLoaded(res));
    }

    onCharListLoaded(charList) {
        this.setState({ charList, loading: false });
    }

    renderItem(arr) {
        const items = arr.map(item => {
            const style =
                item.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
            return (
                <li className='char__item' key={item.id}>
                    <img
                        src={item.thumbnail}
                        alt='abyss'
                        style={style ? { objectFit: 'unset' } : null}
                    />
                    <div className='char__name'>{item.name}</div>
                </li>
            );
        });
        return <ul className='char__grid'>{items}</ul>;
    }

    render() {
        const { charList, error, loading } = this.state;
        const items = this.renderItem(charList);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(error || loading) ? items : null;
        return (
            <div className='char__list'>
                {errorMessage}
                {spinner}
                {content}

                <button className='button button__main button__long'>
                    <div className='inner'>load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
