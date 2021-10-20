import { useHttp } from '../hooks/http.hook';

const useMarvelServices = () => {
    const { loading, request, error } = useHttp;
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=b74ef9127a09841f42d205e502e31ff9';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async id => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const _transformCharacter = res => {
        return {
            id: res.id,
            name: res.name,
            description: res.description
                ? `${res.description.slice(0, 210)}...`
                : 'There is no information about this character',
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items,
        };
    };

    return {
        loading,
        error,
        getAllCharacters,
        getCharacter,
    };
};

export default useMarvelServices;
