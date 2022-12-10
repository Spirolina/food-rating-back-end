import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import ErrorHandler from './middlewares/ErrorHandler.js';
import apiRoutes from './routes/api.js'
import passport from 'passport';
import authConfigs from './configs/authConfigs.js';
import passportConfigs from './configs/passport.js';

const corsOptions = {
    origin: '*',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
};


const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init passport-js and jwt
authConfigs(passport);
passportConfigs(passport)
app.use(passport.initialize());



app.use('/api', apiRoutes);
app.get('/', (req, res) => {
    res.send('oh')
})



app.use(ErrorHandler)


export default app