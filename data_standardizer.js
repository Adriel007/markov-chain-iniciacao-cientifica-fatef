const files = {
    appstore: {
        path: "app_store_reviews",
        index: 3,
        splitter: {
            row: "\n",
            col: ";"
        }
    },
    dataset: {
        path: "DATASET",
        index: 0,
        splitter: {
            row: "\n",
            col: ","
        }
    },
    dreams: {
        path: "dreams_interpretations",
        index: 1,
        splitter: {
            row: "\n",
            col: ","
        }
    },
    iphone: {
        path: "iphone",
        index: 6,
        splitter: {
            row: "\n",
            col: ","
        }
    }
};

function process(dataset, index, splitter) {
    const csv = dataset.split(splitter.row);
    const results = csv.map(line => line.split(splitter.col)[index]);
    
    results.shift(); // remove header
    
    return results.join(";");
}

function systemIO(file, index, splitter) {
    const fs = require('fs');
    
    fs.readFile(`./dataset/original/${file}.csv`, 'utf8', (err_r, data) => {
        if (err_r) {
            console.error(err_r);
        } else {
            const content = process(data, index, splitter);
            fs.writeFile(`./dataset/modified/${file}.csv`, content, err_w =>
                console.error(err_w)
            );
        }
    });
}

for (const item in files) {
    systemIO(files[item].path, files[item].index, files[item].splitter);
}
