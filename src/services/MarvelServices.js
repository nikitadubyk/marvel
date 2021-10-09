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

    getAllCharacters = async () => {
        const res = await this.getResources(
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
        );
        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async id => {
        const res = await this.getResources(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );

        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = res => {
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
}

export default MarvelServices;
