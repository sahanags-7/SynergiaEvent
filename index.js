import express from 'express';
const app = express();
const PORT = 3000;
app.use(express.json());
let booking=[
    {id:1,name:'sahana',age:20,event:'CodeStorm',email:'kulalsahana0205@gmail.com'},
    {id:2,name:'Abhishek',age:21,event:'HackTrack',email:'abhishek@gmail.com'},
    {id:3,name:'sanjana',age:22,event:'WebCrafter',email:'sanjana@gmail.com'},
    {id:4,name:'virat',age:21,event:'GameJam',email:'virat@gmail.com'},
    {id:5,name:'prathiksha',age:22,event:'CodeStorm',email:'CircuitX@gmail.com'}
]
app.get('/booking',(req,res)=>{
    res.status(200).json(booking);
});

app.get("/booking/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundBooking = booking.find(s => s.id === id);

  if (!foundBooking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  res.status(200).json(foundBooking);
});


app.post('/booking',(req,res)=>{
    const{name,age,event,email}=req.body;
    if(!name || !age ||!event || !email){
        return res.status(400).json({message:"All fields are required"});
    }
    const newbooking={
        id: booking.length + 1,
        name,
        age,
        event,
        email,
    };
    booking.push(newbooking);
    res.status(201).json({
        message:"booking added successfully",
        booking:newbooking,
    });
});

app.put("/booking/:id",(req,res)=>{
    const index = booking.findIndex((s)=>s.id==req.params.id);
     if(index===-1){
         return res.status(404).json({message:"booking not found"});
     }

    console.log("body",req.body);
    console.log(req.body.event);

    const { name,age,event,email}=req.body;
    booking[index]={
        ...booking[index],
        name,
        age,
        event,
        email,
    };
    res.status(200).json({
        message:"booking updated successfully",
        booking:booking[index],
    });
});

app.delete("/booking/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=booking.findIndex((s)=>s.id===id);
     if(index===-1){
         return res.status(404).json({message:"booking not found"});
     }
    booking.splice(index,1);
    res.status(200).json({message:"booking deleted successfully"});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});