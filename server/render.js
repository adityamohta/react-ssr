import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Helmet} from 'react-helmet';

import Routes from '../src/router/Routes';

export default (pathname, store, context) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={pathname} context={context}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );
    const helmet = Helmet.renderStatic();
    console.warn(helmet.title.toString());

    return `
        <!DOCTYPE html>
        <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="app">${content}</div>
            <script>
            window.INITIAL_STATE = ${JSON.stringify(store.getState())}
            </script>
            <script src="dist/bundle.js"></script>
        </body>
        </html>
  `;
};