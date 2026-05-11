* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
body { background: #0a0a0a; color: white; overflow: hidden; }

.app-container { width: 100vw; height: 100vh; display: flex; flex-direction: column; }

/* Price Ticker */
.price-ticker { background: #1a1a1a; padding: 5px 0; font-size: 12px; color: #00ff88; border-bottom: 1px solid #333; }

/* Header */
header { padding: 20px; text-align: center; background: linear-gradient(180deg, #111, #0a0a0a); }
.balance-container h1 { font-size: 2.5rem; color: #f3ba2f; text-shadow: 0 0 10px rgba(243, 186, 47, 0.5); }

/* Mining Rig UI */
.mining-rig { padding: 40px; display: flex; flex-direction: column; align-items: center; }
.fan-container { width: 150px; height: 150px; border: 5px solid #333; border-radius: 50%; position: relative; background: #111; box-shadow: inset 0 0 20px #000; }
.fan { width: 100%; height: 100%; background: url('https://cdn-icons-png.flaticon.com/512/1054/1054044.png') no-repeat center; background-size: 80%; }
.fan.active { animation: spin 1s linear infinite; }

@keyframes spin { 100% { transform: rotate(360deg); } }

/* Stats */
.stats { display: flex; justify-content: space-around; width: 100%; margin-top: 20px; }
.stat-box { background: #1a1a1a; padding: 15px; border-radius: 10px; text-align: center; flex: 1; margin: 5px; border: 1px solid #333; }
.green { color: #00ff88; }

/* Buttons */
.boost-btn { width: 90%; margin: 20px auto; padding: 15px; border-radius: 30px; border: none; background: #00ff88; color: black; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 0 15px #00ff88; }
.action-btn { width: 100%; padding: 12px; background: #f3ba2f; border: none; border-radius: 5px; margin-top: 10px; font-weight: bold; }

/* Pages Control */
.page { display: none; flex: 1; padding: 20px; overflow-y: auto; }
.page.active { display: block; }

/* Nav Bar */
.bottom-nav { height: 70px; background: #111; display: flex; justify-content: space-around; align-items: center; border-top: 1px solid #333; }
.bottom-nav div { text-align: center; font-size: 20px; cursor: pointer; opacity: 0.6; }
.bottom-nav div:hover { opacity: 1; color: #00ff88; }
