import { Entreprise } from "../model";
import RNFetchBlob from 'rn-fetch-blob';
import { 
    days,
    dateNow 
} from './Dates';

const ENCODE = "utf8"
const FILE_J15 = RNFetchBlob.fs.dirs.DocumentDir  + "/j15.json";
const FILE_J31 = RNFetchBlob.fs.dirs.DocumentDir + "/j31.json";

/**
 * Create J15 and J31 files if not exist.
 * 
 * @returns {Boolean} true when files created/existed otherwise false.
 */
export function filesPrepare() : Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
        var promises: Array<Promise<Boolean>> = [];

        var p1 = prepareJ15();
        promises.push(p1);

        var p2 = prepareJ31();
        promises.push(p2);
        
        Promise.all(promises).then((data: Array<Boolean>) => {
            resolve(data[0] && data[1]);
        });
    });
}

/**
 * Update files J15 and J31 organization.
 * Move or delete Entreprise object in his file.
 * 
 * @returns {Boolean} true when update is OK otherwise false.
 */
export function filesUpdate() : Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {

        // Get all Entreprise object in J15 file
        var p1 = new Promise<Array<Entreprise>>((resolve, reject) => {
            filesJ15().then((res: Array<Entreprise>) => { resolve(res) });
        });
    
        // Get all Entreprise object in J31 file
        var p2 = new Promise<Array<Entreprise>>((resolve, reject) => {
            filesJ31().then((res: Array<Entreprise>) => { resolve(res) });
        });
        
        Promise.all([p1, p2]).then((data) => {
            var dt15 = data[0] as Entreprise[];
            var dt31 = data[1] as Entreprise[];

            // Work on J15 file (Delete, move...)
            dt15.forEach((data: Entreprise) => {
                const nb = days(dateNow(), data.consult);
                if (nb > 31) {
                    const index = dt15.findIndex(e => e.noSiren === data.noSiren);
                    if (index > -1) dt15.splice(index, 1);
                } else if (nb >= 16 && nb <= 31) { 
                    const index = dt15.findIndex(e => e.noSiren === data.noSiren);
                    if (index > -1) {
                        dt31.splice(0, 0, dt15[index]);
                        dt15.splice(index, 1);
                    }
                }
            });

            // Work on J31 file (Delete, move...)
            dt31.forEach((data: Entreprise) => {
                const nb = days(dateNow(), data.consult);
                if (nb > 31) {
                    const index = dt31.findIndex(e => e.noSiren === data.noSiren);
                    if (index > -1) dt31.splice(index, 1);
                }  
            });

            // Write result in J15
            var p3 = new Promise<boolean>((resolve, reject) => {
                const json = JSON.stringify(dt15);
                RNFetchBlob.fs.writeFile(FILE_J15, json, ENCODE).then(() => {
                    resolve(true);
                });
            });
        
            // Write result in J31
            var p4 = new Promise<boolean>((resolve, reject) => {
                const json = JSON.stringify(dt31);
                RNFetchBlob.fs.writeFile(FILE_J31, json, ENCODE).then(() => {
                    resolve(true);
                });
            });

            Promise.all([p3, p4]).then(() => {
                resolve(true);
            });
        });
    });
}

/**
 * Add or move on top position an entrerise in FILE_J15 and 
 * remove entreprise in FILE_31 if exists.
 */
export function push(dt: Entreprise) : Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {

        // Add or move on top position in file J15
        var p1 = new Promise<Boolean>((resolve, reject) => {
            filesJ15().then((res: Array<Entreprise>) => {
                dt.consult = dateNow();

                const index = res.findIndex(e => e.noSiren === dt.noSiren);
                if (index > -1) {
                    res.splice(index, 1);
                }

                res.splice(0, 0, dt);
                const data = JSON.stringify(res);

                RNFetchBlob.fs.writeFile(FILE_J15, data, ENCODE).then(() => {
                    resolve(true);
                }).catch((error: any) => {
                    console.log(error);
                    reject(error);
                });
            })
        });

        // Remove in file J31
        var p2 = new Promise<Boolean>((resolve, reject) => {
            filesJ31().then((res: Array<Entreprise>) => {
                const index = res.findIndex(e => e.noSiren === dt.noSiren);
                if (index > -1) res.splice(index, 1);
                
                const data = JSON.stringify(res);

                RNFetchBlob.fs.writeFile(FILE_J31, data, ENCODE).then(() => {
                    resolve(true);
                }).catch((error: any) => {
                    console.log(error);
                    reject(error);
                });
            })
        });

        Promise.all([p1, p2]).then(() => {
            resolve(true);
        });
    });
}

/**
 * Return all entreprise in FILE_J15.
 * 
 * @returns {Array<Entreprise>}.
 */
export function filesJ15() : Promise<Array<Entreprise>> {
    return new Promise<Array<Entreprise>>((resolve, reject) => {
        RNFetchBlob.fs.readFile(FILE_J15, ENCODE).then((data: string) => {
            var res = JSON.parse(data) as Entreprise[];
            resolve(res);
        }).catch((error: any) => {
            reject(error);
        });
    });
}

/**
 * Return all entreprise in FILE_J31.
 * 
 * @returns {Array<Entreprise>}.
 */
export function filesJ31() : Promise<Array<Entreprise>> {
    return new Promise<Array<Entreprise>>((resolve, reject) => {
        RNFetchBlob.fs.readFile(FILE_J31, ENCODE).then((data: string) => {
            var res = JSON.parse(data) as Entreprise[];
            resolve(res);
        }).catch((error: any) => {
            reject(error);
        });
    });
}

/**
 * Create if not exists FILE_J15.
 * 
 * @returns {Boolean} true when no problem otherwise false.
 */
function prepareJ15() : Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
        RNFetchBlob.fs.exists(FILE_J15).then((exists: boolean) => {
            if (exists === false) {
                RNFetchBlob.fs.createFile(FILE_J15, "[]", ENCODE).then(() => {
                    resolve(true);
                }).catch((error: any) => { 
                    reject(error);
                    console.log(error);
                })
            } else {
                resolve(true);
            } 
        })
    });
}

/**
 * Create if not exists FILE_J31.
 * 
 * @returns {Boolean} true when no problem otherwise false.
 */
function prepareJ31() : Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
        RNFetchBlob.fs.exists(FILE_J31).then((exists: boolean) => {
            if (exists === false) {
                RNFetchBlob.fs.createFile(FILE_J31, "[]", ENCODE).then(() => {
                    resolve(true);
                }).catch((error: any) => { 
                    reject(error);
                    console.log(error);
                })
            } else {
                resolve(true);
            } 
        })
    });
}