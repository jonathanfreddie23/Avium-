import config from 'config';

import AuthGateway from './Auth';
import HomeGateway from './Home';

const baseUrl = config.baseUrl as string;

const auth = new AuthGateway(baseUrl);
const home = new HomeGateway(baseUrl);

export default {
    auth,
    home,
};
