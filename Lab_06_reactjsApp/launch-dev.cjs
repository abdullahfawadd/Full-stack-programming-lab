const { spawn } = require('child_process') 
const command = 'npm run dev -- --host 0.0.0.0 --port 4173 >> dev-server.log 2>&1' 
const child = spawn(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', command], { cwd: process.cwd(), detached: true, stdio: 'ignore', windowsHide: true }) 
child.unref()
