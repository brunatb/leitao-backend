import app, { init } from './app';

const port = +process.env.PORT || 4000;

init().then(() => {
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}.`);
		console.log(`NODE_ENV=${process.env.NODE_ENV}`);
	});
});
