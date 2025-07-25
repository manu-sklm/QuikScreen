

const voteFormat =(number)=>{
const formatted = (number / 1000).toFixed(1); 

return formatted.endsWith('.0') ? formatted.slice(0, -2) + 'k' : formatted + 'k';

}

export default voteFormat;
