import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleComicPage.scss';

const SingleCharPage = ({ data }) => {
    const { thumbnail, title, description, name } = data;
    return (
        <div className='single-comic'>
            <Helmet>
                <meta name='description' content={`${name} char information`} />
                <title>{name}</title>
            </Helmet>
            <img
                src={thumbnail}
                alt={title}
                className='single-comic__char-img'
            />
            <div className='single-comic__info'>
                <h2 className='single-comic__name'>{title}</h2>
                <p className='single-comic__descr'>{description}</p>
            </div>
            <Link to='/' className='single-comic__back'>
                Back to all
            </Link>
        </div>
    );
};

export default SingleCharPage;
