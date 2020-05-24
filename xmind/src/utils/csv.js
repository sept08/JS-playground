import Papa from 'papaparse';

export function parseCsv(file) {
    return new Promise(((resolve, reject) => {
        Papa.parse(file, {
            download: true,
            header: true,
            complete: results => resolve(results.data),
            error: error => reject(error)
        })
    }))
}

export default {
    parseCsv,
};
