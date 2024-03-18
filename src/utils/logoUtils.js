// logoUtils.js

import { useSelector } from 'react-redux';

const useDetermineLogo = () => {
    // const language = useSelector((state) => state?.auth?.languageShort);

    // if (language == 'ar') {
    //     return require('../../assets/logos/logo_ar.png');
    // } else {
    //     return require('../../assets/logos/logoNew.png');
    // }

    return require('../../assets/logos/logoNew.png');
};

export default useDetermineLogo;


// const determineLogo = (language) => {
//     console.log("Langugae ===> ", language);

//     if (language === 'Arabic') {
//         return require('../../assets/logos/logo_ar.png');
//     } else {
//         return require('../../assets/logos/logoNew.png');
//     }
// };

// export { determineLogo };


// let logo;
// try {
//   logo = determineLogo(language);
// } catch (error) {
//   console.error('Error determining logo source:', error);
//   // Provide a fallback or handle the error appropriately
//   logo = require('../../../assets/logos/logoNew.png');
// }
