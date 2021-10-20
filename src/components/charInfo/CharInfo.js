import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = props => {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelServices();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        clearError();
        const { charId } = props;
        if (!charId) {
            return;
        }

        getCharacter(charId).then(onCharLoaded);
    };

    const onCharLoaded = char => {
        setChar(char);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const errorMassage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
        <div className='char__info'>
            {skeleton}
            {spinner}
            {errorMassage}
            {content}
        </div>
    );
};

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

CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;
