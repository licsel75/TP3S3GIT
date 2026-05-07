import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';  //  NUEVO MIDDLEWARE PARA QUE LOS FORMUARIOS PUEDAN UNTILIZAR PUT, DELETE, 
import { connectDB } from './config/dbConfig.mjs';


//import superheroesRoutes from './routes/superheroesRoutes.mjs';  // 
import superHeroRoutesDatos from './routes/superHeroesRoutesDatos.mjs';  // backend (JSON)
import heroFrontRoutesVistas from './routes/superHeroesRoutesVistas.mjs';  // VISTAS front


const app = express();
const PORT = 3005;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middlewares básicos
app.use(express.json()); // transforma el cuerpo (body) de las peticiones jason en objetos js disponibles en req.body
app.use(express.urlencoded({ extended: true }));//Transforma los datos que vienen desde formularios HTML (formato nombre=Juan&edad=30) a un objeto JavaScript en req.body.
app.use(methodOverride('_method'));  // NUEVO (para PUT y DELETE), engaña a espress, _method=PUT es para express un PUT REAL
app.use(express.static(path.join(__dirname, 'public')));//El navegador pide /css/style.css Y Express busca public/css/style.css y lo envía.



// EJS motor de las vitas 
app.set('view engine', 'ejs');//se define que voy a usar ejs
app.set('views', path.join(__dirname, 'views'));//donde estan las vistas 

// Conexión a DB
await connectDB();

// Rutas
app.use('/api/heroes', superHeroRoutesDatos);
app.use('/dashboard', heroFrontRoutesVistas);

console.log('Rutas de héroes montadas en /api/heroes');

// Ruta principal
app.get('/', (req, res) => {
    res.redirect('/dashboard');
});
//si el navegador peticiona localhost:3005/ se redirige a localhost:3005/dashboard 




// Ruta de prueba
// app.get('/', (req, res) => {
//     res.send('🚀 Servidor funcionando correctamente');// respuesta en el navegador 
// });

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`); // respuesta en la consola
});
//Flujo: El servidor arranca , conecta a MongoDB , queda a la espera de que alguien visite http://localhost:3005/dashboard 