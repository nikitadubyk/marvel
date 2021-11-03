import ErrorMessage from '../errorMessage/ErrorMessage';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta name='description' content='Page doesnt exist' />
                <title>Page doesn't exist</title>
            </Helmet>
            <ErrorMessage />
            <p
                style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '24px',
                }}
            >
                Page doesn't exist
            </p>
            <Link
                to='/'
                style={{
                    display: 'block',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    marginTop: '30px',
                }}
            >
                Back to main page
            </Link>
        </div>
    );
};

export default Page404;
