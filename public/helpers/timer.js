const timer = () => {
  const startOfDay = new Date().setHours(0,0,0,0);
  
  setInterval(() => {
    const now = new Date();
    const diff = new Date(startOfDay) - now;
    const formattedTimer = new Date(diff).toLocaleTimeString()
    document.querySelector('#timer').innerHTML = formattedTimer
  }, 1000)
}


export default timer