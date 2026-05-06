import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';  // ← NUEVO
import { connectDB } from './config/dbConfig.mjs';


//import superheroesRoutes from './routes/superheroesRoutes.mjs';  // 
import superHeroRoutesDatos from './routes/superHeroesRoutesDatos.mjs';  // backend (JSON)
import heroFrontRoutesVistas from './routes/superHeroesRoutesVistas.mjs';  // VISTAS front


const app = express();
const PORT = 3005;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));  // ← NUEVO (para PUT y DELETE)
app.use(express.static(path.join(__dirname, 'public')));

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




// Ruta de prueba
// app.get('/', (req, res) => {
//     res.send('🚀 Servidor funcionando correctamente');// respuesta en el navegador 
// });

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`); // respuesta en la consola
});