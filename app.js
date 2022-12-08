import  express  from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import ErrorHandler from './middlewares/ErrorHandler.js';
import apiRoutes from './routes/api.js'

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

app.use('/api',apiRoutes);
app.get('/', (req, res) => {
    res.send('hello world')
})



app.use(ErrorHandler)


export default app