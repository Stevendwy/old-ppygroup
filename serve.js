const app = require('express')()
const fs = require('fs')

app.get('*', (req, res) => {
    let _path = req.path

    if(_path.includes('.html')) {
        let regHost = /http:\/\/192.168.10.111/g

        fs.readFile(__dirname + _path, (err, data) => {
            data = data.toString().replace(regHost, '')
            res.send(data)
        })
    }else if(_path.includes('jquery.min.map')) ;
    else res.sendFile(`${__dirname + req.path}`)
})

app.listen(8083, 'localhost', () => {
    console.log('start 8083')
})
