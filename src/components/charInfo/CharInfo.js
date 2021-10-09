import { Component } from 'react';

import './charInfo.scss';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    };

    marvelService = new MarvelServices();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    onCharLoaded = char => {
        this.setState({ char, loading: false });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    onCharLoading = () => {
        this.setState({ loading: true });
    };

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const spinner = loading ? <Spinner /> : null;
        const errorMassage = error ? <ErrorMessage /> : null;
        const content = !(loading || error || !char) ? (
            <View char={char} />
        ) : null;
        return (
            <div className='char__info'>
                {skeleton}
                {spinner}
                {errorMassage}
                {content}
            </div>
        );
    }
}

const View = ({ char }) => {
    const { name, thumbnail, description, homepage, wiki, comics } = char;
    const style =
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    return (
        <>
            <div className='char__basics'>
                <img
                    src={thumbnail}
                    alt={name}
                    style={style ? { objectFit: 'contain' } : null}
                />
                <div>
                    <div className='char__info-name'>{name}</div>
                    <div className='char__btns'>
                        <a href={homepage} className='button button__main'>
                            <div className='inner'>homepage</div>
                        </a>
                        <a href={wiki} className='button button__secondary'>
                            <div className='inner'>Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className='char__descr'>{description}</div>
            <div className='char__comics'>Comics:</div>
            <ul className='char__comics-list'>
                {comics.length === 0
                    ? 'There is no comics with this character'
                    : null}
                {comics.slice(0, 10).map((item, i) => {
                    return (
                        <li className='char__comics-item' key={i}>
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default CharInfo;
