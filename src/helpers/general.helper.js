import { SHIFTS } from '../constants/general.const';

export const GetFilteredDossiers = dossiers => {
    let filteredFiles;

    const morningArray = dossiers.filter(dossier => dossier.shift === SHIFTS.morning);
    const afternoonArray = dossiers.filter(dossier => dossier.shift === SHIFTS.afternoon);
    const eveningArray = dossiers.filter(dossier => dossier.shift === SHIFTS.evening);
    const nightArray = dossiers.filter(dossier => dossier.shift === SHIFTS.night);

    filteredFiles = {
        morningDossiers: morningArray,
        afternoonDossiers: afternoonArray,
        eveningDossiers: eveningArray,
        nightDossiers: nightArray,
    };

    return filteredFiles;
};

export const isIOS = () => {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
        ].includes(navigator.platform);
};
