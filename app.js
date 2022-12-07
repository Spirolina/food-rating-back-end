import  express  from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

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

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/admin', (req, res) => {
    res.json({admins: ['kaan', 'arda']})
})


next(new Error('not permitted'))
export default app