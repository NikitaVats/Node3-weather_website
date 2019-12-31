const express=require('express')
const path=require('path')
const geocode=require('../../utils/geocode')
const forecast=require('../../utils/forecast')
const app=express()
// for joining 2 directories 
const publicDirecPath=path.join(__dirname,'../public')
app.use(express.static(publicDirecPath))
//above 2 lines are written
app.get('',(req,res)=>{
    res.send('Main Page')
})
app.get('/help',(req,res)=>{
    res.send('Main Page Help')
})
app.get('/about',(req,res)=>{
    res.send('About Main Page ')
})
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send('LOcation was not provided')
    }
    geocode(req.query.location,(error,response)=>{
        if(error){
            return res.send(error)
        }
        forecast(response.latitude,response.longitude,(error,response)=>{
             if(error){
                return res.send(error)
             }
             console.log(response)
            res.send({
                address:req.query.location,
                temperature:response
            })
        })
    })
})


app.get('/products',(req,res)=>{
    console.log(req.query)
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
