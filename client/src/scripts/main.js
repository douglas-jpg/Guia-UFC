import { utils } from './utils';
import { api } from './api';

const init = () => {
    utils();
    api();
};

document.addEventListener('DOMContentLoaded', init());
