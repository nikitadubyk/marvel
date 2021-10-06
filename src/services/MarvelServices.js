class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=b74ef9127a09841f42d205e502e31ff9';

    getResources = async url => {
        const res = await fetch(url);

        if (!res) {
            throw new Error(`Could not fetch ${url}, status - ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = () => {
        return this.getResources(
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
        );
    };
    getCharacter = id => {
        return this.getResources(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );
    };
}

export default MarvelServices;
