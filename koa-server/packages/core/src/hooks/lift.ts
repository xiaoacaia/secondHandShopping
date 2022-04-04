export default async (app) => {
  const port = app.config?.devServer?.port || 3000;
  app.listen(port, () => {
    prointLogo()
  })
}

const logColor = color => input => console.log(`\x1b[${color}m${input}\x1b[0m`)

// const logGreen = logColor(92)
// const logViolet = logColor(95)
const logCyan = logColor(96)

const prointLogo = () => logCyan(`
  ______ __    __   |
  |___  / \\ \\  / / 
    / /   \\ \\/ /  
    / /     \\  /    
  / /__    / /      
  /_____|  /_/      
`)