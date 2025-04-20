import { Router } from 'express';

export default Router().use('/lessons', require('./lesson.route'))