const config=require('./utils/config')
const app=require('./app')

const PORT=config.PORT || 3002

app.listen(PORT, () => console.log(`App is running in port ${config.PORT}`))
