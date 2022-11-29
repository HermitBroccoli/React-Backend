const express = require('express');
const expressHandlebars = require('express-handlebars').engine;

const app = express();

const port = process.env.PORT || 3000;

const fortunes = [
    "Победи свои страхи или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждёт приятный сюрприз",
    "Будь проще везде, где только можно"
]

app.use(express.static(__dirname + '/public'))

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    const randomFortunes = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.status(200)
    res.render('about', {fortune: randomFortunes})
})

app.use((res, req)=>{
    res.status(404);
    res.render('404');
})

app.use((err, req, res, next)=>{
    console.error(err.message);
    res.status(500);
    res.render('500')
})

app.listen(port, ()=>{
    console.log(`Express запущен на http://localhost:${port}\nНажмите Ctrl+C для завершения`);
})