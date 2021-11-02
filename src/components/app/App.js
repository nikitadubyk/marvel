import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() =>
    import('../pages/singlePages/SingleComicPage')
);
const SingleCharPage = lazy(() =>
    import('../pages/singlePages/SingleCharPage')
);
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {
    return (
        <Router>
            <div className='app'>
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route exact path='/'>
                                <MainPage />
                            </Route>
                            <Route exact path='/comics'>
                                <ComicsPage />
                            </Route>
                            <Route exact path='/comics/:id'>
                                <SinglePage
                                    Component={SingleComicPage}
                                    dataType='comic'
                                />
                            </Route>
                            <Route exact path='/character/:id'>
                                <SinglePage
                                    Component={SingleCharPage}
                                    dataType='character'
                                />
                            </Route>
                            <Route path='*'>
                                <Page404 />
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;
