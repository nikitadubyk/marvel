import { useState } from 'react';

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import SearchForm from '../searchForm/SearchForm';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './singlePages/singleComicPage.scss';
import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = id => {
        setChar(id);
    };
    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className='char__content'>
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div className='sticky'>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <SearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className='bg-decoration' src={decoration} alt='vision' />
        </>
    );
};

export default MainPage;
