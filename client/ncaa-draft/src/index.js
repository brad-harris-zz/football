import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StartDraft from './StartDraft';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<StartDraft />, document.getElementById('root'));
registerServiceWorker();
