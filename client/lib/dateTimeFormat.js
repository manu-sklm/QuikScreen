const dateTimeFormat=(date)=>{
   const formattedTime=new Date(date);

  return formattedTime.toLocaleString('en-IN',{
    weekday:'short',
    month:'long',
    day:'numeric',
    hour:'2-digit',
    minute:'numeric'

   })
}

export default dateTimeFormat;