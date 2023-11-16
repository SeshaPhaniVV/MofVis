


class jsonLoader {

    load(path){
        const customData = require(path);
        return customData;
    }
}

export { jsonLoader };