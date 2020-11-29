import ReactDOM from 'react-dom';
import AppComponent from "./app/app.component";

// Mount function to start up the app
const mount = (element) => {
    ReactDOM.render(
        <AppComponent/>,
        element
    );
}
// If we are in development and isolation
// Call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.getElementById('_app-two-root');

    if (devRoot) {
        mount(devRoot);
    }
}

// We are running through container in production
// we should export mount function

export {mount};
